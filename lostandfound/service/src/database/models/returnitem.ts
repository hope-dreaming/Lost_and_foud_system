import { sequelize, DataTypes } from '../init'
import Admin from './admin'
import Founditem from './founditem'
import User from './user'

const Returnitem = sequelize.define('returnitems', {
    rid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    },
    rdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    risok: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    utele: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: User,
            key: 'utele',
        },
    },
    aid: {
        type: DataTypes.STRING(10),
        allowNull: false,
        references: {
            model: Admin,
            key: 'aid',
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

export default Returnitem
