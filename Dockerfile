FROM node:14.17.1

COPY . /usr/local/

WORKDIR /usr/local/

RUN npm install

CMD ["node", "index.js"]