'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Flex, Form, Input, message, Modal, Row, Select, Space, Table, TablePaginationConfig, Tag, Tooltip } from 'antd';
import styles from './page.module.css'
import axios from 'axios';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import { getLossItemList } from '@/api/lossitem';
import { LossitemQuery, UserQueryType, UserType } from '@/types';
import Content from '@/components/Content';
import { getFoundItemList } from '@/api/founditem';
import { title } from 'process';
import { USER_STATUS } from '@/constants';
import { getUserList, userDelete, userUpdate } from '@/api';
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
    // const user = useCurrentUser();


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
            dataIndex: 'uid',
            key: 'uid',
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_: any, row: UserType) => (
                <Flex>
                    <Space size="middle">

                        <Button type="primary" ghost onClick={() => {
                            // setEditData(row);
                            // router.push(`/user/edit/${row._id}`);
                            handleUserEdit(row.tele)
                        }}
                        >
                            编辑
                        </Button>
                        <Button
                            type="link"
                            danger={row.status === USER_STATUS.ON}
                            onClick={() => {
                                handleStatusUpdate(row);
                            }}
                        >
                            {row.status === USER_STATUS.ON ? "禁用" : "启动"}
                        </Button>
                        <Button type="primary" danger ghost onClick={() => {
                            handleDeleteModal(row.tele);
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
    const [data, setData] = useState([])

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        showSizeChanger: true,
    })

    const handleSearchFinish = async (values: LossitemQuery) => {
        // console.log('Received values from form: ', values);
        const res = getLossItemList(values)


    };

    const handleSearchReset = () => {
        // console.log(form)
        form.resetFields();
    }

    const fetchData = useCallback(
        (search?: UserQueryType) => {
            const { name, status } = search || {};
            getUserList({
                current: pagination.current as number,
                pageSize: pagination.pageSize as number,
                ...(name && { name }),
                ...(status && { status }),
            }).then((res) => {
                setList(res.data);
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

    const handleDeleteModal = (tele: string) => {
        Modal.confirm({
            title: "确认删除？",
            //   icon: <ExclamationCircleFilled />,
            okText: "确定",
            cancelText: "取消",
            async onOk() {
                await userDelete(tele);
                message.success("删除成功");
                fetchData(form.getFieldsValue());
            },
        });
    };
    const handleStatusUpdate = async (row: UserType) => {
        await userUpdate(row.tele, {
            ...row,
            status: row.status === USER_STATUS.ON ? USER_STATUS.OFF : USER_STATUS.ON,
        });
        fetchData(form.getFieldsValue());
    };

    const handleUserEdit = async (tele: string) => {

    }



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
                        item_type: ''
                    }}

                >
                    <Row gutter={19}>
                        <Col span={5}>
                            <Form.Item name="item_name" label="账号" >
                                <Input placeholder='请输入电话号码' />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="status" label="状态">
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
                            <Form.Item name="item_type" label="用户名" >
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
                        dataSource={data}
                        columns={columns as (ColumnGroupType<any> | ColumnType<any>)[]}
                        onChange={handleTableChange}
                        scroll={{ x: 1000 }}
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
