/* eslint-disable @typescript-eslint/indent */
import { Op } from 'sequelize'
import { Returnitem } from 'src/database/models/returnitem'
import { User } from 'src/database/models/user'

// 查找记录列表
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
            res.send({ status: 401, message: '查询失败', data: null })

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
        return res.send({ status: 401, message: e.message, data: null })
    }
}

// 增加记录
const addReturnitem = async (req, res) => {

}

// 修改记录
const updateReturnitem = async (req, res) => {
}

// 删除记录
const deleteReturnitem = async (req, res) => {
}

export {
    queryReturnitemList,
    addReturnitem,
    updateReturnitem,
    deleteReturnitem,
}
