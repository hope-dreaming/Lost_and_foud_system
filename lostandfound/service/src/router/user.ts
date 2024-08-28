import { sequelize } from "src/database/init";
import { User } from '../database/models/user'
import { message } from "antd";
import { Lossitem } from "src/database/models/lossitem";
import { Founditem } from "src/database/models/founditem";
import { Returnitem } from "src/database/models/returnitem";
import { Op } from "sequelize";

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
            return res.send({ status: 200, message: '无用户', data: null })
        // console.log(userList)
        return res.send({
            status: 200,
            message: '查询成功',
            data: userList,

        })
    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null })
    }
}

// 查询单个用户信息
const queryUserInfo = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { id } = req.body
        if (!id)
            return res.send({ status: 200, message: '查询失败111', data: null })
        const userInfo = await User.findOne({
            where: {
                uid: id as number,
            }
        })
        if (!userInfo)
            return res.send({ status: 200, message: '无此用户', data: null })
        return res.send({
            status: 200,
            message: '查询成功',
            data: userInfo,
        })
    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null })
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
        return res.send({ status: 200, message: '添加成功', data: null, sucess: true })
    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null, sucess: false })
    }
}

// 更新单个用户信息
const updateUserInfo = async (req, res) => {
    try {
        const { tele, name, password, uno, sexy, role, uid } = req.body
        if (!uid)
            return res.send({ status: 200, message: '更新失败', data: null, sucess: false })

        await User.update({
            tele,
            name,
            password,
            uno,
            sexy,
            role,
        },
            {
                where: {
                    uid,
                }
            })
        return res.send({ status: 200, message: '更新成功', data: null, sucess: true })
    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null, sucess: false })
    }

}

// 删除单个用户信息
// 删除单个信息的同时应删除其所有寻物信息，失物招领信息，物品领取审核记录
const deleteUserInfo = async (req, res) => {

    try {
        const { id } = req.body

        if (!id)
            return res.send({ status: 200, message: '参数错误', data: null, sucess: false })

        await sequelize.transaction(async (t) => {

            const lossitem = await Lossitem.findAll({
                where: { uid: id },
            }, { transaction: t })

            if (lossitem.length > 0 && !lossitem) {
                await Lossitem.destroy({
                    where: { uid: id },
                }, { transaction: t })
            }
            const userid_returnitem = await Returnitem.findAll({
                where: {
                    [Op.or]: [
                        { uid: id }, { uaid: id }
                    ]
                },
            }, { transaction: t })

            if (userid_returnitem.length > 0 && !userid_returnitem) {

                for (const ritem of userid_returnitem) {
                    await Returnitem.destroy({
                        where: { rid: ritem.rid }
                    }, { transaction: t })
                }

            }

            const founditem = await Founditem.findAll({
                where: { uid: id },
            }, { transaction: t })

            if (founditem.length > 0 && !founditem) {

                for (const fitem of founditem) {
                    const returnitem = await Returnitem.findAll({
                        where: {
                            fid: fitem.fid,
                        }
                    }, { transaction: t })

                    if (returnitem.length > 0 && !returnitem) {
                        await Returnitem.destroy({
                            where: { fid: fitem.rid },
                        }, { transaction: t })
                    }
                }

                await Founditem.destroy({
                    where: { uid: id },
                }, { transaction: t })

            }


            await User.destroy({
                where: { uid: id },
            }, { transaction: t })

        })
        return res.send({
            status: 200,
            message: '删除成功',
            data: null,
            sucess: true
        })

    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null, sucess: false })
    }
}

// 更新用户启用状态
const updateUserSatus = async (req, res) => {
    try {
        const { uid, status } = req.body

        if (!uid || (status !== 1 && status !== 0))
            return res.send({ status: 200, message: '参数错误', data: null, sucess: false })

        await User.update({
            status,
        }, {
            where: { uid, },
        })

        return res.send({ status: 200, message: '更新成功', data: null, sucess: true })


    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null, sucess: false })
    }
}


export {
    queryUserList,
    queryUserInfo,
    addUserInfo,
    updateUserInfo,
    deleteUserInfo,
    updateUserSatus,
}