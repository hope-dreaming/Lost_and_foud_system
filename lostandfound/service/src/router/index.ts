import express from 'express'
import { addUserInfo, deleteUserInfo, queryUserInfo, queryUserList, updateUserInfo, updateUserSatus } from './user'
import { login } from './login'
import { addReturnitem, deleteReturnitem, queryAdminReturnitemList, queryUserReturnitemList, updateReturnitem } from './returnitem'
import { addFoundItem, deleteFoundItem, editFoundItemStatus, queryFoundItemInfo, queryFoundItemList, queryFountitemType, queryOneFoundItem, updateFoundItem } from './founditem'
import { queryLossItemList, queryLossItemInfo, addLossItem, updateLossItem, deleteLossItem, queryLossItemType, queryOneLossItem, editLossItemStatus } from './lossitem'

const router = express.Router()

// 登录
router.post('/login', login)

// 寻物信息

router.post('/queryLossItemList', queryLossItemList)

router.post('/queryLossItemInfo', queryLossItemInfo)

router.post('/addLossItem', addLossItem)

router.post('/updateLossItem', updateLossItem)

router.post('/deleteLossItem', deleteLossItem)

router.get('/queryLossItemType', queryLossItemType)

router.post('/queryOneLossItem', queryOneLossItem)

router.post('/editLossItemStatus', editLossItemStatus)

// 失物信息

router.post('/queryFoundItemList', queryFoundItemList)

router.post('/queryFoundItemInfo', queryFoundItemInfo)

router.post('/addFoundItem', addFoundItem)

router.post('/updateFoundItem', updateFoundItem)

router.post('/deleteFoundItem', deleteFoundItem)

router.get('/queryFountitemType', queryFountitemType)

router.post('/queryOneFoundItem', queryOneFoundItem)

router.post('/editFoundItemStatus', editFoundItemStatus)

// 归还记录

router.post('/queryAdminReturnitemList', queryAdminReturnitemList)

router.post('/queryUserReturnitemList', queryUserReturnitemList)

router.post('/addReturnitem', addReturnitem)

router.post('/updateReturnitem', updateReturnitem)

router.post('/deleteReturnitem', deleteReturnitem)



// 用户
router.post('/queryUserList', queryUserList)

router.post('/queryUserInfo', queryUserInfo)

router.post('/addUserInfo', addUserInfo)

router.post('/updateUserInfo', updateUserInfo)

router.post('/deleteUserInfo', deleteUserInfo)

router.post('/updateUserSatus', updateUserSatus)

export default router
