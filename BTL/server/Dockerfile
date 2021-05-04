FROM node:carbon

LABEL maintainer="Giap Dong@giapdong992@gmail.com"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app src
COPY . .

# Install app dependencies
RUN npm install

EXPOSE 9000

CMD [ "npm", "start" ]