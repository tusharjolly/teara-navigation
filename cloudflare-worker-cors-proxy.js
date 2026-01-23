/**
 * Cloudflare Worker CORS Proxy
 * 
 * This Worker proxies requests to your backend API and adds CORS headers.
 * 
 * IMPORTANT: The Access-Control-Allow-Origin header MUST be set to the requesting origin
 * (e.g., http://localhost:3001 for local dev, or your Cloudflare Pages URL for production).
 * 
 * Setup Instructions:
 * 1. Go to Cloudflare Dashboard → Workers & Pages → Your Worker
 * 2. Update the code in the Worker editor with this code
 * 3. Deploy the Worker
 */

export default {
  async fetch(request) {
    // Your backend API URL
    const API_URL = "http://teara.osaka1.jianqi.jp:30601/v1";

    async function handleRequest(request) {
      const url = new URL(request.url);
      
      // Extract the path from the request (everything after the Worker domain)
      // e.g., if Worker URL is https://worker.workers.dev/query/search
      // we want to get /query/search
      const path = url.pathname + url.search;
      
      // Build the full backend API URL
      const apiUrl = API_URL + path;

      console.log('Worker: Proxying request', {
        from: request.url,
        to: apiUrl,
        origin: request.headers.get("Origin")
      });

      // Rewrite request to point to API URL
      const modifiedRequest = new Request(apiUrl, {
        method: request.method,
        headers: {
          ...Object.fromEntries(request.headers),
          "Origin": new URL(API_URL).origin,
        },
        body: request.method !== "GET" && request.method !== "HEAD" 
          ? await request.clone().text() 
          : null,
      });

      let response = await fetch(modifiedRequest);
      
      // Recreate the response so you can modify the headers
      response = new Response(response.body, response);
      
      // Get the origin from the request (the page making the request)
      const requestOrigin = request.headers.get("Origin");
      
      // CRITICAL: Set CORS headers to the REQUESTING origin, not the Worker's origin
      if (requestOrigin) {
        response.headers.set("Access-Control-Allow-Origin", requestOrigin);
        console.log('Worker: Set CORS origin to:', requestOrigin);
      } else {
        // Fallback: allow all origins if no Origin header (shouldn't happen in browsers)
        response.headers.set("Access-Control-Allow-Origin", "*");
        console.log('Worker: No Origin header, allowing all origins');
      }
      
      response.headers.set("Access-Control-Allow-Methods", "GET,HEAD,POST,OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Accept");
      response.headers.set("Access-Control-Allow-Credentials", "false");
      
      // Append Vary header so browser will cache response correctly
      response.headers.append("Vary", "Origin");

      return response;
    }

    async function handleOptions(request) {
      const requestOrigin = request.headers.get("Origin");
      
      console.log('Worker: Handling OPTIONS preflight', { origin: requestOrigin });
      
      if (
        requestOrigin !== null &&
        request.headers.get("Access-Control-Request-Method") !== null &&
        request.headers.get("Access-Control-Request-Headers") !== null
      ) {
        // Handle CORS preflight requests
        return new Response(null, {
          headers: {
            "Access-Control-Allow-Origin": requestOrigin,
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
            "Access-Control-Allow-Headers": request.headers.get(
              "Access-Control-Request-Headers",
            ) || "Content-Type, Accept",
            "Access-Control-Max-Age": "86400",
            "Access-Control-Allow-Credentials": "false",
          },
        });
      } else {
        // Handle standard OPTIONS request
        return new Response(null, {
          headers: {
            Allow: "GET, HEAD, POST, OPTIONS",
          },
        });
      }
    }

    // Handle OPTIONS preflight requests
    if (request.method === "OPTIONS") {
      return handleOptions(request);
    }
    
    // Handle GET, HEAD, POST requests
    if (
      request.method === "GET" ||
      request.method === "HEAD" ||
      request.method === "POST"
    ) {
      return handleRequest(request);
    }
    
    // Method not allowed
    return new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
      headers: {
        "Access-Control-Allow-Origin": request.headers.get("Origin") || "*",
      },
    });
  },
};
