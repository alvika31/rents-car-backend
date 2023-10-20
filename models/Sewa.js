import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Kostumer from "./Kostumer.js";
import Car from "./Car.js"


const {DataTypes} = Sequelize;

const Sewa = db.define('sewa', {
    id_kostumer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_car: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lama_sewa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total_harga: {
        type: DataTypes.STRING,
        allowNull: false
    },
    awal_sewa: {
        type: DataTypes.DATE,
        allowNull: false
    },
    akhir_sewa: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tanggal_pengembalian: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
})


export default Sewa