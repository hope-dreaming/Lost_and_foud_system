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
import { UserType, UserFormProps, UserInfoType } from '@/types';
import { useRouter } from 'next/navigation';
import { title } from 'process';
import { USER_ROLE, USER_SEXY, USER_STATUS } from '@/constants';
import Content from '../Content';
import { addUserInfo, updateUserInfo } from '@/api';
import { useCurrentUser } from '@/utils/hoos';

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

const UserLayout: React.FC<UserFormProps> = ({
    title,
    editData,
}) => {

    const isEdit = editData?.uid ? true : false
    const btn_action = isEdit ? "修改" : "创建";
    const [form] = Form.useForm()
    const router = useRouter()
    const user = useCurrentUser()

    console.log(editData)
    useEffect(() => {
        form.setFieldsValue(editData)
    }, [editData, form])

    const handleFinish = async (values: UserInfoType) => {
        try {
            if (editData?.uid) {
                await updateUserInfo({
                    ...values,
                    uid: editData.uid,
                });
                message.success("更新成功");
            } else {
                await addUserInfo(values);
                message.success("创建成功");
            }
            setTimeout(() => {
                router.push("/backend/user");
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
                    form={form}
                    variant="filled"
                    className={styles.form}
                    onFinish={handleFinish}
                    initialValues={editData}

                >
                    <Form.Item
                        label="电话号码"
                        name="tele"
                        rules={[{ required: true, message: '请输入账号（电话号码）' }]}

                    >
                        {isEdit ? (<Select >
                            <Option key={user?.tele} value={user?.tele}>
                                {user?.tele}
                            </Option>
                        </Select>) : (<Input />)}
                    </Form.Item>

                    <Form.Item
                        label="学号"
                        name="uno"
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
                        name="sexy"
                        rules={[{ required: true, message: '请选择用户性别' }]}
                    >
                        <Select>
                            <Select.Option value={USER_SEXY.MAN}>男</Select.Option>
                            <Select.Option value={USER_SEXY.WOMAN}>女</Select.Option>
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
                            <Radio value={USER_ROLE.USER}>用户</Radio>
                            <Radio value={USER_ROLE.ADMIN}>管理员</Radio>
                        </Radio.Group>

                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            {btn_action}
                        </Button>
                    </Form.Item>
                </Form>
            </Content>

        </>

    );
}

export default UserLayout;