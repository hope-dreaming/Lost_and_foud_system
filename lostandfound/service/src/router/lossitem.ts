import { message } from "antd"
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
            return res.send({ status: 200, message: '无寻物信息', data: null })

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
        return res.send({ status: 200, message: e.message, data: null })
    }
}

// 查询个人寻物列表
const queryLossItemInfo = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { item_name, item_type, userId } = req.body
        if (!userId)
            return res.send({ status: 200, message: '请登录', data: null })
        const whereReturnItem = {
            ...((item_name !== null && item_name !== undefined && item_name !== '') ? { name: item_name } : {}),
            ...((item_type !== null && item_type !== undefined && item_type !== '') ? { type: item_type } : {}),
            uid: userId,
        }
        const LossitemInfo = await Lossitem.findAll({
            where: whereReturnItem,
        })
        if (!LossitemInfo)
            return res.send({ status: 200, message: '无寻物信息', data: null })
        return res.send({
            status: 200,
            message: '查询成功',
            data: LossitemInfo,
        })
    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null })
    }
}

// 查询单个寻物信息以更新
const queryOneLossItem = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { id } = req.body
        if (!id)
            return res.send({ status: 200, message: '无该物品信息', data: null, sucess: false })
        const LossitemInfo = await Lossitem.findOne({
            where: {
                lid: id
            },
        })
        if (!LossitemInfo)
            return res.send({ status: 200, message: '无寻物信息', data: null, sucess: false })
        const { uid } = LossitemInfo
        const user = await User.findOne({
            where: { uid },
            attributes: ['tele'],
        })
        return res.send({
            status: 200,
            message: '查询成功',
            sucess: true,
            data: {
                ...LossitemInfo.toJSON(),
                tele: user.tele,
            },
        })
    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null, sucess: false })
    }

}
// 添加寻物信息
const addLossItem = async (req, res) => {
    try {
        const { name, type, date, place, desc, uid } = req.body
        const lossitem = await Lossitem.create({
            name,
            type,
            date,
            place,
            desc,
            uid,
        })
        if (!lossitem)
            return res.send({ status: 200, message: '添加寻物信息失败', sucess: false })
        return res.send({
            status: 200,
            message: '添加成功',
            sucess: true
        })
    }
    catch (e) {
        return res.send({ status: 200, msg: '添加寻物信息失败', sucess: false })
    }
}

// 修改寻物信息
const updateLossItem = async (req, res) => {
    try {
        const { name, type, date, place, desc, lid, uid } = req.body
        await Lossitem.update({
            name,
            type,
            date,
            place,
            desc,
            uid,
        },
            {
                where: {
                    lid,
                },
            }
        )

        return res.send({
            status: 200,
            message: '修改成功',
            sucess: true
        })
    }
    catch (e) {
        return res.send({ status: 200, message: '修改寻物信息失败', sucess: false })
    }

}

// 删除寻物信息
const deleteLossItem = async (req, res) => {
    try {
        const { id } = req.body
        await Lossitem.destroy({
            where: {
                lid: id,
            },
        })

        return res.send({
            status: 200,
            message: '删除成功',
            sucess: true
        })
    }
    catch (e) {
        return res.send({ status: 200, message: '删除失物信息失败', sucess: false })
    }
}

// 查询寻物类型信息
const queryLossItemType = async (req, res) => {
    try {
        const lossitemType = await Lossitem.findAll({
            attributes: ['type'],
        })
        if (!lossitemType)
            return res.send({ status: 200, message: '无失物类型', sucess: false })

        const uniqueTypes = new Set(lossitemType.map(item => item.type));

        // 将Set转换为数组，以便在响应中发送
        const data = Array.from(uniqueTypes);

        return res.send({
            status: 200,
            msg: '查询成功',
            data: data,
            sucess: true
        })
    }
    catch (e) {
        return res.send({ status: 200, message: '查询失败', sucess: false })
    }
}

// 修改寻物信息状态
const editLossItemStatus = async (req, res) => {
    try {
        const { lid, isfound } = req.body
        await Lossitem.update({
            isfound,
        },
            {
                where: {
                    lid,
                },
            })
        return res.send({ status: 200, message: '修改成功', sucess: true })
    }
    catch (e) {
        return res.send({ status: 200, message: '修改失物信息状态失败', sucess: false })
    }
}

export {
    queryLossItemList,
    queryLossItemInfo,
    addLossItem,
    updateLossItem,
    deleteLossItem,
    queryLossItemType,
    queryOneLossItem,
    editLossItemStatus,
}
