FROM node:20-alpine

ENV JWT_SECRET="Test value, change-me"

RUN npm install -g typescript @nestjs/cli eslint

WORKDIR /opt/app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

CMD [ "node", "dist/main.js" ]

