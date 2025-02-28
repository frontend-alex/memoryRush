FROM node:22.14.0-alpine3.21

WORKDIR /app

COPY ./src ./src

COPY tsconfig*.json ./

COPY package*.json ./

RUN npm install -y && npx tsc

EXPOSE 3000

CMD ["npm" , "start"]