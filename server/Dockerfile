FROM node

RUN mkdir -p /usr/src/server-swa
WORKDIR /usr/src/server-swa

COPY ./src /usr/src/server-swa
RUN npm install

CMD ["npm", "start"]
