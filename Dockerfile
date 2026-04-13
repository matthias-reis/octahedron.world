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
RUN corepack enable pnpm && pnpm build && \
    ./node_modules/.bin/esbuild scripts/analyze-logs.ts \
      --bundle --platform=node --format=esm \
      --outfile=scripts/analyze-logs.js

# ---- runtime ----
FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# SolidStart/Vinxi build output
COPY --from=build /app/.output ./
# Generated data files
COPY --from=build /app/data.json /app/routes.json /app/redirects.json ./
# Compiled log analysis script
COPY --from=build /app/scripts/analyze-logs.js ./scripts/analyze-logs.js

RUN apk add --no-cache dcron

COPY crontab /etc/crontabs/root
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 3000
ENV PORT=3000

CMD ["./entrypoint.sh"]
