#!/usr/bin/env bash
# cloudflare-deploy.command
# Double-click this file in Finder to build + deploy to Cloudflare Pages.
# ─────────────────────────────────────────────────────────────────────────
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_NAME="asif-academy"

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║   Asif Academy — Cloudflare Pages Deploy         ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

cd "$PROJECT_DIR"

# ── 1. Install wrangler locally if needed ─────────────────────────
echo "▶ Step 1/4 — Installing wrangler locally"
npm install --save-dev wrangler --silent
echo "  ✓  wrangler $(npx wrangler --version 2>/dev/null | head -1)"

# ── 2. Cloudflare login ───────────────────────────────────────────
echo ""
echo "▶ Step 2/4 — Cloudflare login"
echo "  Your browser will open. Log in and click Allow."
echo "  Return here once the browser shows: 'You have granted authorization'"
echo ""
npx wrangler login

# ── 3. Build ──────────────────────────────────────────────────────
echo ""
echo "▶ Step 3/4 — Building (TypeScript + Vite)"
npm run build
echo "  ✓  Build complete ($(du -sh dist | cut -f1))"

# ── 4. Deploy to Cloudflare Pages ────────────────────────────────
echo ""
echo "▶ Step 4/4 — Deploying to Cloudflare Pages"
npx wrangler pages deploy dist \
  --project-name "$PROJECT_NAME" \
  --branch master

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║   ✅  DEPLOYED                                   ║"
echo "║                                                  ║"
echo "║   Live URL:                                      ║"
echo "║   https://asif-academy.pages.dev                 ║"
echo "║                                                  ║"
echo "║   ⚠️  REMINDER: Set env vars in Cloudflare        ║"
echo "║   Dashboard → Pages → asif-academy →             ║"
echo "║   Settings → Environment Variables:              ║"
echo "║     VITE_AUTH0_DOMAIN=kashkole.auth0.com         ║"
echo "║     VITE_AUTH0_CLIENT_ID=CWVjUioTqVqcGZG2...    ║"
echo "║   Then redeploy once for the vars to take effect ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
echo "Press any key to close..."
read -n 1
