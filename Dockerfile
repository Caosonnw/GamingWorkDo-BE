FROM node:20

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn config set network-timeout 3000000

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 8080
EXPOSE 8081

CMD [ "yarn", "run", "start:prod" ]

# docker build . -t img-gwd-be

# docker run -d -p 8080:8080 -p 8081:8081 --name cons-gwd-be img-gwd-be
