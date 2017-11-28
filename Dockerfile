FROM daocloud.io/node:8  

ENV HTTP_PORT 3001

COPY . /app  
WORKDIR /app

RUN npm install --registry=https://registry.npm.taobao.org

EXPOSE 3001

CMD ["npm", "start"]  
