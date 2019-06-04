FROM node:11 as builder

WORKDIR /build

ADD . /build
RUN npm install
CMD node src/app.js
