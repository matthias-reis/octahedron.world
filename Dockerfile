# ---- deps ----
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile

# ---- build ----
FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && yarn build

# ---- runtime ----
FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Next standalone server
COPY --from=build /app/.next/standalone ./
# Static assets
COPY --from=build /app/.next/static ./.next/static
# Public folder (falls vorhanden)
COPY --from=build /app/public ./public

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
