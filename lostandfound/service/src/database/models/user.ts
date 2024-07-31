import { sequelize, DataTypes } from '../init'

const User = sequelize.define('users', {
    utele: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        primaryKey: true,
        //   autoIncrement: true,
    },
    upssword: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    uname: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    uid: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    usexy: {
        type: DataTypes.STRING(10),
        allowNull: true,
    }

})

export default User
