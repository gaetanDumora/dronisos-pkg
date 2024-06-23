FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN cd libraries/prisma && npx prisma generate && DATABASE_URL=postgres://dronisos:dronisos@postgres:5432/dronisos?schema=public npx prisma migrate dev --name init 

RUN npm run build

CMD ["npm", "run", "start:udp"]