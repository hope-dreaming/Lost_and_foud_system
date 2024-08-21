import express from 'express'
import { addUserInfo, queryUserInfo, queryUserList } from './user'
import { login } from './login'
import { queryReturnitemList } from './returnitem'
import { queryFoundItemInfo, queryFoundItemList } from './founditem'
import { queryLossItemList, queryLosttItemInfo } from './lossitem'

const router = express.Router()

// 登录
router.post('/login', login)


// 寻物信息

router.post('/queryLossItemList', queryLossItemList)

router.post('/queryLosttItemInfo', queryLosttItemInfo)

// 失物信息

router.post('/queryFoundItemList', queryFoundItemList)

router.post('/queryFoundItemInfo', queryFoundItemInfo)

// 归还记录
router.post('/queryReturnitemList', queryReturnitemList)



// 用户
router.post('/queryUserList', queryUserList)

router.post('/queryUserInfo', queryUserInfo)

router.post('/addUserInfo', addUserInfo)

export default router