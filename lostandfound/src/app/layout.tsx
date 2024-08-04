'use client'

import React, { useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Dropdown, Layout, Menu, Space, theme } from 'antd';
import styles from './page.module.css'
import Head from 'next/head';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const { Header, Content, Footer, Sider } = Layout;

const ITEMS = [
  {
    label: "寻物启示",
    key: "lossitem",
    // role: USER_ROLE.USER,
    // icon: <SnippetsOutlined />,
    children: [
      {
        label: "寻物启示列表",
        key: "/lossitem",
        // role: USER_ROLE.USER,
      },
      {
        label: "添加寻物启事",
        key: "/lossitem/add",
        // role: USER_ROLE.ADMIN,
      },
    ],
  },
  {
    label: "失物招领公示",
    key: "founditem",
    // role: USER_ROLE.USER,
    // icon: <SolutionOutlined />,
    children: [
      {
        label: "失物招领列表",
        key: "/founditem",
        // role: USER_ROLE.USER,
      },
      {
        label: "添加失物招领",
        key: "/founditem/add",
        // role: USER_ROLE.ADMIN,
      },
    ],
  },
  {
    label: "失物领取记录",
    key: "/returnitem",
    // icon: <ProfileOutlined />,
    // role: USER_ROLE.ADMIN,
  },
  {
    label: "用户管理",
    key: "user",
    // icon: <UserOutlined />,
    // role: USER_ROLE.ADMIN,
    children: [
      {
        label: "用户列表",
        key: "/user",
        // role: USER_ROLE.ADMIN,
      },
      {
        label: "用户添加",
        key: "/user/add",
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

  // const USER_ITEMS: MenuProps["items"] = [
  //   {
  //     key: "1",
  //     // label: <Link href={`/user/edit/${user?._id}`}>个人中心</Link>,
  //   },
  //   {
  //     key: "2",
  //     label: (
  //       <span
  //       // onClick={async () => {
  //       //   await setLogout();
  //       //   localStorage.removeItem("user");
  //       //   message.success("退出成功");
  //       //   router.push("/login");
  //       // }}
  //       >
  //         退出
  //       </span>
  //     ),
  //   },
  // ];

  const USER_ITEMS: MenuProps["items"] = [
    {
      key: "1",
      label: "个人中心",
    },
    {
      key: "2",
      label: "退出",
    }
  ]


  return (
    <html>
      <head>
        <title>校园失物招领系统</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </head>
      <body>
        <Layout className={styles.container}>
          <Header className={styles.header}>
            校园失物招领系统
            <span className={styles.user}>
              {/* <Dropdown menu={{ items: USER_ITEMS }} placement="bottom"> */}
              <Dropdown menu={{ items: USER_ITEMS }} placement="bottom">
                <span onClick={(e) => e.preventDefault()}>
                  <Space>
                    {/* {user?.nickName} */}
                    管理员
                    <DownOutlined />
                  </Space>
                </span>
              </Dropdown>
            </span>
          </Header>
          <Content style={{ padding: '0 48px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> 面包屑*/}
            <Layout
              style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
            >
              <Sider style={{ background: colorBgContainer }} width={200}>
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
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {children}
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </body>
    </html>

  );
}
