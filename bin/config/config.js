'use strict'
const path = require('path')
const local = require('./local')
let config = {
    title: "",
    env: "production",
    port: 3002,
    staticDir: path.join(__dirname,'..', 'build'),
    mongodb: {
        connection: process.env.MONGODB_CONNECTION,
        host: process.env.MONGODB_PORT_27017_TCP_ADDR,        
        port: process.env.MONGODB_PORT_27017_TCP_PORT,
        collection: process.env.MONGODB_INSTANCE_NAME || 'thesamesong'
    },
}
if(process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'){
    config = Object.assign(config, local)
}
module.exports = config