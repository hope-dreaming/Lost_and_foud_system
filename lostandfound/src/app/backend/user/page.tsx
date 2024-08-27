'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Flex, Form, Input, message, Modal, Row, Select, Space, Table, TablePaginationConfig, Tag, Tooltip } from 'antd';
import styles from './page.module.css'
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import { UserInfoType, UserQueryType, UserType } from '@/types';
import Content from '@/components/Content';
import { USER_STATUS } from '@/constants';
import { deleteUserInfo, getUserList, updateUserSatus } from '@/api';
import { useRouter } from 'next/navigation';
const Option = Select.Option;

const STATUS = {
    ON: 1,
    OFF: 0,
}
export const STATUS_OPTIONS = [
    { label: "正常", value: STATUS.ON },
    { label: "禁用", value: STATUS.OFF }
];

export default function User() {

    const [form] = Form.useForm();
    const [list, setList] = useState<UserType[]>([]);
    const router = useRouter();
    console.log(router);

    const columns = [
        {
            title: '账号',
            dataIndex: 'tele',
            key: 'tele',
            align: 'center',
        },
        {
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            ellipsis: true,
            render: (text: number) =>
                text === 1 ? (
                    <Tag color="green">正常</Tag>
                ) : (
                    <Tag color="red">已禁用</Tag>
                ),
        },
        {
            title: '性别',
            dataIndex: 'sexy',
            key: 'sexy',
            align: 'center',

        },
        {
            title: '学号',
            dataIndex: 'uno',
            key: 'uno',
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_: any, record: UserInfoType) => (
                <Flex>
                    <Space size="middle">

                        <Button type="primary" ghost onClick={() => {

                            router.push(`/backend/user/edit/${record.uid}`);

                        }}
                        >
                            编辑
                        </Button>
                        <Button
                            type="link"
                            danger={record.status === USER_STATUS.ON}
                            onClick={() => {
                                handleStatusUpdate(record);
                            }}
                        >
                            {record.status === USER_STATUS.ON ? "禁用" : "启动"}

                        </Button>
                        <Button type="primary" danger ghost onClick={() => {
                            handleDelete(record.uid as number);
                        }}
                        >
                            删除
                        </Button>

                    </Space>
                </Flex>
            ),

        }
    ];
    const [total, setTotal] = useState(0);

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        showSizeChanger: true,
    })



    const handleSearchReset = () => {
        // console.log(form)
        form.resetFields();
    }
    const handleSearchFinish = async (values: UserQueryType) => {
        console.log('Received values from form: ', values);
        fetchData(values)

    };
    const fetchData = useCallback(
        (search?: UserQueryType) => {
            const { item_name, item_status, item_tele } = search || {};
            getUserList({
                current: pagination.current as number,
                pageSize: pagination.pageSize as number,
                item_name,
                item_status,
                item_tele,
            }).then((res) => {
                setList(res.data);
                // console.log(res)
                setTotal(res.total);
            });
        },
        [pagination]
    );

    useEffect(() => {
        fetchData();
    }, [fetchData, pagination]);

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setPagination({
            current: pagination.current ?? 1,
            pageSize: pagination.pageSize ?? 15,
            showSizeChanger: pagination.showSizeChanger ?? false, // 假设有showSizeChanger属性且默认false
        })
    }


    const handleStatusUpdate = async (record: UserInfoType) => {
        const params = {
            uid: record.uid,
            status: record.status === USER_STATUS.ON ? USER_STATUS.OFF : USER_STATUS.ON,
        }
        await updateUserSatus(params);
        fetchData(form.getFieldsValue());
    };

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: "确认删除？",
            okText: "确定",
            cancelText: "取消",
            async onOk() {
                try {
                    await deleteUserInfo(id);
                    message.success("删除成功");
                    fetchData(form.getFieldsValue());
                } catch (error) {
                    console.error(error);
                }
            },
        });
    };




    return (
        <>
            <Content
                title="用户管理"
            >
                <Form
                    form={form}
                    name="lossitem_search"
                    // layout="inline"
                    onFinish={handleSearchFinish}
                    initialValues={{
                        item_name: '',
                        item_status: '',
                        item_tele: ''
                    }}

                >
                    <Row gutter={19}>
                        <Col span={5}>
                            <Form.Item name="item_tele" label="账号" >
                                <Input placeholder='请输入电话号码' />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="item_status" label="状态">
                                <Select placeholder="请选择" allowClear>
                                    <Option key={USER_STATUS.ON} value={USER_STATUS.ON}>
                                        正常
                                    </Option>
                                    <Option key={USER_STATUS.OFF} value={USER_STATUS.OFF}>
                                        禁用
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="item_name" label="用户名" >
                                <Input placeholder='请输入用户名' />
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item>
                                <Space>
                                    <Button type="primary" htmlType="submit">
                                        搜索
                                    </Button>

                                    <Button onClick={handleSearchReset}>
                                        清空
                                    </Button>
                                </ Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div className={styles.table_item}>
                    <Table
                        dataSource={list}
                        columns={columns as (ColumnGroupType<any> | ColumnType<any>)[]}
                        rowKey="tele"
                        onChange={handleTableChange}
                        // scroll={{ x: 1000 }}
                        sticky={{ offsetHeader: 0, offsetScroll: -1 }}
                        pagination={{
                            ...pagination,
                            total: total,
                            showTotal: (total) => `共${total}条数据`
                        }}
                    />;
                </div>
            </Content>
        </>
    );
}
