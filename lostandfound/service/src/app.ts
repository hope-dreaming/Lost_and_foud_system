const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())

require('./database/init')

app.listen(3001, () => { console.log('server started') })