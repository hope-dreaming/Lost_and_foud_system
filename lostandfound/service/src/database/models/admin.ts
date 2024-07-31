import { sequelize, DataTypes } from '../init'

const Admin = sequelize.define('admins', {
    aid: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        primaryKey: true,
        //   autoIncrement: true,
    },
    aname: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    apssword: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    atele: {
        type: DataTypes.STRING(20),
        allowNull: true,
    }

})

export default Admin
