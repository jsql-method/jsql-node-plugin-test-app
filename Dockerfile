FROM node:11 as builder

WORKDIR /build

ADD . /build
RUN npm install -g grunt
RUN npm install && grunt buildDist

FROM nginx:stable-alpine
COPY --from=builder /build/dist/ /usr/share/nginx/html
