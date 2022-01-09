FROM node:16.13.1

# create app directory
WORKDIR /usr/src/app

# copy app
COPY . .

# install required lib
RUN npm install -g typescript@4.5.4 rimraf@3.0.2 dotenv@10.0.0
RUN npm install
RUN npm run build

# expose listening ports
EXPOSE 9000

CMD ["node", "build/index.js"]

