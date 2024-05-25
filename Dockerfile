FROM node:22-slim

WORKDIR /app

COPY package*.json .

RUN npm install
RUN npm install -g nodemon @swc/core @swc/cli

COPY . .

RUN npm run build

CMD [ "node", "dist/src/index.js" ]