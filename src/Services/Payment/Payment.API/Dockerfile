ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:${NODE_VERSION}-alpine AS runtime

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY . .

COPY --from=build /app/package*.json ./
COPY --from=build /app/tsconfig.json ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
