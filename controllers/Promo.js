import {Sewa, Kostumer, Car, Promo, TokenUser} from '../models/index.js'
import { Sequelize } from "sequelize";
import moment from 'moment';

const formatRupiah = (e) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(e);
  };
  const formatDate = (dateString) => {
    const formattedDate = moment(dateString)
      .locale("id")
      .format("dddd, D MMMM YYYY");
    return formattedDate;
  };



  export const insertPromo = async (req, res) => {
    try {
      const dataPromo = await Promo.create({
        id_car: req.body.id_car,
        harga_promo: req.body.harga_promo,
        tanggal_mulai: req.body.tanggal_mulai,
        tanggal_akhir: req.body.tanggal_akhir
      })
      if(!dataPromo){
        return res.stastus(500).json({message: 'data Kosong '})
    }
    console.log(dataPromo);
    res.json({
      "stastus": 201,
      "message" : "Data Car Berhasil Masuk",
      "data" : dataPromo
})
    } catch (error) {
      console.log(error)
    }
  }