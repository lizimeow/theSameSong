FROM daocloud.io/node:8  

ENV HTTP_PORT 3001
RUN mkdir /app
COPY ./package.json /app 
WORKDIR /app

RUN npm install --registry=https://registry.npm.taobao.org

COPY . /app


EXPOSE 3001

CMD ["npm", "start"]  
