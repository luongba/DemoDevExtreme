FROM node:16

ENV NODE_OPTIONS=--max-old-space-size=1024

WORKDIR /source
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.21.1 AS runtime
EXPOSE 80
COPY ./build.conf.env.sh /docker-entrypoint.d/build-conf-env.sh
RUN ["chmod", "+x", "/docker-entrypoint.d/build-conf-env.sh"]
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /wwwroot
COPY --from=0 /source/dist .
