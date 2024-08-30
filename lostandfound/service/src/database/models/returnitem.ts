import { sequelize, DataTypes } from '../init'
import { Founditem } from './founditem'
import { User } from './user'

const Returnitem = sequelize.define('returnitems', {
    rid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    },
    isok: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    uid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'uid',
        },
    },
    uaid: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: User,
            key: 'uid',
        }
    },
    fid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Founditem,
            key: 'fid',
        }
    }


})

export { Returnitem }
