import express from 'express'
import dayjs from 'dayjs'
import userRouter from './router/index'
import cors from 'cors'

const app = express()
const jwt = require('jsonwebtoken')

app.use(express.static('public'))
app.use(express.json())

app.all('*', (_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'authorization, Content-Type')
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

require('./database/init')

app.use('/api', userRouter)

app.use(cors({
    origin: '*', // 允许任何源
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.listen(3005, () => { console.log('server started') })