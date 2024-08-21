'use client'

import React from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    message,
    Select,
} from 'antd';
import { addLossItemInform } from '@/api/index';
import { LossitemLayoutType, LossitemType } from '@/types';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import Content from '../Content';
import dayjs from 'dayjs';


const Option = Select.Option;


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

const LossitemLayout: React.FC<LossitemLayoutType> = ({ title }) => {

    const router = useRouter();
    const [form] = Form.useForm()

    const user: any = {
        uid: "1234567890",
        name: "张三",
        phone: "13800000000",
    }
    const handleFinishform = async (values: LossitemType) => {
        console.log(values);
        if (values.time) {
            values.time = dayjs(values.time).format('YYYY-MM-DD HH:mm:ss')
        }
        await addLossItemInform(values)
        message.success("添加成功");
        router.push('/lossitem/show')
    }



    return (
        <>
            <Content title={title}>
                <Form
                    form={form}
                    {...formItemLayout}
                    // variant="filled"
                    layout='horizontal'
                    className={styles.form}
                    onFinish={handleFinishform}
                >
                    <Form.Item
                        label="失物名称"
                        name="name"
                        rules={[{ required: true, message: '请输入失物名称' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="失物类型"
                        name="type"

                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="丢失时间"
                        name="time"
                        rules={[{ required: true, message: '请输入丢失时间!' }]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="丢失地点"
                        name="address"
                        rules={[{ required: true, message: '请输入丢失地点' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="具体描述"
                        name="desc"

                    >
                        <Input.TextArea className={styles.textarea} />
                    </Form.Item>

                    <Form.Item
                        label="失主"
                        name="uid"
                        rules={[{ required: true, message: '请输入失主账号' }]}
                    >
                        <Select allowClear>
                            <Option key={user.uid} value={user.uid}>
                                {user.uid}
                            </Option>
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles.btn}
                        >
                            创建
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </>

    );
}

export default LossitemLayout;