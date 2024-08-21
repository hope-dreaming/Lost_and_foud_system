import express from 'express'
import { addUserInfo, queryUserInfo, queryUserList } from './user'
import { login } from './login'

const router = express.Router()

// 登录
router.post('/login', login)

// 用户
router.post('/queryUserList', queryUserList)

router.post('/queryUserInfo', queryUserInfo)

router.post('/addUserInfo', addUserInfo)


// 寻物信息


// 失物信息


// 归还记录

export default router