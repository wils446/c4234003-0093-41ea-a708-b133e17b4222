FROM node:20-alpine as base 
RUN npm i -g pnpm@9.0.6

FROM base as dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base as build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build
# RUN pnpm prune --prod
RUN rm -r node_modules
RUN pnpm i --prod


FROM base as deploy 
WORKDIR /app
COPY --from=build /app/dist/ ./dist/
COPY --from=build /app/node_modules ./node_modules

CMD [ "node", "dist/main.js" ]