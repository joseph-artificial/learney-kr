# syntax=docker/dockerfile:1.7

FROM node:20-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps

COPY package.json package-lock.json ./

ARG NPM_TOKEN
RUN --mount=type=secret,id=npm_token \
  set -eux; \
  token=""; \
  if [ -f /run/secrets/npm_token ]; then token="$(cat /run/secrets/npm_token)"; fi; \
  if [ -z "${token}" ] && [ -n "${NPM_TOKEN:-}" ]; then token="${NPM_TOKEN}"; fi; \
  if [ -n "${token}" ]; then \
  printf "@artificial-society:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=%s\n" "${token}" > .npmrc; \
  fi; \
  npm ci --no-audit --no-fund; \
  rm -f .npmrc

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=5001

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 5001

CMD ["node", "server.js"]
