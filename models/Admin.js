import { Sequelize } from "sequelize";
import db from "../config/database.js";
import bcrypt from "bcrypt";

const {DataTypes} = Sequelize;

const Admin = db.define('admin', {
    full_name: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail:true,
            notEmpty:true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
}, {
    freezeTableName: true
});

Admin.beforeCreate(async (admin, options) => {
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    admin.password = hashedPassword;
})


export default Admin;