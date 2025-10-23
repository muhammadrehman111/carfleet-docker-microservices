FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /app
# install serve
RUN npm i -g serve
COPY --from=build /app/build /app/build
EXPOSE 80
CMD ["serve", "-s", "build", "-l", "80"]
