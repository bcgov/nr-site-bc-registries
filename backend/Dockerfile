# Build
FROM node:24.19.0-slim AS build

# Copy, build static files; see .dockerignore for exclusions
WORKDIR /app
COPY . ./
RUN npm ci --ignore-scripts && npm run build

# Dependencies
FROM node:24.19.0-slim AS dependencies

# Copy, build static files; see .dockerignore for exclusions
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts --omit=dev

# Deploy using minimal Distroless image
FROM gcr.io/distroless/nodejs24-debian12:nonroot
ENV NODE_ENV=production

# Copy app and dependencies
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Boilerplate, not used in OpenShift/Kubernetes
EXPOSE 3000

# Nonroot user; Node 24 automatically respects cgroup memory limits
USER nonroot
CMD ["/app/dist/src/main"]
