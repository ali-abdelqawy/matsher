FROM node:22-slim AS build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:22-slim AS production
WORKDIR /app
RUN npm install -g nodemon @swc/core @swc/cli
COPY --from=build /app/dist ./dist
CMD [ "node", "dist/src/index.js" ]
