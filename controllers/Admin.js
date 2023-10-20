import Admin from "../models/Admin.js";
import bcrypt, { hash } from "bcrypt";
import { where } from "sequelize";
import { Sequelize } from "sequelize";

import {Sewa, Kostumer, Car, Promo, TokenUser} from '../models/index.js'

export const getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findAll({
            order: [['id', 'DESC']],
        });
        res.json(admin)
    } catch (error) {
        console.log(error);
    }
}

export const insertAdmin = async (req, res) => {
    try {
        await Admin.create(req.body);
        console.log(req.body);
        res.json({
                "stastus": 201,
                "message" : "Data Admin Berhail Masuk",
        })
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            return res.status(400).json({ errors: error.errors });
          }
        console.log(error);
    }
}

export const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findAll({
            where:{
                id: req.params.id
            }
        });
        if(admin == ""){
            res.json({
                "status": 404,
                "Message": "Data Not Found"
            })
        }
        res.json({
            "status": 200,
            "data": admin
        })
    } catch (error) {
        console.log(error)
    }}

export const updateAdmin = async (req, res) => {
    try {
        const {
            full_name, username, email, password
        } = req.body;

        if(password){
            bcrypt.hash(password, 10).then((hash) => {
                Admin.update({
                    full_name: full_name,
                    username: username,
                    email: email,
                    password: hash
                },{ where: {
                    id: req.params.id
            }})
            })
        }else{
            Admin.update({
                full_name: full_name,
                username: username,
                email: email,
            },{ where:{
                id:req.params.id
        }})
        }
   
        res.json({
            "message": "data berhasil terupdate"
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteAdmin = async(req, res) => {
    try {
        await Admin.destroy({
            where: {id:req.params.id}
        })
        res.json({
            "Message": "Admin Berhasil dihapus"
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteKostumer = async (req, res) => {
    try {
        await Kostumer.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            "Message": "Kostumer Berhasil dihapus"
        })
    } catch (error) {
        console.log(error)
    }
}

export const getCount = async(req, res) => {
    try {
        const bookingSuccess = await Sewa.count({
            where: {
                status: 1
            }
        })
        const bookingFailed = await Sewa.count({
            where: {
                status: 0
            }
        })
        const carAvailable = await Car.count({
            where: {
                status: 1
            }
        })
        const carNotAvailable = await Car.count({
            where: {
                status: 0
            }
        })
        const kostumerYes = await Kostumer.count({
            where: {
                is_verifikasi: 1
            }
        })
        const kostumerNot = await Kostumer.count({
            where: {
                is_verifikasi: 0
            }
        })
        const dataAdmin = await Admin.count()
        res.status(200).json({bookingSuccess, bookingFailed, carAvailable, carNotAvailable, kostumerYes, kostumerNot, dataAdmin})
    } catch (error) {
        
    }
}

export const getAllBooking = async (req, res) => {
    try {
        const dataBooking = await Sewa.findAll({
            include: [
                {model: Kostumer},
                {model: Car}
            ],
            order: [['id', 'DESC']],
            
        });
       
        res.status(200).json({dataBooking})
    } catch (error) {
        console.log(error)
    }
}

