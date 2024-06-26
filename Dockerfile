FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN cd libraries/prisma && npx prisma generate

RUN npm run build

CMD ["npm", "run", "start:all"]