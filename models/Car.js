import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Promo from "./Promo.js";

const {DataTypes} = Sequelize

const Car = db.define('car', {
    image:{
        type:DataTypes.STRING
    },
    name_car: {
        type: DataTypes.STRING
    },
    slug: {
        type: DataTypes.STRING
    },
    plat: {
        type: DataTypes.STRING
    },
    seat: {
        type: DataTypes.INTEGER
    },
    tipe_mobil: {
        type: DataTypes.STRING
    },
    harga: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    deskripsi: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
});



export default Car