
import {Sewa, Kostumer, Car, Promo, TokenUser} from '../models/index.js'

export const getCar = async (req, res) => {
    try {
        const car = await Car.findAll({
            order: [['id', 'DESC']],
            include: Promo
        });
        res.json(car)
    } catch (error) {
        console.log(error);
    }
}

function ubahText(teks){
    let teksKecil = teks.toLowerCase()
    let teksBerubah = teksKecil.replace(/\s+/g, '-')
    return teksBerubah
}

export const insertCar =  async (req, res) => {
    console.log(req.file)

    try {
        // const image = req.file;
        const cekCar = await Car.create({
            image: `http://localhost:5000/uploads/${req.file.filename}`,
            name_car: req.body.name_car,
            slug: ubahText(req.body.name_car),
            plat: req.body.plat,
            seat: req.body.seat,
            tipe_mobil: req.body.tipe_mobil,
            harga: req.body.harga,
            status: req.body.status,
            deskripsi: req.body.deskripsi
        });

        if(req.body.harga_promo && req.body.tanggal_mulai && req.body.tanggal_akhir){
            const insertPromo = await Promo.create({
                id_car: cekCar.id,
                harga_promo: req.body.harga_promo,
                tanggal_mulai: req.body.tanggal_mulai,
                tanggal_akhir: req.body.tanggal_akhir,
            })
        }

       
        if(!cekCar){
            return res.stastus(500).json({message: 'data Kosong '})
        }
        console.log(cekCar);
        res.json({
                "stastus": 201,
                "message" : "Data Car Berhasil Masuk",
                "data" : cekCar
        })
    } catch (error) {
        console.log(error)
    }}

export const getCarById = async (req, res) => {
    try {
        const cekCar = await Car.findAll({
            where:{
                id: req.params.id
            }
        })
        res.send({
            "status": 200,
            "data": cekCar
        })
    } catch (error) {
        console.log(error)
    }
}

export const getCarBySlug = async (req, res) => {
    try {
        const cekCar = await Car.findOne({
            where: {
                slug: req.params.slug
            }
            
        })
        res.status(200).json({
            data: cekCar
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteCar = async (req, res) => {
    try {
        await Car.destroy({
            where:{
                id:req.params.id
            }
        })

        await Promo.destroy({
            where:{
                id_car: req.params.id
            }
        })
        res.send("Sukses Delete Car")
    } catch (error) {
        console.log(error)
    }
}

export const getCarByStatus = async (req, res) => {
    try {
        const dataCar = await Car.findAll({
            where: {
                status: 1
            }
        })
        res.status(200).json({
            message: 'Data Mobil',
            data: dataCar
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateCar = async (req, res) => {
    try {
        console.log(req.file)
        
        if(!req.file){
           await Car.update({
                name_car: req.body.name_car,
                slug: ubahText(req.body.name_car),
                plat: req.body.plat,
                seat: req.body.seat,
                tipe_mobil: req.body.tipe_mobil,
                harga: req.body.harga,
                status: req.body.status,
                deskripsi: req.body.deskripsi
            },{
                where: {
                    id: req.params.id
                }
            })
        }else{
           await Car.update({
               image: `http://localhost:5000/uploads/${req.file.filename}`,
               name_car: req.body.name_car,
               slug: ubahText(req.body.name_car),
               plat: req.body.plat,
               seat: req.body.seat,
               tipe_mobil: req.body.tipe_mobil,
               harga: req.body.harga,
               status: req.body.status,
               deskripsi: req.body.deskripsi
           },{
               where: {
                   id: req.params.id
               }
           })
        }

        const existingPromo = await Promo.findOne({
            where: {
                id_car: req.params.id
            }
        });
        if(req.body.harga_promo){
            if (existingPromo) {
                await Promo.update({
                    harga_promo: req.body.harga_promo,
                    tanggal_mulai: req.body.tanggal_mulai,
                    tanggal_akhir: req.body.tanggal_akhir
                }, {
                    where: {
                        id_car: req.params.id
                    }
                });
            } else {
                await Promo.create({
                    id_car: req.params.id,
                    harga_promo: req.body.harga_promo,
                    tanggal_mulai: req.body.tanggal_mulai,
                    tanggal_akhir: req.body.tanggal_akhir
                });
            }
        }
        

      
        res.json({
            "status": "200",
           
        })
    } catch (error) {
        console.log(error)
    }
}