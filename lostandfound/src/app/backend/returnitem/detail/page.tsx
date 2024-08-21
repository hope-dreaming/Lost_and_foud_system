'use client'

import React, { useEffect, useState } from 'react';
import { Button, Col, Flex, Form, Input, Row, Space, Table, TablePaginationConfig, Tooltip } from 'antd';
import styles from './page.module.css'
import axios from 'axios';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import { getLossItemList } from '@/api/lossitem';
import { LossitemQuery } from '@/types';
import Content from '@/components/Content';
import { getFoundItemList } from '@/api/founditem';

export default function Returnitemdetail() {

    const [form] = Form.useForm();

    // const user = useCurrentUser();
    // const [list, setList] = useState<BookType[]>([]);
    // const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
    // const [total, setTotal] = useState(0);
    // const [pagination, setPagination] = useState<TablePaginationConfig>({
    //   current: 1,
    //   pageSize: 20,
    //   showSizeChanger: true,
    // });
    const columns = [
        {
            title: '领取人',
            dataIndex: 'tele',
            key: 'tele',
            align: 'center',
        },
        {
            title: '申请时间',
            dataIndex: 'time',
            key: 'time',
            align: 'center',
        },
        {
            title: '审核人',
            dataIndex: 'atele',
            key: 'atele',
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
        },

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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFoundItemList()
                // console.log(res)
                setData(data)
                // console.log(res)
            }
            catch (e) {
                console.error(e)
            }
        }
        fetchData()
        // setPagination({ ...pagination, total: dataSource.length })

    }, [])

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
                            <Form.Item name="item_atele" label="管理员账号" >
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
