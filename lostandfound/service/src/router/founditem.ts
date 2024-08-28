import { message } from "antd"
import { Op } from "sequelize"
import { sequelize } from "src/database/init"
import { Founditem } from "src/database/models/founditem"
import { Returnitem } from "src/database/models/returnitem"
import { User } from "src/database/models/user"

// 查询未处理的/被驳回的所有失物信息
const queryFoundItemList = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { item_name, item_type } = req.body
        const whereFounditem = {
            ...((item_name !== null && item_name !== undefined && item_name !== '') ? { name: item_name } : {}),
            ...((item_type !== null && item_type !== undefined && item_type !== '') ? { type: item_type } : {}),
            isreturn: 0,
        }
        const founditemList = await Founditem.findAll({
            where: whereFounditem,
        })
        if (!founditemList)
            return res.send({ status: 200, msg: '无失物信息' })

        const result = []

        for (const list of founditemList) {
            const { uid } = list
            const userInfo = await User.findOne({
                where: { uid },
                attributes: ['tele'],
            })

            result.push({
                ...list.toJSON(),
                tele: userInfo.tele,
            })
        }
        return res.send({
            status: 200,
            msg: '查询成功',
            data: result
        })


    }
    catch (e) {
        return res.send({ status: 200, msg: '查询错误' })
    }

}

// 查询个人的失物信息
const queryFoundItemInfo = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { item_name, item_type, userId } = req.body
        const whereFounditem = {
            ...((item_name !== null && item_name !== undefined && item_name !== '') ? { name: item_name } : {}),
            ...((item_type !== null && item_type !== undefined && item_type !== '') ? { type: item_type } : {}),
            uid: userId,
        }
        const founditemList = await Founditem.findAll({
            where: whereFounditem,
        })
        if (!founditemList)
            return res.send({ status: 200, msg: '无失物信息' })


        return res.send({
            status: 200,
            msg: '查询成功',
            data: founditemList
        })


    }
    catch (e) {
        return res.send({ status: 200, msg: '查询错误' })
    }
}

// 查询单个失物信息以更新
const queryOneFoundItem = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { id } = req.body
        if (!id)
            return res.send({ status: 200, message: '无该物品信息', data: null })
        const FounditemInfo = await Founditem.findOne({
            where: {
                fid: id
            },
        })
        if (!Founditem)
            return res.send({ status: 200, message: '无失物信息', data: null })
        const { uid } = FounditemInfo
        const user = await User.findOne({
            where: { uid },
            attributes: ['tele'],
        })
        return res.send({
            status: 200,
            message: '查询成功',
            data: {
                ...FounditemInfo.toJSON(),
                tele: user.tele,
            },
        })
    }
    catch (e) {
        return res.send({ status: 200, message: e.message, data: null })
    }

}

// 增加失物信息
const addFoundItem = async (req, res) => {
    try {
        const { name, type, date, place, desc, uid } = req.body
        const founditem = await Founditem.create({
            name,
            type,
            date,
            place,
            desc,
            uid,
            isreturn: 0,
        })
        if (!founditem)
            return res.send({ status: 200, message: '添加失物信息失败', sucess: false })
        return res.send({
            status: 200,
            message: '添加成功',
            sucess: true
        })
    }
    catch (e) {
        return res.send({ status: 200, message: '添加失物信息失败', sucess: false })
    }

}

// 更新失物信息
const updateFoundItem = async (req, res) => {
    try {
        const { name, type, date, place, desc, fid, uid } = req.body
        const founditem = await Founditem.update({
            name,
            type,
            date,
            place,
            desc,
            uid,
        },
            {
                where: {
                    fid,
                },
            }
        )
        if (!founditem)
            return res.send({ status: 200, message: '更新失物信息失败', sucess: false })
        return res.send({
            status: 200,
            message: '更新成功',
            sucess: true,
        })
    }
    catch (e) {
        return res.send({ status: 200, message: '更新信息失败', sucess: false })

    }
}

// 删除失物信息
const deleteFoundItem = async (req, res) => {
    try {
        const { id } = req.body
        if (!id)
            return res.send({ status: 200, message: '参数错误', sucess: false })

        await sequelize.transaction(async (t) => {

            const returnitem = await Returnitem.findAll({
                where: {
                    fid: id,
                },
            }, { transaction: t })

            if (returnitem.length > 0 && !returnitem) {

                await Returnitem.destroy({
                    where: {
                        fid: id,
                    },
                }, { transaction: t })

            }

            await Founditem.destroy({
                where: {
                    fid: id,
                },
            })
        })

        return res.send({ status: 200, message: '删除成功', sucess: true })

    }
    catch (e) {
        return res.send({ status: 200, message: '删除失物信息失败', sucess: false })
    }
}

// 获取所有失物的类型
const queryFountitemType = async (req, res) => {
    try {
        const founditemType = await Founditem.findAll({
            attributes: ['type'],
        })
        if (!founditemType)
            return res.send({ status: 200, msg: '无失物类型' })

        const uniqueTypes = new Set(founditemType.map(item => item.type));

        // 将Set转换为数组，以便在响应中发送
        const data = Array.from(uniqueTypes);

        return res.send({
            status: 200,
            msg: '查询成功',
            data: data
        })
    }
    catch (e) {
        return res.send({ status: 200, msg: '查询失败' })
    }
}

// 修改失物信息状态
const editFoundItemStatus = async (req, res) => {
    try {
        const { fid, status } = req.body
        await Founditem.update({
            status
        },
            {
                where: {
                    fid,
                },
            })

        return res.send({
            status: 200,
            message: '修改成功',
            sucess: true
        })
    }
    catch (e) {
        return res.send({ status: 200, message: '修改失物状态失败', sucess: false })
    }
}


export {
    queryFoundItemList,
    queryFoundItemInfo,
    addFoundItem,
    updateFoundItem,
    deleteFoundItem,
    queryFountitemType,
    queryOneFoundItem,
    editFoundItemStatus,
}
