FROM node:8

WORKDIR /usr/src/app

EXPOSE 3000

#docker run -p 3000:3000 --rm -v $(pwd):/usr/src/app -it node-graph bash