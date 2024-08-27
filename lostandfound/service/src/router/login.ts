import { User } from "src/database/models/user";
const jwt = require("jsonwebtoken");
import { JWT_SECRET } from "src/constants";

const login = async (req, res) => {

    const { tele, password } = req.body
    if (!tele || !password) {
        return res.send({
            status: 401,
            message: "账号或密码不能为空",
            sucess: false
        })
    }
    const findUser = await User.findOne({
        where: {
            tele
        }
    })
    if (!findUser) {
        return res.send({
            status: 401,
            message: "账号不存在",
            sucess: false
        })
    }
    if (tele !== findUser.tele || password !== findUser.password) {
        return res.send({
            status: 401,
            message: "账号或密码错误",
            sucess: false
        })
    }
    if (findUser.status === 0)
        return res.send({
            status: 401,
            message: "账号已被禁用",
            sucess: false
        })


    // 登录成功
    if (findUser.status === 1) {
        const token = jwt.sign(
            { id: findUser.uid },
            JWT_SECRET,
            { expiresIn: "24h" }
        )
        return res.send({
            status: 200,
            message: "登录成功",
            sucess: true,
            data: {
                uid: findUser.uid,
                tele: findUser.tele,
                name: findUser.name,
                uno: findUser.uno,
                sexy: findUser.sexy,
                role: findUser.role,

            },
            token
        })
    }



}

export {
    login,
}