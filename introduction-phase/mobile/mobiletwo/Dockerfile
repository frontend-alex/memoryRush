FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npm install -g react-native-cli

COPY . .

EXPOSE 8081

CMD ["npm", "start"]