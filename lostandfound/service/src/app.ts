import express from 'express'
import userRouter from './router/index'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { expressjwt } from 'express-jwt'
import { JWT_SECRET } from './constants'

const app = express()

var createError = require('http-errors')
var cookieParser = require('cookie-parser')


app.use(express.static('public'))

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())


dotenv.config()

app.all('*', (_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Headers', 'authorization, Content-Type')
    res.header('Access-Control-Allow-Methods', '*')
    next()
})
// 设置跨域
app.use(cors({
    origin: '*', // 允许任何源
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// app.use(function (req, res, next) {
//     next(createError(404))
// })

app.use(
    expressjwt(
        { secret: JWT_SECRET, algorithms: ['HS256'] }
    ).unless({
        path: ['/api/login', '/api/register'],
    }))

require('./database/init')

app.use('/api', userRouter)







app.listen(3005, () => { console.log('server started') })