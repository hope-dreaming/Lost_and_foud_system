'use client'

import React, { useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Dropdown, Layout, Menu, message, Space, theme } from 'antd';
import styles from './page.module.css'
import Head from 'next/head';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { setLogout } from '@/api';

const { Header, Content, Footer, Sider } = Layout;

const ITEMS = [
  {
    label: "寻物启事",
    key: "lossitem",
    // role: USER_ROLE.USER,
    // icon: <SnippetsOutlined />,
    children: [
      {
        label: "寻物启事大厅",
        key: "/backend/lossitem",
        // role: USER_ROLE.USER,
      },
      {
        label: "个人寻物信息",
        key: "/backend/lossitem/show",
        // role: USER_ROLE.ADMIN,
      },
      {
        label: "添加寻物启事",
        key: "/backend/lossitem/add",
        // role: USER_ROLE.ADMIN,
      },
    ],
  },
  {
    label: "失物招领",
    key: "founditem",
    // role: USER_ROLE.USER,
    // icon: <SolutionOutlined />,
    children: [
      {
        label: "失物招领大厅",
        key: "/backend/founditem",
        // role: USER_ROLE.USER,
      },
      {
        label: "个人拾物信息",
        key: "/backend/founditem/show",
        // role: USER_ROLE.ADMIN,
      },
      {
        label: "添加失物招领",
        key: "/backend/founditem/add",
        // role: USER_ROLE.ADMIN,
      },
    ],
  },
  {
    label: "失物领取记录",
    key: "returnitem",
    // icon: <ProfileOutlined />,
    // role: USER_ROLE.ADMIN,
    children: [
      {
        label: "待办事项",
        key: "/backend/returnitem",
        // role: USER_ROLE.ADMIN,
      },
      {
        label: "完成事项",
        key: "/backend/returnitem/detail",
      }
    ]
  },
  {
    label: "用户管理",
    key: "user",
    // icon: <UserOutlined />,
    // role: USER_ROLE.ADMIN,
    children: [
      {
        label: "用户列表",
        key: "/backend/user",
        // role: USER_ROLE.ADMIN,
      },
      {
        label: "用户添加",
        key: "/backend/user/add",
        // role: USER_ROLE.ADMIN,
      },
    ],
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();
  // const user = useCurrentUser();

  const activeMenu = usePathname();
  const defaultOpenKeys = [activeMenu.split("/")[1]];


  const handleChangeMenu: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };



  const USER_ITEMS: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/backend/user">个人中心</Link>,
    },
    {
      key: "2",
      label: (
        <span
          onClick={async () => {
            // await setLogout();
            // localStorage.removeItem("user");
            message.success("退出成功");
            router.push("/login");
          }}
        >
          退出
        </span>
      ),
    }
  ]


  return (

    <div className={styles.container}>
      <Layout >
        <Header className={styles.header}>
          校园失物招领系统
          <span className={styles.user}>
            {/* <Dropdown menu={{ items: USER_ITEMS }} placement="bottom"> */}
            <Dropdown menu={{ items: USER_ITEMS }} placement="bottom">
              <span onClick={(e) => e.preventDefault()}>
                <Space>
                  {/* {user?.nickName} */}
                  用户名
                  <DownOutlined />
                </Space>
              </span>
            </Dropdown>
          </span>
        </Header>

        {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> 面包屑*/}
        <Layout >
          <Sider className={styles.sider}>
            <Menu
              className={styles.menu}
              onClick={handleChangeMenu}
              selectedKeys={[activeMenu]}
              items={ITEMS}
              mode="inline"
              theme="light"
              defaultOpenKeys={defaultOpenKeys}
            />
          </Sider>
          <Content className={styles.content}>
            {children}
          </Content>
        </Layout>

      </Layout>
    </div>


  );
}
