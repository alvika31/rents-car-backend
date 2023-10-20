import {Sewa, Kostumer, Car, Promo, TokenUser} from '../models/index.js'
import { Sequelize } from "sequelize";
import midtransClient from "midtrans-client";
import nodemailer from "nodemailer";

import moment from "moment";

const midtransConfig = {
  isProduction: false,
  serverKey: "SB-Mid-server-LXL7ztQjS3fyRnSYiTPVWrcR",
  clientKey: "SB-Mid-client-a3M-SkOHovJuu1mE",
  midtransBaseUrl: "https://api.sandbox.midtrans.com/v2",
};

const coreApi = new midtransClient.CoreApi(midtransConfig);
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
export const addSewa = async (req, res) => {
  try {
    const cekStatusMobil = await Car.findOne({
      where: {
        id: req.body.id_car,
      },
    });

    if (cekStatusMobil.status === "0") {
      return res.status(400).json({ message: "Mobil Sudah ada yang pesan" });
    } else {
      const cekSewa = await Sewa.create({
        id_kostumer: req.body.id_kostumer,
        id_car: req.body.id_car,
        lama_sewa: req.body.lama_sewa,
        total_harga: req.body.total_harga,
        awal_sewa: req.body.awal_sewa,
        akhir_sewa: req.body.akhir_sewa,
        tanggal_pengembalian: req.body.tanggal_pengembalian,
        status: req.body.status,
      });

      const editStatusMobil = await Car.findByPk(cekSewa.id_car);
      if (!editStatusMobil) {
        return res.status(404).json({ message: "Mobil Tidak ditemukan" });
      }
      editStatusMobil.status = 1;
      await editStatusMobil.save();
      const kostumer = await Kostumer.findByPk(cekSewa.id_kostumer);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "edwarpikpik@gmail.com",
          pass: "uegcsxaryiwuvzyi",
        },
      });

      const mailOptions = {
        from: "edwarpikpik@gmail.com",
        to: kostumer.email,
        subject: "Berhasil Membooking Mobil",
        text:
          "Hello " +
          kostumer.nama_lengkap +
          ",\n\n" +
          "Anda Berhasil Membooking Mobil. Berikut Datanya \nMobil: " +
          editStatusMobil.name_car +
          "\nSeat Mobil: " +
          editStatusMobil.seat +
          "\nTipe Mobil: " +
          editStatusMobil.tipe_mobil +
          "\nLama Sewa: " +
          cekSewa.lama_sewa +
          "\nDari Tanggal " +
          formatDate(cekSewa.awal_sewa) +
          "\nSampai Tanggal: " +
          formatDate(cekSewa.akhir_sewa) +
          "\nTanggal Pengembalian: " +
          formatDate(cekSewa.tanggal_pengembalian) +
          "\nTotal Harga: " +
          formatRupiah(cekSewa.total_harga) +
          "\n\nSilahkan Melakukan Pembayaran. Terimakasih!\n",
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      if (!cekSewa) {
        return res.status(400).json({ message: "Sewa Mobil Gagal" });
      }
      res.status(200).json({ message: "Sewa Mobil Berhasil" });
    }
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      // Tangani validasi error
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));
      res.status(400).json({ errors: validationErrors });
    } else {
      // Tangani error lainnya
      console.error("Error creating user:", error);
      res.status(500).send("Error creating user");
    }
  }
};

export const sewaKostumer = async (req, res) => {
  try {
    const cekSewa = await Sewa.findAll({
      order: [["id", "DESC"]],
      where: {
        id_kostumer: req.params.id_kostumer,
      },
      include: Car,
    });
    res.status(200).json({
      data: cekSewa,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPayment = async (req, res) => {
  const midtransConfig = {
    isProduction: false,
    serverKey: "SB-Mid-server-LXL7ztQjS3fyRnSYiTPVWrcR",
    clientKey: "SB-Mid-client-a3M-SkOHovJuu1mE",
    midtransBaseUrl: "https://api.sandbox.midtrans.com/v2",
  };

  // Inisialisasi klien Midtrans
  const snap = new midtransClient.Snap(midtransConfig);
  try {
    const { amount, itemDetails, orderId, costumerDetails } = req.body;

    // Buat objek transaksi
    const transactionDetails = {
      order_id: `ORDER-ID-${orderId}`,
      gross_amount: amount,
    };

    const creditCardOptions = {
      secure: true,
      channel: "migs",
    };

    const transaction = {
      transaction_details: transactionDetails,
      item_details: itemDetails,
      credit_card: creditCardOptions,
      customer_details: costumerDetails,
    };

    // Buat permintaan pembayaran ke Snap API
    const snapToken = await snap.createTransaction(transaction);

    res.json({ orderId: transactionDetails.order_id, transaction, snapToken });
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).send("Error creating order");
  }
};

export const updateStatusSewa = async (req, res) => {
  try {
    const cekStatus = Sewa.update(
      {
        status: 1,
      },
      {
        where: {
          id_car: req.params.id_car,
        },
      }
    );
    res.status(200).json({ message: "Status Sewa Berhasil diganti" });
  } catch (error) {
    console.log(error);
  }
};

export const getAllSewa = async (req, res) => {
  try {
    const dataSewa = await Sewa.findAll({
      order: [['id', 'DESC']],
  })
  
    res.status(200).json({dataSewa: dataSewa})
  } catch (error) {
    console.log(error);
  }
}
