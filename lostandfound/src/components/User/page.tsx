'use client'

import React, { useEffect } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    message,
    Radio,
    Select,

} from 'antd';

import styles from './page.module.css'
import { userAdd, userUpdate } from '@/api';
import { UserType, UserFormProps } from '@/types';
import { useRouter } from 'next/navigation';
import { title } from 'process';
import { USER_ROLE, USER_SEXY, USER_STATUS } from '@/constants';
import Content from '../Content';


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const UserLayout: React.FC<UserFormProps> = ({
    title,
    editData = {
        sex: USER_SEXY.MAN,
        status: USER_STATUS.ON,
        role: USER_ROLE.USER,
        tele: null,
    },
}) => {

    const [form] = Form.useForm()
    const router = useRouter()
    // const user = userCurrentUser()
    useEffect(() => {
        form.setFieldsValue(editData)
    }, [editData, form])
    const handleFinish = async (values: UserType) => {
        try {
            if (editData?.tele) {
                await userUpdate(editData.tele, values);
                message.success("编辑成功");
            } else {
                await userAdd(values);
                message.success("创建成功");
            }
            setTimeout(() => {
                router.push("/user");
            });
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <Content title={title}>
                <Form
                    {...formItemLayout}
                    variant="filled"
                    style={{ maxWidth: 600 }}
                    onFinish={handleFinish}

                >
                    <Form.Item
                        label="电话号码"
                        name="tele"
                        rules={[{ required: true, message: '请输入账号（电话号码）' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="学号"
                        name="id"

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="用户名"
                        name="name"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input />
                    </Form.Item>



                    <Form.Item
                        label="用户性别"
                        name="gender"
                        rules={[{ required: true, message: '请选择用户性别' }]}
                    >
                        <Select>
                            <Select.Option value="male">男</Select.Option>
                            <Select.Option value="female">女</Select.Option>
                        </Select>
                    </Form.Item>



                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="角色"
                        name="role"
                        rules={[{ required: true, message: '请选择角色' }]}
                    >
                        <Radio.Group>
                            <Radio value="user">用户</Radio>
                            <Radio value="admin">管理员</Radio>
                        </Radio.Group>

                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            创建
                        </Button>
                    </Form.Item>
                </Form>
            </Content>

        </>

    );
}

export default UserLayout;