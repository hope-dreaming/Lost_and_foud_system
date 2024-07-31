import { sequelize, DataTypes } from '../init'
import User from './user'

const Founditem = sequelize.define('founditems', {
    fid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    },
    fname: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    fdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fplace: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ftype: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    fdesc: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    fisreturn: {
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

export default Founditem
