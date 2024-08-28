/* eslint-disable @typescript-eslint/indent */
import { Op } from 'sequelize'
import { sequelize } from 'src/database/init'
import { Founditem } from 'src/database/models/founditem'
import { Returnitem } from 'src/database/models/returnitem'
import { User } from 'src/database/models/user'

// 管理员查询列表
const queryAdminReturnitemList = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { item_fid, item_tele, isok, item_uaid } = req.body
        const user = await User.findOne({
            where: { ...((item_tele !== null && item_tele !== undefined && item_tele !== '') ? { tele: item_tele } : {}), },
        })
        const user_uid = user.uid
        const admin = await User.findOne({
            where: { ...((item_uaid !== null && item_uaid !== undefined && item_uaid !== '') ? { tele: item_uaid } : {}), },
        })
        const admin_uid = admin.uid
        const whereReturnItem = {
            ...((user_uid !== null && user_uid !== undefined && user_uid !== '') ? { uid: user_uid } : {}),
            ...((item_fid !== null && item_fid !== undefined && item_fid !== '') ? { fid: item_fid } : {}),
            ...((isok === 2) ? { isok } : { isok: { [Op.notIn]: [2] } }),
            ...((admin_uid !== null && admin_uid !== undefined && admin_uid !== '') ? { uaid: admin_uid } : {}),
        }
        const returnitemList = await Returnitem.findAll({
            where: whereReturnItem,
        })

        if (!returnitemList)
            return res.send({ status: 200, message: '查询失败', data: null })

        const result = []
        for (const list of returnitemList) {
            const { uid } = list
            const user = await User.findOne({
                where: { uid },
                attributes: ['tele'],
            })
            result.push({
                ...list.toJSON(),
                tele: user.tele,
            })
        }

        return res.send({
            status: 200,
            message: '查询成功',
            data: result,
        })
    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null })
    }
}

// 用户查询列表 
const queryUserReturnitemList = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { item_fid, isok, userId, item_uaid } = req.body
        if (!userId)
            return res.send({ status: 200, message: '参数错误', data: null, sucess: false })

        const admin = await User.findOne({
            where: { ...((item_uaid !== null && item_uaid !== undefined && item_uaid !== '') ? { tele: item_uaid } : {}), },
        })
        const admin_uid = admin.uid
        const whereReturnItem = {
            ...((userId !== null && userId !== undefined && userId !== '') ? { uid: userId } : {}),
            ...((item_fid !== null && item_fid !== undefined && item_fid !== '') ? { fid: item_fid } : {}),
            ...((isok === 2) ? { isok } : { isok: { [Op.notIn]: [2] } }),
            ...((admin_uid !== null && admin_uid !== undefined && admin_uid !== '') ? { uaid: admin_uid } : {}),
        }
        const returnitemList = await Returnitem.findAll({
            where: whereReturnItem,
        })

        if (!returnitemList)
            return res.send({ status: 200, message: '查询失败', data: null })

        const result = []
        for (const list of returnitemList) {
            const { uid } = list
            const user = await User.findOne({
                where: { uid },
                attributes: ['tele'],
            })
            result.push({
                ...list.toJSON(),
                tele: user.tele,
            })
        }

        return res.send({
            status: 200,
            message: '查询成功',
            data: result,
        })
    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null })
    }
}
// 增加申请
const addReturnitem = async (req, res) => {
    try {
        const { uid, date, fid } = req.body
        const returnitem = await Returnitem.create({
            uid,
            date,
            fid,
        })
        if (!returnitem)
            return res.send({ status: 200, message: '申请失败', data: null, sucess: false })

        return res.send({
            status: 200,
            message: '申请成功',
            sucess: true
        })
    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null, sucess: false })
    }
}

// 审核申请
// 审核申请的同时，如果审核通过，则审核物品为归还状态isreturn=1,否则不做修改
const updateReturnitem = async (req, res) => {
    try {
        const { isok, rid, uaid, fid } = req.body

        if (!isok || !rid || !uaid || !fid)
            return res.send({
                status: 200,
                message: '参数错误',
                sucess: false,
            })

        await sequelize.transaction(async (t) => {
            const result = await Returnitem.update({
                isok,
                uaid,
            }, {
                where: { rid, },
            }, { transaction: t })


            if (isok === 1) {
                await Founditem.update({
                    isreturn: 1,
                }, {
                    where: { fid, },
                }, { transaction: t })
            }

            return result
        })

        return res.send({
            status: 200,
            message: '审核成功',
            sucess: true,
        })
    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null, sucess: false })
    }
}

// 删除申请记录
const deleteReturnitem = async (req, res) => {
    try {
        const { id } = req.body

        if (!id)
            return res.send({ status: 200, message: '参数错误', data: null, sucess: false })

        const returnitem = await Returnitem.destroy({
            where: { rid: id, },
        })
        if (!returnitem)
            return res.send({ status: 200, message: '删除失败', data: null, sucess: false })

        return res.send({
            status: 200,
            message: '删除成功',
            sucess: true
        })
    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null, sucess: false })
    }
}

export {
    queryAdminReturnitemList,
    queryUserReturnitemList,
    addReturnitem,
    updateReturnitem,
    deleteReturnitem,
}
