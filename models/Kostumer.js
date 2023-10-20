import { Sequelize } from "sequelize";
import db from "../config/database.js";
import bcrypt from "bcrypt";

const {DataTypes} = Sequelize;

const Kostumer = db.define('kostumer', {
    nama_lengkap: {
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
    password: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
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
    alamat: {
        type: DataTypes.STRING,
        allowNull:true,
    },
    whatsapp: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    ktp: {
        type: DataTypes.STRING,
        allowNull:true,
    },
    jenis_kelamin: {
        type: DataTypes.STRING,
        allowNull:true,
    },
    is_verifikasi: {
        type: DataTypes.INTEGER,
        defaultValue: false
    },
}, {
    freezeTableName: true
});

Kostumer.beforeCreate(async (kostumer, options) => {
    const hashedPassword = await bcrypt.hash(kostumer.password, 10);
    kostumer.password = hashedPassword;
})

// Kostumer.beforeUpdate(async (kostumer, options) => {
//     const hashedPassword = await bcrypt.hash(kostumer.password, 10);
//     kostumer.password = hashedPassword;
// })


export default Kostumer;