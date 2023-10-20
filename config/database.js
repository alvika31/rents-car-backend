import { Sequelize } from "sequelize";

const db = new Sequelize('rent_car', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})


export default db;