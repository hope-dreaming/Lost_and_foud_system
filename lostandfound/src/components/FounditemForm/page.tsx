'use client'

import React from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,

} from 'antd';




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

const FounditemLayout = () => {

  return (
    <>

      <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }}>
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
          name="time"
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
          name="user"
          rules={[{ required: true, message: 'Please input!' }]}
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

export default FounditemLayout;