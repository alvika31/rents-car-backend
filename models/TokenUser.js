import { Sequelize } from "sequelize";
import db from "../config/database.js";
import bcrypt from "bcrypt";
import Kostumer from "./Kostumer.js";

const {DataTypes} = Sequelize;
const TokenUser = db.define('token_user', {
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiredAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now
    }
}, {
    freezeTableName: true
})



export default TokenUser