'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Flex, Form, Input, message, Modal, Row, Space, Table, TablePaginationConfig, Tag, Tooltip } from 'antd';
import styles from './page.module.css'
import axios from 'axios';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import { FounditemQuery, LossitemQuery } from '@/types';
import Content from '@/components/Content';
import { useCurrentUser } from '@/utils/hoos';
import { deleteFoundItem, getFoundItemInfo, } from '@/api';
import { useRouter } from 'next/navigation';

export default function Lossitem() {

    const [form] = Form.useForm();
    const user = useCurrentUser();
    const router = useRouter()
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        showSizeChanger: true,
    })

    const columns = [
        {
            title: '物品名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: '物品类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
        },
        {
            title: '描述',
            dataIndex: 'desc',
            key: 'desc',
            align: 'center',
            ellipsis: true,
            render: (text: string) => {
                return <Tooltip title={text} placement='topLeft'>
                    {text}
                </Tooltip>
            }
        },
        {
            title: '拾取时间',
            dataIndex: 'date',
            key: 'date',
            align: 'center',
        },
        {
            title: '拾取位置',
            dataIndex: 'place',
            key: 'place',
            align: 'center',
        },
        {
            title: '是否被领取',
            dataIndex: 'isreturn',
            key: 'isreturn',
            align: 'center',
            render: (text: number) => text === 1 ? (
                <Tag color="green">已被领取</Tag>
            ) : (
                <Tag color="red">未被领取</Tag>
            ),
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_: any, record: any) => (
                <Flex>
                    <Space size="middle">

                        {record.isreturn === 1 ? null : (<Button type="primary" ghost onClick={() => { router.push(`/backend/founditem/edit/${record.fid}`) }}>编辑</Button>)}
                        <Button type="primary" danger ghost onClick={() => { handleDelete(record.fid as number) }}>删除</Button>

                    </Space>
                </Flex>
            ),

        }
    ];


    const handleDelete = (id: number) => {
        const params = { id };
        Modal.confirm({
            title: "确认删除？",
            okText: "确定",
            cancelText: "取消",
            async onOk() {
                try {
                    const res = await deleteFoundItem(params);
                    if (res.sucess === true) {
                        message.success("删除成功");
                        fetchData(form.getFieldsValue());
                    }

                } catch (error) {
                    message.error("删除失败");
                    console.error(error);
                }
            },
        });
    };

    const handleSearchFinish = async (values: LossitemQuery) => {
        console.log('Received values from form: ', values);
        fetchData(values)

    };

    const handleSearchReset = () => {
        // console.log(form)
        form.resetFields();
    }

    const fetchData = useCallback(
        (search?: FounditemQuery) => {
            const { item_name, item_type } = search || {};
            getFoundItemInfo({
                current: pagination.current as number,
                pageSize: pagination.pageSize as number,
                item_name,
                item_type,
                role: user?.role,
                userId: user?.uid,
            }).then((res) => {
                setData(res.data);
                console.log(res)
                setTotal(res.total);
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [pagination, user?.role]
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


    return (
        <>
            <Content
                title="个人拾物信息"
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
                            <Form.Item name="item_name" label="物品名称" >
                                <Input placeholder='请输入物品名称' />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="item_type" label="物品类型" >
                                <Input placeholder='请输入物品类型' />
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
