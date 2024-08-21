import { User } from "src/database/models/user";

const login = async (req, res) => {

    const { tele, password } = req.body

    const findUser = await User.findOne({
        where: {
            tele
        }
    })
    if (!findUser) {
        return res.send({
            status: 401,
            message: "账号不存在"
        })
    }
    if (tele !== findUser.tele || password !== findUser.password) {
        return res.send({
            status: 401,
            message: "账号或密码错误"
        })
    }

    // 登录成功
    res.send({
        status: 200,
        message: "登录成功",
        data: {
            userId: findUser.uid,
        }
    })

}

export {
    login,
}