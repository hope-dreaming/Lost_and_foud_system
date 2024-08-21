import { sequelize } from "src/database/init";
import { User } from '../database/models/user'
import { message } from "antd";

// 查询所有用户信息列表

const queryUserInfo = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const userList = await User.findAll({
            where: {
                role: "user",
            }
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


// 添加单个用户信息

// 更新单个用户信息

// 删除单个用户信息