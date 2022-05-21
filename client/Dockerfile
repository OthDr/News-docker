FROM node:16.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app



COPY package.json /usr/src/app

COPY package-lock.json /usr/src/app

RUN npm install -g npm@8.10.0

RUN npm config set unsafe-perm true

RUN npm install

COPY . /usr/src/app

EXPOSE 3006

CMD ["npm","run" ,"start"]
