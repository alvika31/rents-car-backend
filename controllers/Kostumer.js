
import bcrypt, { hash } from "bcrypt";
import { where } from "sequelize";
import { Sequelize } from "sequelize";
import crypto from 'crypto';
import nodemailer from 'nodemailer'
import { Op } from "sequelize";

import {Sewa, Kostumer, Car, Promo, TokenUser} from '../models/index.js'

export const getKostumer = async (req, res) => {
    try {
        const kostumer = await Kostumer.findAll();
        res.json(kostumer)
    } catch (error) {
        console.log(error);
    }
}
function generateRandomNumber(digits) {
    const bytes = Math.ceil(digits / 2);
    const buffer = crypto.randomBytes(bytes);
    return buffer.readUIntBE(0, bytes) % Math.pow(10, digits);
  }

export const insertKostumer =  async (req, res) => {
    try {
        const cekEmail = await Kostumer.findOne({
          where:{
            email: req.body.email
          }
        })
        const cekUsername = await Kostumer.findOne({
          where:{
            username: req.body.username
          }
        })
       
        if(cekEmail){
          return res.status(400).json({message: 'Email Sudah Terdaftar'})
        }else if(cekUsername){
          return res.status(400).json({message: 'Username Sudah Terdaftar'})
        }else{
          const cekKostumer = await Kostumer.create({
            nama_lengkap: req.body.nama_lengkap,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            alamat: req.body.alamat,
            whatsapp: req.body.whatsapp,
            ktp: req.body.ktp,
            jenis_kelamin: req.body.jenis_kelamin
        });

        const token = await TokenUser.create({
            id_user: cekKostumer.id,
            token: generateRandomNumber(6)
        })

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'edwarpikpik@gmail.com',
              pass: 'uegcsxaryiwuvzyi'
            }
          });
          const mailOptions = {
            from: 'edwarpikpik@gmail.com',
            to: cekKostumer.email,
            subject: 'Verifikasi Email Rent Car',
            text: 'Hello '+ req.body.nama_lengkap +',\n\n' + 'Please verify your account ' + token.token + '\n\nThank You!\n'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

        res.json({
            'status': 200,
            'message': 'Data kostumer Berhasil ditambahkan',
            'data': cekKostumer
        })}
        
       
    } catch (error) {
        console.log(error)
    }
}

export const verifikasiEmail = async (req, res) => {
  try {
    // const token = req.params
    // const insertTokem = req.body.token
    const foundToken = await TokenUser.findOne({
      where:{
       token: req.body.token
      }
    })

    if(req.body.token === ''){
      return res.status(400).json({message: 'Input Token Required'})
    }

    if(!foundToken){
      return res.status(404).json({message: 'Token Tidak Ditemukan'})
    }

    const kostumer = await Kostumer.findByPk(foundToken.id_user);

    if(!kostumer){
      return res.status(404).json({message: 'Kostumer Not Found'})
    }

    kostumer.is_verifikasi = 1
    await kostumer.save()

    res.json({ message: 'User Berhasil Terverifikasi' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const sendVerifikasiEmail = async (req, res) => {
  try {
    const foundAkun = await Kostumer.findOne({
      where:{
        email: req.body.email
        // [Op.and]: [{ is_verifikasi: 0 }, { email: req.body.email }]
      }
    })
    
    if(req.body.email === ''){
      res.status(400).json({
        message: 'Input Email Required',
        
      })
    }
    else if(!foundAkun){
      res.status(404).json({
        message: 'email tidak terdaftar',
      })
    }else if(foundAkun.dataValues.is_verifikasi === 1){
      res.status(400).json({
        message: 'email terverifikasi',
        data: foundAkun
      })
    }else{

    const token = await TokenUser.create({
      id_user: foundAkun.id,
      token: generateRandomNumber(6)
  })
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'edwarpikpik@gmail.com',
      pass: 'uegcsxaryiwuvzyi'
    }
  });
  const mailOptions = {
    from: 'edwarpikpik@gmail.com',
    to: foundAkun.email,
    subject: 'Verifikasi Email Rent Car',
    text: 'Hello '+ foundAkun.nama_lengkap +',\n\n' + 'Please verify your account ' + token.token + '\n\nThank You!\n'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

res.json({
    'status': 200,
    'message': 'Token Berhasil Terkirim',
})}
  

  } catch (error) {
    console.log(error)
  }
}

export const changePassword = async (req, res) => {
  try {
    const {id, password} = req.body
    const foundAkun = await Kostumer.findOne({
      where: {
        id: id
      }
    })
    

    if(!foundAkun){
      return res.status(404).json({message: 'User Not Found'})
    }
    if(password === ''){
      return res.status(400).json({message: 'Input Required'})
    }
    const change = await Kostumer.findByPk(foundAkun.id)
    change.password = password

    const hashedPassword = await bcrypt.hash(change.password, 10);
    change.password = hashedPassword;

    await change.save()

    res.json({
      'status': 200,
      'message': 'Password Berhasil Direset',
  })
  } catch (error) {
    
  }
}

export const editMyProfile = async (req, res) => {
  try {
    const {id, nama_lengkap, whatsapp, alamat, ktp, jenis_kelamin} = req.body
    const cekUpdate = await Kostumer.update({
      nama_lengkap: nama_lengkap,
      whatsapp: whatsapp,
      alamat: alamat,
      ktp: ktp,
      jenis_kelamin: jenis_kelamin
    },{where: {id: id}}) 

    if(!cekUpdate){
      return res.status(400).json({message: 'Tidak Ada Perubahan Data'})
    }

    if(cekUpdate){
      return res.status(200).json({
        message: 'Data Telah diubah',
        data: cekUpdate
      })
    }
  } catch (error) {
    console.log(error)
  }
}