FROM node:20 -alpine

WORKDIR /examen-daw-2526

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]