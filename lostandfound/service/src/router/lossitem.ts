import { Lossitem } from "src/database/models/lossitem"
import { User } from "src/database/models/user"

// 查询寻物列表
const queryLossItemList = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { item_name, item_type } = req.body
        const whereReturnItem = {
            ...((item_name !== null && item_name !== undefined && item_name !== '') ? { name: item_name } : {}),
            ...((item_type !== null && item_type !== undefined && item_type !== '') ? { type: item_type } : {}),
            isfound: 0,
        }
        const LossitemList = await Lossitem.findAll({
            where: whereReturnItem,
        })

        if (!LossitemList)
            return res.send({ status: 401, message: '无寻物信息', data: null })

        const result = []
        for (const list of LossitemList) {
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
        return res.send({ status: 401, message: e.message, data: null })
    }
}

// 查询个人寻物列表
const queryLosttItemInfo = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { item_name, item_type, userId } = req.body
        if (!userId)
            return res.send({ status: 401, message: '请登录', data: null })
        const whereReturnItem = {
            ...((item_name !== null && item_name !== undefined && item_name !== '') ? { name: item_name } : {}),
            ...((item_type !== null && item_type !== undefined && item_type !== '') ? { type: item_type } : {}),
            uid: userId,
        }
        const LossitemInfo = await Lossitem.findAll({
            where: whereReturnItem,
        })
        if (!LossitemInfo)
            return res.send({ status: 401, message: '无寻物信息', data: null })
        return res.send({
            status: 200,
            message: '查询成功',
            data: LossitemInfo,
        })
    }
    catch (e) {
        return res.send({ status: 401, message: e.message, data: null })
    }
}

export {
    queryLossItemList,
    queryLosttItemInfo,
}
