const { Sequelize, DataTypes } = require('sequelize');

const sequelize: any = new Sequelize(
    'lostandfound', 'root', 'Mysql', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    // logging: false,
});

// 连接
sequelize.authenticate()
    // 发送连接请求

    .then(() => {
        console.log('Mysql connect success');
    })
    .catch((err: any) => {
        console.log('Mysql connect fail', err);
    })


export { sequelize, DataTypes }

require('./index')