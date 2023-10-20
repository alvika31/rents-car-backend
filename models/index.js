import Sewa from "./Sewa.js";
import Kostumer from "./Kostumer.js";
import TokenUser from "./TokenUser.js";

import Car from "./Car.js";
import Promo from "./Promo.js";


Car.hasOne(Promo, {foreignKey: 'id_car'});
Promo.belongsTo(Car, {foreignKey: 'id_car'});
Sewa.belongsTo(Kostumer, {foreignKey: 'id_kostumer'})
Sewa.belongsTo(Car, {foreignKey: 'id_car'})


TokenUser.belongsTo(Kostumer, {foreignKey: 'id_user'})

export {Sewa, Kostumer, Car, Promo, TokenUser};