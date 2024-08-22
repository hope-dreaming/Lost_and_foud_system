import { Founditem } from "src/database/models/founditem"
import { User } from "src/database/models/user"

// 查询所有失物信息
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
            return res.send({ status: 401, msg: '无失物信息' })

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
        return res.send({ status: 401, msg: '查询错误' })
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
            return res.send({ status: 401, msg: '无失物信息' })


        return res.send({
            status: 200,
            msg: '查询成功',
            data: founditemList
        })


    }
    catch (e) {
        return res.send({ status: 401, msg: '查询错误' })
    }
}


// 增加失物信息
const addFoundItem = async (req, res) => {

}

// 更新失物信息
const updateFoundItem = async (req, res) => {

}

// 删除失物信息
const deleteFoundItem = async (req, res) => {

}

// 获取所有失物的类型
const queryFountitemType = async (req, res) => {

}

export {
    queryFoundItemList,
    queryFoundItemInfo,
    addFoundItem,
    updateFoundItem,
    deleteFoundItem,
    queryFountitemType,
}
