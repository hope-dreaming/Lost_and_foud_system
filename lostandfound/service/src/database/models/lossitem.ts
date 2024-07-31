import { sequelize, DataTypes } from '../init'
import User from './user'

const Lossitem = sequelize.define('lossitems', {
    lid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    },
    lname: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    ldate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    lplace: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ltype: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    ldesc: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    lisreturn: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    utele: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: User,
            key: 'utele',
        },
    }


})

export default Lossitem
