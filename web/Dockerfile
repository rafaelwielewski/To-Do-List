FROM node

RUN mkdir -p /app/web
WORKDIR /app/web

COPY package*.json /app/web/

RUN npm install

COPY . /app/web/

CMD ["npm", "run", "dev"]


