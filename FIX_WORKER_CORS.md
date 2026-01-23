# Fix Cloudflare Worker CORS Issue

## Problem
The API calls are going to the correct URL (`https://misty-snowflake-cda4teara-api-proxy.campusmap99.workers.dev`), but the CORS header is set incorrectly:
- **Current (Wrong):** `Access-Control-Allow-Origin: https://misty-snowflake-cda4teara-api-proxy.campusmap99.workers.dev`
- **Should be:** `Access-Control-Allow-Origin: http://localhost:3001` (for local dev) or your Cloudflare Pages URL (for production)

## Solution
Update your Cloudflare Worker code to correctly set the CORS origin header.

## Steps to Fix

1. **Go to Cloudflare Dashboard:**
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Workers & Pages**
   - Find your Worker: `misty-snowflake-cda4teara-api-proxy`

2. **Update the Worker Code:**
   - Click on your Worker to open it
   - Click **"Edit code"** or **"Quick edit"**
   - Replace the entire Worker code with the code from `cloudflare-worker-cors-proxy.js` in this directory
   - **Key fix:** The code now correctly sets `Access-Control-Allow-Origin` to the requesting origin (line 60-64)

3. **Deploy the Worker:**
   - Click **"Save and deploy"** or **"Deploy"**
   - Wait for deployment to complete (usually a few seconds)

4. **Test:**
   - Restart your local dev server
   - Try searching again
   - Check the Network tab - the `Access-Control-Allow-Origin` header should now be `http://localhost:3001`
   - The search should work without CORS errors

## What Changed

The Worker code now:
- ✅ Gets the `Origin` header from the incoming request
- ✅ Sets `Access-Control-Allow-Origin` to that origin (not the Worker's own origin)
- ✅ Includes logging to help debug CORS issues

## Verification

After updating, check the Network tab in your browser:
- Request URL: `https://misty-snowflake-cda4teara-api-proxy.campusmap99.workers.dev/query/search?...`
- Response Headers → `Access-Control-Allow-Origin`: Should be `http://localhost:3001` (not the Worker URL)
