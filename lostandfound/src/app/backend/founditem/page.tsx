'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Flex, Form, Input, message, Row, Space, Table, TablePaginationConfig, Tooltip } from 'antd';
import styles from './page.module.css'
import axios from 'axios';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import Content from '@/components/Content';
import { getFoundItemList } from '@/api/founditem';
import { useRouter } from 'next/navigation';
import { FounditemQuery } from '@/types/founditem'
import { useCurrentUser } from '@/utils/hoos';


export default function Lossitem() {

    const [form] = Form.useForm()
    const router = useRouter()
    const user = useCurrentUser()
    const handleFoundEdit = () => {
        router.push("/founditem/edit/id")
    }
    const handleFoundDelete = async (id: string) => {
        // await deleteFounditem(id)
        message.success('删除成功')
    }

    const [total, setTotal] = useState(0);
    const [data, setData] = useState([])

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        showSizeChanger: true,
    })


    const handleSearchFinish = async (values: FounditemQuery) => {
        // console.log('Received values from form: ', values);
        fetchData(values)

    };

    const handleSearchReset = () => {
        // console.log(form)
        form.resetFields();
    }

    const fetchData = useCallback(
        (search?: FounditemQuery) => {
            const { item_name, item_type } = search || {};
            getFoundItemList({
                current: pagination.current as number,
                pageSize: pagination.pageSize as number,
                item_name,
                item_type,
                userId: user?.uid
            }).then((res) => {
                setData(res.data);
                // console.log(res)
                setTotal(res.total);
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            title: '拾取人',
            dataIndex: 'tele',
            key: 'tele',
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_: any, record: any) => (
                <Flex>
                    <Space size="middle">

                        <Button type="primary" ghost onClick={() => { handleFoundEdit }}>编辑</Button>
                        <Button type="primary" danger ghost onClick={() => { handleFoundDelete }}>删除</Button>

                    </Space>
                </Flex>
            ),

        }
    ];


    return (
        <>
            <Content
                title="失物招领大厅"
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
