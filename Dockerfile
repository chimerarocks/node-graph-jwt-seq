FROM node:8

USER node

WORKDIR /usr/src/app

EXPOSE 3000

#docker run -p 3000:3000 --rm -v $(pwd):/usr/src/app -it node-graph bash
#docker run -p 3000:3000 -v $(pwd):/usr/src/app -it node-graph bash