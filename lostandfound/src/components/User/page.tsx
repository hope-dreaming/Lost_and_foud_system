'use client'

import React from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,

} from 'antd';

import styles from './page.module.css'


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

const UserLayout = () => {

    return (
        <>

            <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }}>
                <Form.Item
                    label="用户联系电话"
                    name="tele"
                    rules={[{ required: true, message: '请输入电话号码' }]}
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
                    <Input />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>


        </>

    );
}

export default UserLayout;