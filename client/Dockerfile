FROM node:16-alpine

RUN mkdir -p /usr/src/client-swa
WORKDIR /usr/src/client-swa

COPY ./src /usr/src/client-swa
RUN npm install
RUN npm run build

EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["npm", "start"]
