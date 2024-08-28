import { sequelize, DataTypes } from '../init'
import { User } from './user'

const Lossitem = sequelize.define('lossitems', {
    lid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    place: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    isfound: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
    },
    uid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'uid',
        },
    }


})

export { Lossitem }
