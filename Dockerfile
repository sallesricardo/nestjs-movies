FROM node:20-alpine

WORKDIR /opt/app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

CMD [ "node", "dist/main.js" ]
