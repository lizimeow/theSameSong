const express = require('express')
const path = require('path')
const router = express.Router()
const shortid = require('shortid')
const Controller = require('../controller')

// const Controller = require('../controller')
// const jwt = require('../middleware/jwt')
// const jwtpub = require('../middleware/jwtpub')
const config = require('../config/config')
// require('../socket')
// router.use(jwt({ secret: config.secret }).unless({ path: [/^\/api\/login/, /^\/api\/register/, /^\/api\/activities$/] }))
// router.use(jwt({ secret: config.secret }).unless(function () {
//     return ['/api/login', '/api/register'].indexOf(this.originalUrl) !== -1 ||
//            (this.request.method === 'GET' && '/api/recruitments' === this.originalUrl)
// }))
// const io = require('./socket').listen(http)

router.use(express.static(path.join(__dirname, '..', '..', 'build')))

router
    .get('/', (req, res) => {
        res.sendFile('index.html')
    })
    .post('/login', Controller.login)    
    .get('/room', Controller.searchRoom)
    .post('/room', Controller.addRoom)
    // .get('/rooms', Controller.getRooms)
    // .get('/room/:id', Controller.hasRoomData, Controller.getRoom)
    .get('/error', (req, res) => {
        res.send('aaaaa')
    })
    .get('/public/:id', Controller.getPublic)
    .get('/cursong', Controller.getCurSong)
    
// router
//     .del('/recruitments/:id', Controller.delActivity)
//     .get('/recruitments', jwtpub({ secret: config.secret }), Controller.getRecruitments)
//     .get('/recruitments/:id', Controller.getActivity)
//     .post('/recruitments', Controller.addActivity)
//     .post('/recruitments/:id', Controller.join)// join and passJoin
//     .put('/recruitments/:id', Controller.like)
// router
//     .get('/', Controller.index)
//     .get('/sign/:id', Controller.sign)
//     .del('/sign/:id', Controller.delSign)
//     .get('/sign/:id/:hash', Controller.signIn)
//     .get('/profile/recruitments/:id', Controller.profileGetActivity)
//     .get('/profile', Controller.profile)
//     .post('/login', Controller.login)
//     // .post('/register', Controller.register)
module.exports = router