import { sequelize, DataTypes } from '../init'
import { User } from './user'

const Founditem = sequelize.define('founditems', {
    fid: {
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
    isreturn: {
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

export { Founditem }
