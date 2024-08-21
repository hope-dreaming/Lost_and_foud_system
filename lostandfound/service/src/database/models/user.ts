import { sequelize, DataTypes } from '../init'

const User = sequelize.define('users', {
    uid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    },
    tele: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    pssword: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    uno: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    sexy: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },



})

export { User }
