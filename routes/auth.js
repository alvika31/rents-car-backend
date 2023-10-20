import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Kostumer from "../models/Kostumer.js";
import { Op } from "sequelize";
import nodemailer from 'nodemailer'
import crypto from 'crypto';

export const loginAdmin = async (req, res) => {
    const {username, password} = req.body

    const admin = await Admin.findOne({
        where: {
            [Op.or]: [{ username }, { email: username }]
        }
    })

    if(!admin){
        return res.status(401).json({message: 'Username atau password salah'})
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password)

    if(!isPasswordValid){
        return res.status(401).json({message: 'Username atau password salah!'})
    }

    const token = jwt.sign({adminId: admin.id, role: 'admin'}, 'rahasia')
    res.json({token})
}

export const loginUser = async (req, res) => {
    const {username, password} = req.body
    try {
        const kostumer = await Kostumer.findOne({
            where: {
                [Op.or]: [{ username }, { email: username }]
            }
        })
        if(username === '' || password === ''){
            return res.status(400).json({message: 'Input Required'})
        }
        if(!kostumer){
            return res.status(401).json({message: 'Username atau password salah!'})
        }
        


        const isPasswordValid = await bcrypt.compare(password, kostumer.password)
        
        if(!isPasswordValid){
            return res.status(401).json({message: 'Username atau password salah!'})
        }
        if(kostumer.is_verifikasi === 0){
            return res.status(403).json({ message: 'Akun Belum Terverifikasi' });
        }


        const token = jwt.sign({kostumerId: kostumer.id, role: 'kostumer'}, 'rahasia')
        res.json({token, is_verifikasi: true})
    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req, res) => {
    res.clearCookie('token')
    res.json({message: 'Logout Berhasil'})
}

export const resetPassword = async (req, res) => {
    const {email} = req.body
    try {
        const cekEmail = await Kostumer.findOne({
            where:{
              email: email
            }
          })
        if(email === ''){
            return res.status(400).json({message: 'Email Required'})
        }else if(!cekEmail){
            return res.status(404).json({message: 'Email Not Found'})
        }else{
            const kostumer = await Kostumer.findByPk(cekEmail.id);
            kostumer.password = crypto.randomBytes(5).toString('hex');

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'edwarpikpik@gmail.com',
                  pass: 'uegcsxaryiwuvzyi'
                }
              });
              const mailOptions = {
                from: 'edwarpikpik@gmail.com',
                to: cekEmail.email,
                subject: 'Verifikasi Email Rent Car',
                text: 'Hello, Akun Anda Telah Direset. Berikut Data Loginnya \n Email: '+ email +',\n' + 'Password: ' + kostumer.password + '\n\nThank You!\n'
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

            const hashedPassword = await bcrypt.hash(kostumer.password, 10);
            kostumer.password = hashedPassword;

            await kostumer.save()
           
              res.json({
                'status': 200,
                'message': 'Data kostumer Berhasil Direset',
                'data': mailOptions.text
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

     try {
        const decoded = jwt.verify(token, 'rahasia');
        const kostumer = await Kostumer.findOne({where:{id: decoded.kostumerId}})
        if (!kostumer) {
            return res.status(401).json({ message: 'User not found' });
          }
        req.kostumer = kostumer
        next();
     } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
     } 
    
}