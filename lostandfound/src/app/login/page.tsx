'use client'

import styles from './page.module.css'
import { usePathname, useRouter } from "next/navigation";
import { Button, Form, Input, message } from "antd";
import classnames from "classnames";
import Head from "next/head";
import Image from "next/image";
// import { UserLoginType } from "@/types";
import request from "@/utils/request";

export default function Login() {
    const router = useRouter()
    const pathname = usePathname()

    // const onFinish = async (values: UserLoginType) => {
    const onFinish = async (values: any) => {
        try {
            // const res = await request.post("/api/login", values);
            // console.log(
            //     "%c [ res ]-17",
            //     "font-size:13px; background:pink; color:#bf2c9f;",
            //     res
            // );
            // localStorage.setItem("user", JSON.stringify(res.data));
            message.success("登陆成功");

            router.push("/backend/lossitem");
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
                        initialValues={{ name: "", password: "" }}
                        onFinish={onFinish}
                        layout="vertical"
                        autoComplete="off"
                        size="large"
                    >
                        <Form.Item
                            name="name"
                            label={<span className={styles.label}>账号</span>}
                            rules={[{ required: true, message: "请输入用户名" }]}
                        >
                            <Input placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label={<span className={styles.label}>密码</span>}
                            rules={[{ required: true, message: "请输入密码" }]}
                        >
                            <Input.Password placeholder="请输入密码" />
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
