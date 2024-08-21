import { sequelize } from "src/database/init";
import { User } from '../database/models/user'
import { message } from "antd";

// 查询所有用户信息列表

const queryUserList = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { item_tele, item_name, item_status } = req.body
        const whereUserList = {
            ...((item_tele !== null && item_tele !== undefined && item_tele !== '') ? { tele: item_tele } : {}),
            ...((item_name !== null && item_name !== undefined && item_name !== '') ? { name: item_name } : {}),
            ...((item_status !== null && item_status !== undefined && item_status !== '') ? { status: item_status } : {}),
            role: "user",
        }
        const userList = await User.findAll({
            where: whereUserList,
        })
        if (!userList)
            return res.send({ status: 401, message: '无用户', data: null })
        res.send({
            status: 200,
            message: '查询成功',
            data: userList,
        })
    }
    catch (e) {
        res.send({ status: 401, message: e.message, data: null })
    }
}

// 查询单个用户信息
const queryUserInfo = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { userId } = req.body
        const userInfo = User.findOne({
            where: {
                uid: userId,
            }
        })
        if (!userInfo)
            return res.send({ status: 401, message: '无此用户', data: null })
        return res.send({
            status: 200,
            message: '查询成功',
            data: userInfo,
        })
    }
    catch (e) {
        res.send({ status: 401, message: e.message, data: null })
    }
}

// 添加单个用户信息
const addUserInfo = async (req, res) => {
    try {
        const { tele, name, password, uno, sexy, role } = req.body
        await User.create({
            tele,
            name,
            password,
            uno,
            sexy,
            role,
            status: 1,
        })
    }
    catch (e) {
        res.send({ status: 401, message: e.message, data: null })
    }
}

// 更新单个用户信息

// 删除单个用户信息


export {
    queryUserList,
    queryUserInfo,
    addUserInfo
}