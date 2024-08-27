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
import { addLossItemInform, updateLossItem } from '@/api/index';
import { LossitemLayoutType, LossitemType } from '@/types';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import Content from '../Content';
import dayjs from 'dayjs';
import { useCurrentUser } from '@/utils/hoos';
import { USER_ROLE } from '@/constants';


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

const LossitemLayout: React.FC<LossitemLayoutType> = ({
    title,
    editData = {
        lid: null

    },
}) => {

    const isEdit = editData?.lid ? true : false
    const btn_action = isEdit ? "更新" : "创建";
    const router = useRouter();
    const [form] = Form.useForm()
    const user = useCurrentUser()

    const handleFinish = async (values: LossitemType) => {
        try {
            if (editData?.lid) {
                if (values.date) {
                    values.date = dayjs(values.date).format('YYYY-MM-DD HH:mm:ss')
                }
                await updateLossItem(values);
                message.success("更新成功");
            } else {
                await addLossItemInform(values);
                message.success("创建成功");
            }
            if (user?.info.role === USER_ROLE.ADMIN) {
                setTimeout(() => {
                    router.push("/backend/lossitem");
                });
            } else if (user?.info.role === USER_ROLE.USER) {
                setTimeout(() => {
                    router.push("/backend/lossitem/show");
                });
            }

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <Content title={title}>
                <Form
                    form={form}
                    {...formItemLayout}
                    // variant="filled"
                    layout='horizontal'
                    className={styles.form}
                    onFinish={handleFinish}
                    initialValues={editData}
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
                        name="date"
                        rules={[{ required: true, message: '请输入丢失时间!' }]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="丢失地点"
                        name="place"
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
                        <Select >
                            <Option key={user?.info?.uid} value={user?.info?.uid}>
                                {user?.info?.tele}
                            </Option>
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles.btn}
                        >
                            {btn_action}
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </>

    );
}

export default LossitemLayout;