# ── Stage 1: Build ────────────────────────────────────────────────────────────
# Installs all dependencies and runs `nuxt build` to produce .output/
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: Run ──────────────────────────────────────────────────────────────
# Copies only the built output — no source code or node_modules in production
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.output ./.output

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
