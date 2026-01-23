# Step-by-Step: Fix Cloudflare Worker CORS

## Current Problem
Your Worker is returning:
```
Access-Control-Allow-Origin: https://misty-snowflake-cda4teara-api-proxy.campusmap99.workers.dev
```

But it should return:
```
Access-Control-Allow-Origin: http://localhost:3001
```

## Solution: Update Your Cloudflare Worker

### Step 1: Open Cloudflare Dashboard
1. Go to: https://dash.cloudflare.com/
2. Log in to your account

### Step 2: Navigate to Your Worker
1. In the left sidebar, click **"Workers & Pages"**
2. Find and click on: **`misty-snowflake-cda4teara-api-proxy`**

### Step 3: Edit the Worker Code
1. Click the **"Edit code"** button (or "Quick edit")
2. You should see the Worker code editor

### Step 4: Replace the Code
1. **Select ALL the existing code** (Ctrl+A or Cmd+A)
2. **Delete it**
3. **Copy the entire contents** of `cloudflare-worker-cors-proxy.js` from this directory
4. **Paste it** into the editor

### Step 5: Verify the Key Fix
Look for this section in the code (around line 60-64):
```javascript
// Get the origin from the request (the page making the request)
const requestOrigin = request.headers.get("Origin");

// CRITICAL: Set CORS headers to the REQUESTING origin, not the Worker's origin
if (requestOrigin) {
  response.headers.set("Access-Control-Allow-Origin", requestOrigin);
```

This is the critical fix - it uses `requestOrigin` (from the browser) instead of the Worker's own origin.

### Step 6: Deploy
1. Click **"Save and deploy"** button (usually at the bottom right)
2. Wait for the deployment to complete (you'll see a success message)

### Step 7: Test
1. **Restart your local dev server** (stop and start `npm run dev`)
2. **Clear your browser cache** (Ctrl+Shift+R or Cmd+Shift+R)
3. **Try searching again** (type "Q L" in the search bar)
4. **Check Network tab** → Click on the search request
5. **Look at Response Headers** → `Access-Control-Allow-Origin` should now be `http://localhost:3001`

## Verification Checklist

After updating, verify:
- ✅ Request URL goes to: `https://misty-snowflake-cda4teara-api-proxy.campusmap99.workers.dev/query/search?...`
- ✅ Status is `200 OK`
- ✅ `Access-Control-Allow-Origin` header is `http://localhost:3001` (NOT the Worker URL)
- ✅ Search results appear in the UI (no CORS errors in console)

## If It Still Doesn't Work

1. **Check the Console tab** in DevTools for any error messages
2. **Verify the Worker code** - make sure line 60-64 uses `requestOrigin`
3. **Check Worker logs** in Cloudflare Dashboard → Workers → Your Worker → Logs
4. **Try hard refresh** - Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## For Production (Cloudflare Pages)

When you deploy to Cloudflare Pages, the `Access-Control-Allow-Origin` will automatically be set to your Pages URL (e.g., `https://your-app.pages.dev`) because the Worker reads the `Origin` header from the request.
