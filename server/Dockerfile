FROM node

RUN mkdir -p /app/server
WORKDIR /app/server

COPY package*.json /app/server/

RUN npm install

COPY . /app/server/

CMD ["npm", "run", "start:dev"]