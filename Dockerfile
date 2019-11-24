FROM node:8

WORKDIR /usr/src/app

RUN npm i -g sequelize-cli@3.0.0 typings
RUN typings install dt~validator --global --save

USER node

EXPOSE 3000

#docker run -p 3000:3000 --rm -v $(pwd):/usr/src/app -it node-graph bash
#docker run -p 3000:3000 -v $(pwd):/usr/src/app -it node-graph bash