// flatten-svg.mjs
// Usage: node flatten-svg.mjs input.svg output.svg
// pnpm add -D cheerio css

import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import css from "css";

function parseInlineStyleAttr(styleAttr = "") {
    const out = {};
    styleAttr
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((pair) => {
            const idx = pair.indexOf(":");
            if (idx === -1) return;
            const k = pair.slice(0, idx).trim();
            const v = pair.slice(idx + 1).trim();
            if (!k) return;
            out[k] = v;
        });
    return out;
}

/**
 * 把 <style> 解析成“按出现顺序排列”的规则数组
 * 这里只做你这类 SVG 最常见的选择器：
 * - .cls-xx
 * - 多个 selector 用逗号分隔
 * - 组合选择器里只要出现 .class 就当作匹配条件（够用）
 */
function parseStyleToOrderedRules(styleText) {
    const ast = css.parse(styleText);
    const rules = [];

    for (const rule of ast.stylesheet?.rules || []) {
        if (rule.type !== "rule") continue;

        const decls = {};
        for (const d of rule.declarations || []) {
            if (d.type !== "declaration") continue;
            if (!d.property || d.value == null) continue;
            decls[d.property.trim()] = String(d.value).trim();
        }
        if (Object.keys(decls).length === 0) continue;

        for (const selRaw of rule.selectors || []) {
            const sel = selRaw.trim();
            const classMatches = sel.match(/\.[A-Za-z0-9_-]+/g) || [];
            if (classMatches.length === 0) continue;
            const classes = classMatches.map((s) => s.slice(1));
            rules.push({ classes, decls }); // ✅ 保留顺序
        }
    }
    return rules;
}

function applyInlineStyles($, orderedRules) {
    const SHAPES = "path,rect,circle,ellipse,line,polyline,polygon,text";

    // ECharts 更容易识别这些 presentation attrs
    const allowed = new Set([
        "fill",
        "stroke",
        "stroke-width",
        "opacity",
        "fill-opacity",
        "stroke-opacity",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
    ]);

    const normalize = (k, v) => {
        if (typeof v !== "string") return v;
        const vv = v.trim();
        if (k === "stroke-width" || k === "stroke-miterlimit") {
            return vv.replace(/px$/i, "").trim();
        }
        return vv;
    };

    const matchesRule = ($node, rule) => {
        const classAttr = ($node.attr("class") || "").trim();
        if (!classAttr) return false;
        const set = new Set(classAttr.split(/\s+/).filter(Boolean));
        // 只要选择器里出现的任意 class 在元素 class 里，就认为匹配
        // （你这类导出的 SVG 基本都是单 class 命中）
        return rule.classes.some((c) => set.has(c));
    };

    $(SHAPES).each((_, el) => {
        const $el = $(el);

        // 祖先 -> 自己（外到内），内层覆盖外层
        const chain = $el.parents().addBack().toArray().reverse();

        const merged = {};

        for (const node of chain) {
            const $n = $(node);

            // ✅ 按 CSS 规则出现顺序应用（模拟 cascade）
            for (const rule of orderedRules) {
                if (!matchesRule($n, rule)) continue;
                for (const [k, v] of Object.entries(rule.decls)) {
                    if (allowed.has(k)) merged[k] = v;
                }
            }

            // inline style 最后覆盖
            const stAttr = $n.attr("style");
            if (stAttr) {
                const inline = parseInlineStyleAttr(stAttr);
                for (const [k, v] of Object.entries(inline)) {
                    if (allowed.has(k)) merged[k] = v;
                }
            }
        }

        if (Object.keys(merged).length === 0) return;

        for (const [k, v] of Object.entries(merged)) {
            $el.attr(k, normalize(k, v));
        }
    });

    // 清理：删 style（避免 ECharts/canvas 吃不到）
    $("style").remove();
}

function main() {
    const [, , input, output] = process.argv;
    if (!input || !output) {
        console.error("Usage: node flatten-svg.mjs input.svg output.svg");
        process.exit(1);
    }

    const svgText = fs.readFileSync(input, "utf8");
    const $ = cheerio.load(svgText, { xmlMode: true });

    let styleText = "";
    $("style").each((_, s) => {
        styleText += "\n" + $(s).text();
    });

    const orderedRules = parseStyleToOrderedRules(styleText);
    applyInlineStyles($, orderedRules);

    const result = $.xml();
    fs.writeFileSync(output, result, "utf8");
    console.log(`✅ Done! Wrote: ${path.resolve(output)}`);
}

main();