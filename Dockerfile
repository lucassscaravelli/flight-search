FROM node:10-alpine as build-stage

WORKDIR /app
COPY  . .
RUN yarn
RUN yarn build

FROM nginx:1.15.8-alpine

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]