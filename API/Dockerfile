FROM node:16.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install 

COPY . /usr/src/app

EXPOSE 3001

CMD ["node","router.js"]
