# Build the Nest BFF (server-rendered app + puppeteer/chromium PDF generation)
FROM node:24.19.0-slim AS build

# Copy, build static files; see .dockerignore for exclusions
WORKDIR /app
COPY . ./
RUN npm ci --ignore-scripts && npm run build

# Dependencies
FROM node:24.19.0-slim AS dependencies

WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts --omit=dev

# Build custom Caddy binary with Coraza WAF plugin
FROM caddy:2.11.4-builder AS caddy
# Install CA certificates for Go module downloads; libcap for setcap
RUN apk add --no-cache ca-certificates libcap
RUN xcaddy build \
    --with github.com/corazawaf/coraza-caddy/v2
# Strip file capabilities here so the final image does not need libcap
RUN setcap -r /usr/bin/caddy

# Deploy
# Not distroless: this app launches a real Chromium at runtime (puppeteer, for
# /bc-registry PDF generation), which needs a package manager to install and a
# fuller set of shared libraries than a distroless image provides. Debian's own
# chromium package (not Google's .deb, not Alpine's musl build) so this works
# on both amd64 and arm64 without platform pinning; the xcaddy-built Caddy
# binary above is a static Go binary and runs unmodified on either libc.
FROM node:24.19.0-slim
ENV NODE_ENV=production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    fonts-liberation \
    tini \
    wget \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy custom Caddy binary (capabilities already stripped in caddy stage; satisfies KSV022)
COPY --from=caddy /usr/bin/caddy /usr/bin/caddy

# Copy the built Nest BFF (dist/src/main is started by docker-entrypoint.sh)
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

# Static files served by Caddy: only the public assets, not the compiled
# server code that also lives under dist/
COPY --from=build /app/dist/public /srv
COPY Caddyfile /etc/caddy/Caddyfile
COPY coraza.conf /etc/caddy/coraza.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Set permissions for app and static files (OpenShift-compatible)
# OpenShift uses random UIDs but assigns them to root group (GID 0)
RUN chown -R 1001:0 /app /srv && \
    chmod -R 755 /app /srv

# Create directories for Coraza WAF with restricted permissions
RUN mkdir -p /tmp/coraza && \
    chown -R 1001:0 /tmp/coraza && \
    chmod -R 770 /tmp/coraza

RUN /usr/bin/caddy fmt /etc/caddy/Caddyfile

# Boilerplate, since these are ignored by OpenShift
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O /dev/null http://127.0.0.1:3001/health || exit 1
EXPOSE 3000 3001
USER 1001

# Startup: tini reaps zombie/defunct children (puppeteer spawns Chromium
# processes); docker-entrypoint.sh starts the Nest BFF and Caddy.
ENTRYPOINT ["/usr/bin/tini", "--", "/docker-entrypoint.sh"]
