'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Flex, Form, Input, message, Modal, Row, Space, Table, TablePaginationConfig, Tooltip } from 'antd';
import styles from './page.module.css'
import axios from 'axios';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import { getLossItemList } from '@/api/lossitem';
import { LossitemQuery, ReturnitemQueryType } from '@/types';
import Content from '@/components/Content';
import { getFoundItemList } from '@/api/founditem';
import { getAdiminReturnitemList, getUserReturnitemList, updateReturnitem } from '@/api';
import { useCurrentUser } from '@/utils/hoos';
import { usePathname } from 'next/navigation';
import { RETURN_ISOK, USER_ROLE } from '@/constants';
import { getArrowOffsetToken } from 'antd/es/style/placementArrow';

export default function Returnitem() {

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
            title: '领取人账号',
            dataIndex: 'tele',
            key: 'tele',
            align: 'center',
        },
        {
            title: '申请领取时间',
            dataIndex: 'date',
            key: 'date',
            align: 'center',
        },
        {
            title: '领取物品编号',
            dataIndex: 'fid',
            key: 'fid',
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

                        <Button type="primary" ghost
                            onClick={
                                () => {
                                    handleTackle(record.rid as number, RETURN_ISOK.OK as number, user?.uid as number, record.fid as number)
                                }}
                        >
                            同意
                        </Button>
                        <Button type="primary" danger ghost onClick={
                            () => {
                                handleTackle(record.rid as number, RETURN_ISOK.NO as number, user?.uid as number, record.fid as number)
                            }}
                        >
                            驳回
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

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setPagination({
            current: pagination.current ?? 1,
            pageSize: pagination.pageSize ?? 15,
            showSizeChanger: pagination.showSizeChanger ?? false, // 假设有showSizeChanger属性且默认false
        })
    }
    const handleSearchReset = () => {
        // console.log(form)
        form.resetFields();
    }

    const handleSearchFinish = async (values: ReturnitemQueryType) => {
        // console.log('Received values from form: ', values);
        fetchData(values)

    };

    const fetchData = useCallback(
        (search?: ReturnitemQueryType) => {
            if (user?.role === USER_ROLE.ADMIN) {
                const { item_fid, item_tele } = search || {};
                getAdiminReturnitemList({
                    current: pagination.current as number,
                    pageSize: pagination.pageSize as number,
                    item_fid,
                    item_tele,
                    isok,
                }).then((res) => {
                    setData(res.data);
                    console.log(res)
                    setTotal(res.total);
                });
            } else if (user?.role === USER_ROLE.USER) {
                const { item_fid } = search || {};
                getUserReturnitemList({
                    current: pagination.current as number,
                    pageSize: pagination.pageSize as number,
                    item_fid,
                    isok,
                    userId: user?.uid
                }).then((res) => {
                    setData(res.data);
                    console.log(res)
                    setTotal(res.total);
                });
            }

        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [pagination, user?.role]
    );

    useEffect(() => {
        fetchData();
    }, [fetchData, pagination]);

    const handleTackle = (rid: number, isok: number, uaid: number, fid: number) => {
        const params = {
            rid,
            isok,
            uaid,
            fid
        }
        if (isok === RETURN_ISOK.OK) {
            Modal.confirm({
                title: "确认同意该申请？",
                okText: "确定",
                cancelText: "取消",
                async onOk() {
                    try {
                        await updateReturnitem(params);
                        message.success("审核通过");
                        fetchData(form.getFieldsValue());
                    } catch (error) {
                        console.error(error);
                    }
                },
            });
        } else if (isok === RETURN_ISOK.NO) {
            Modal.confirm({
                title: "确认驳回该申请？",
                okText: "确定",
                cancelText: "取消",
                async onOk() {
                    try {
                        await updateReturnitem(params);
                        message.success("审核驳回");
                        fetchData(form.getFieldsValue());
                    } catch (error) {
                        console.error(error);
                    }
                },
            });
        }

    };




    return (
        <>
            <Content
                title="待办事项"
            >
                <Form
                    form={form}
                    name="lossitem_search"
                    // layout="inline"
                    onFinish={handleSearchFinish}
                    initialValues={{
                        item_tele: '',
                        item_fid: ''
                    }}

                >
                    <Row gutter={19}>
                        {user?.role === USER_ROLE.ADMIN ? (<Col span={5}>
                            <Form.Item name="item_tele" label="申请账号" >
                                <Input placeholder='请输入申请账号' />
                            </Form.Item>
                        </Col>) : null}
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
                        rowKey='tele'
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
