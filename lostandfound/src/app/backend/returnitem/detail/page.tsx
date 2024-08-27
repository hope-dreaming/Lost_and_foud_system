'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Flex, Form, Input, Row, Space, Table, TablePaginationConfig, Tag, Tooltip } from 'antd';
import styles from './page.module.css'
import axios from 'axios';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import { getLossItemList } from '@/api/lossitem';
import { LossitemQuery, ReturnitemQueryType } from '@/types';
import Content from '@/components/Content';
import { getFoundItemList } from '@/api/founditem';
import { useCurrentUser } from '@/utils/hoos';
import { usePathname } from 'next/navigation';
import { getReturnItemList } from '@/api';

export default function Returnitemdetail() {

    const [form] = Form.useForm();

    const user = useCurrentUser();
    const pathname = usePathname();
    let isok: number;
    if (pathname === '/backend/returnitem')
        isok = 2
    else if (pathname === '/backend/returnitem/detail')
        isok = 4

    const columns = [
        {
            title: '领取人',
            dataIndex: 'tele',
            key: 'tele',
            align: 'center',
        },
        {
            title: '申请时间',
            dataIndex: 'date',
            key: 'date',
            align: 'center',
        },
        {
            title: '审核人',
            dataIndex: 'uaid',
            key: 'uaid',
            align: 'center',
        },
        {
            title: '领取物品编号',
            dataIndex: 'fid',
            key: 'fid',
            align: 'center',
        },
        {
            title: '审核结果',
            dataIndex: 'isok',
            key: 'isok',
            align: 'center',
            render: (text: number) =>
                text === 1 ? (
                    <Tag color="green">通过</Tag>
                ) : (
                    <Tag color="red">驳回</Tag>
                ),
        },

    ];
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([])

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        showSizeChanger: true,
    })

    const handleSearchFinish = async (values: ReturnitemQueryType) => {
        console.log('Received values from form: ', values);
        fetchData(values)

    };

    const handleSearchReset = () => {
        // console.log(form)
        form.resetFields();
    }

    const fetchData = useCallback(
        (search?: ReturnitemQueryType) => {
            const { item_fid, item_tele, item_uaid } = search || {};
            getReturnItemList({
                current: pagination.current as number,
                pageSize: pagination.pageSize as number,
                item_fid,
                item_tele,
                item_uaid,
                role: user?.info?.role,
                isok,
                userId: user?.info?.tele
            }).then((res) => {
                setData(res.data);
                console.log(res)
                setTotal(res.total);
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [pagination, user?.info?.role]
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
                title="完成事项"
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
                    <Row gutter={24}>
                        <Col span={5}>
                            <Form.Item name="item_tele" label="领取人账号" >
                                <Input placeholder='请输入领取人账号' />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="item_uaid" label="管理员账号" >
                                <Input placeholder='请输入管理员账号' />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="item_fid" label="物品编号" >
                                <Input placeholder='请输入物品编号' />
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
