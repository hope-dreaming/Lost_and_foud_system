/* eslint-disable @typescript-eslint/indent */
import { Op } from 'sequelize'
import { Returnitem } from 'src/database/models/returnitem'
import { User } from 'src/database/models/user'

// 查找申请列表
const queryReturnitemList = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { item_fid, item_tele, role, isok, userId, item_uaid } = req.body
        const whereReturnItem = {
            ...((item_tele !== null && item_tele !== undefined && item_tele !== '') ? { tele: item_tele } : {}),
            ...((item_fid !== null && item_fid !== undefined && item_fid !== '') ? { fid: item_fid } : {}),
            ...((isok === 2) ? { isok } : { isok: { [Op.notIn]: [2] } }),
            ...((role === 'user' && userId !== null && userId !== undefined && userId !== '') ? { tele: userId } : {}),
            ...((item_uaid !== null && item_uaid !== undefined && item_uaid !== '') ? { uaid: item_uaid } : {}),
        }
        const returnitemList = await Returnitem.findAll({
            where: whereReturnItem,
        })

        if (!returnitemList)
            res.send({ status: 200, message: '查询失败', data: null })

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

        res.send({
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
        const { uid, uaid, date, fid } = req.body
        const returnitem = await Returnitem.create({
            uid,
            uaid,
            date,
            fid,
        })
        if (!returnitem)
            res.send({ status: 200, message: '申请失败', data: null })

        res.send({
            status: 200,
            message: '申请成功',
        })
    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null })
    }
}

// 修改申请
// 审核申请的同时，如果审核通过，则审核物品为归还状态isfound=1,否则不做修改
const updateReturnitem = async (req, res) => {
    try {
        const { isok, rid } = req.body
        const returnitem = await Returnitem.update({
            isok,
        }, {
            where: { rid },
        })
        if (!returnitem)
            res.send({ status: 200, message: '审核失败', data: null })
        res.send({
            status: 200,
            message: '审核成功',
        })
    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null })
    }
}

// 删除记录
const deleteReturnitem = async (req, res) => {
    try {
        const { rid } = req.body
        const returnitem = await Returnitem.destroy({
            where: { rid },
        })
        if (!returnitem)
            res.send({ status: 200, message: '删除失败', data: null })

        res.send({
            status: 200,
            message: '删除成功',
        })
    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null })
    }
}

export {
    queryReturnitemList,
    addReturnitem,
    updateReturnitem,
    deleteReturnitem,
}
