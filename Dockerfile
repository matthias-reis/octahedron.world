# ---- deps ----
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY patches ./patches
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# ---- build ----
FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm build

# ---- runtime ----
FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# SolidStart/Vinxi build output
COPY --from=build /app/.output ./
# Generated data files
COPY --from=build /app/data.json /app/routes.json /app/redirects.json ./

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server/index.mjs"]
