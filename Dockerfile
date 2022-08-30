FROM node:16.13.2

EXPOSE 3000

WORKDIR /usr/src

RUN npm i npm@latest -g

COPY package.json package-lock*.json ./

RUN npm install

COPY . .
RUN npm i -g prisma
RUN prisma db pull
RUN prisma generate
CMD  ["node", "dist/app.js"]