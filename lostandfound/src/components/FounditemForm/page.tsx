'use client'

import React, { useEffect } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Select,

} from 'antd';
import { FounditemLayoutType, FounditemType, UserInfoType } from '@/types';
import { useRouter } from 'next/navigation';
import { addFoundItem, updateFoundItem } from '@/api';
import styles from './page.module.css'
import Content from '../Content';
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

const FounditemLayout: React.FC<FounditemLayoutType> = ({
  title,
  editData = {
    fid: null
  },
}) => {

  const [form] = Form.useForm();
  const router = useRouter();
  const user = useCurrentUser()
  const isEdit = editData?.fid ? true : false
  const btn_action = isEdit ? "更新" : "创建";

  useEffect(() => {
    form.setFieldsValue(editData);
  }, [editData, form]);

  const handleFinish = async (values: FounditemType) => {
    try {
      if (editData?.fid) {
        await updateFoundItem(values);
        message.success("更新成功");
      } else {
        await addFoundItem(values);
        message.success("创建成功");
        if (user?.info.role === USER_ROLE.ADMIN) {
          setTimeout(() => {
            router.push("/backend/founditem");
          });
        } else if (user?.info.role === USER_ROLE.USER) {
          setTimeout(() => {
            router.push("/backend/founditem/show");
          });
        }

      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Content title={title}>
        <Form {...formItemLayout}
          variant="filled"
          className={styles.form}
          form={form}
          initialValues={editData}
          onFinish={handleFinish}
        // autoComplete="off"
        >
          <Form.Item
            label="物品名称"
            name="name"
            rules={[{ required: true, message: '请输入失物名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="类型"
            name="type"

          >
            <Input />
          </Form.Item>


          <Form.Item
            label="拾取时间"
            name="date"
            rules={[{ required: true, message: '请输入丢失时间!' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="拾取地点"
            name="place"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="具体描述"
            name="desc"

          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="拾取人"
            name="uid"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Select >
              <Option key={user?.info?.uid} value={user?.info?.uid}>
                {user?.info?.tele}
              </Option>
            </Select>
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

export default FounditemLayout;