FROM node:22-slim

WORKDIR /app

COPY package*.json .

RUN npm install -g nodemon @swc/core @swc/cli
RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/src/index.js" ]