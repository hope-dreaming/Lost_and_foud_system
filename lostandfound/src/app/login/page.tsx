'use client'

import styles from './page.module.css'
import { usePathname, useRouter } from "next/navigation";
import { Button, Form, Input, message } from "antd";
import classnames from "classnames";
import request from "@/utils/request";
import { UserLoginType } from '@/types';

export default function Login() {
    const router = useRouter()
    const pathname = usePathname()

    const onFinish = async (values: UserLoginType) => {
        try {
            const res = await request.post("/api/login", values);
            if (res.sucess === true) {
                message.success("登陆成功");
                localStorage.setItem("user", JSON.stringify(
                    {
                        info: res.data,
                        token: res.token
                    }));
                router.push("/backend/lossitem");
            } else {
                message.error("登陆失败");
            }




        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>

            <div className={styles.main}>
                <header className={styles.header}>
                    失物招领系统
                </header>
                <div className={styles.form}>
                    <Form
                        name="basic"
                        initialValues={{ tele: "", password: "" }}
                        onFinish={onFinish}
                        layout="vertical"
                        autoComplete="off"
                        size="large"
                    >
                        <Form.Item
                            name="tele"
                            label={<span className={styles.label}>账号</span>}
                            rules={[{ required: true, message: "请输入账号" }]}
                        >
                            <Input placeholder="请输入账号" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label={<span className={styles.label}>密码</span>}
                            rules={[{ required: true, message: "请输入密码" }]}
                        >
                            <Input.Password placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item >
                            <Button
                            >
                                忘记密码？
                            </Button>
                            <Button
                                className={styles.register}
                                onClick={() => {
                                    router.push("/register");
                                }}
                            >
                                注册
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                className={classnames(styles.btn, styles.loginBtn)}
                                size="large"
                            >
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}
