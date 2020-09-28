FROM node:12-alpine as build
ARG API_BASE_URL
ARG NODE_ENV
ENV API_BASE_URL=$API_BASE_URL
ENV NODE_ENV=$NODE_ENV
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
#COPY package.json yarn.lock ./
RUN yarn
COPY . /app
RUN yarn build

FROM nginx:1.19-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]