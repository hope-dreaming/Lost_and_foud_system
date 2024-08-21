import express from 'express'
import dayjs from 'dayjs'
import userRouter from './router/index'

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

require('./database/init')

app.use('/api', userRouter)

app.listen(3001, () => { console.log('server started') })