import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Car from "./Car.js";

const { DataTypes } = Sequelize;

const Promo = db.define(
  "promo",
  {
    id_car: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    harga_promo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_mulai: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tanggal_akhir: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);





export default Promo
