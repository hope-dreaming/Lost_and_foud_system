'use client'

import styles from './page.module.css'
import { usePathname, useRouter } from "next/navigation";
import { Button, Form, Input, message, Select } from "antd";
import classnames from "classnames";
import request from "@/utils/request";
import { UserLoginType, UserRegisterType } from '@/types';
import Content from '@/components/Content';
import { USER_SEXY } from '@/constants';

export default function Login() {
    const router = useRouter()

    const onFinish = async (values: UserRegisterType) => {
        try {
            const res = await request.post("/api/register", values);
            if (res.sucess === true) {
                message.success("注册成功");
                router.push("/login");
            } else {
                message.error("注册失败");
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>

            {/* <div className={styles.main}>
                <header className={styles.header}>
                    失物招领系统-用户注册
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
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div> */}
            <div className={styles.main}>
                <Content title="用户注册">
                    <Form
                        variant="filled"
                        className={styles.form}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={<span className={styles.label}>账号</span>}
                            name="tele"
                            rules={[{ required: true, message: '请输入账号（电话号码）' }]}

                        >
                            <Input placeholder="请输入手机号" />
                        </Form.Item>


                        <Form.Item
                            label={<span className={styles.label}>用户名</span>}
                            name="name"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input placeholder="请输入用户名" />
                        </Form.Item>



                        <Form.Item
                            label={<span className={styles.label}>性别</span>}
                            name="sexy"
                            rules={[{ required: true, message: '请选择用户性别' }]}
                        >
                            <Select>
                                <Select.Option value={USER_SEXY.MAN}>男</Select.Option>
                                <Select.Option value={USER_SEXY.WOMAN}>女</Select.Option>
                            </Select>
                        </Form.Item>



                        <Form.Item
                            label={<span className={styles.label}>密码</span>}
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password />
                        </Form.Item>


                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={classnames(styles.btn, styles.loginBtn)}
                                size="large"
                            >
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </div>
        </>
    );
}
