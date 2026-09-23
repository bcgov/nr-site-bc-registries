#!/bin/sh
set -e

# Nest BFF (bc-registry PDF generation via puppeteer/chromium); Caddy proxies /bc-registry/* to it on port 3002.
PORT=3002 node /app/dist/src/main &

exec /usr/bin/caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
