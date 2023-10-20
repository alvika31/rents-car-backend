/**
 * @swagger
 * components:
 *   schemas:
 *     Authentication Admin:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of your admin
 *         password:
 *           type: string
 *           description: The password of your admin
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Authentication Customer:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of your admin
 *         password:
 *           type: string
 *           description: The password of your admin
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - full_name
 *         - username
 *         - email
 *         - password
 *       properties:
 *         full_name:
 *           type: string
 *           description: The full name of your admin
 *         username:
 *           type: string
 *           description: The username of your admin
 *         email:
 *           type: string
 *           description: The email of your admin
 *         password:
 *           type: string
 *           description: The password of your admin  
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - nama_lengkap
 *         - username
 *         - password
 *         - email
 *         - alamat
 *         - whatsapp
 *         - ktp
 *         - jenis_kelamin
 *         - is_verifikasi
 *       properties:
 *         nama_lengkap:
 *           type: string
 *           description: The full name of customer
 *         username:
 *           type: string
 *           description: The username of customer
 *         password:
 *           type: string
 *           description: The password of customer  
 *         email:
 *           type: string
 *           description: The email of customer
 *         alamat:
 *           type: string
 *           description: The address of customer
 *         whatsapp:
 *           type: string
 *           description: The whatsapp of customer
 *         ktp:
 *           type: string
 *           description: The ktp of customer
 *         jenis_kelamin:
 *           type: string
 *           description: The Gender of customer
 *         is_verifikasi:
 *           type: integer
 *           description: The Status is active or not customer
 * 
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - image
 *         - name_car
 *         - slug
 *         - plat
 *         - seat
 *         - tipe_mobil
 *         - harga
 *         - status
 *         - deskripsi
 *       properties:
 *         image:
 *           type: string
 *           description: The Image of car
 *         name_car:
 *           type: string
 *           description: The name car of car
 *         slug:
 *           type: string
 *           description: The slug of car  
 *         plat:
 *           type: string
 *           description: The plat of car
 *         seat:
 *           type: integer
 *           description: The seat of car
 *         tipe_mobil:
 *           type: string
 *           description: The type car of car
 *         harga:
 *           type: string
 *           description: The price of car
 *         status:
 *           type: string
 *           description: The status of car
 *         deskripsi:
 *           type: text
 *           description: The description car
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Rent:
 *       type: object
 *       required:
 *         - id_kostumer
 *         - id_car
 *         - lama_sewa
 *         - total_harga
 *         - awal_sewa
 *         - akhir_sewa
 *         - tanggal_pengembalian
 *         - status
 *       properties:
 *         id_kostumer:
 *           type: integer
 *           description: The id customer of remt
 *         id_car:
 *           type: integer
 *           description: The id car of rent
 *         lama_sewa:
 *           type: string
 *           description: The long day of rent  
 *         total_harga:
 *           type: string
 *           description: The total amount of rent
 *         awal_sewa:
 *           type: date
 *           description: The beginnin of lease rent
 *         akhir_sewa:
 *           type: date
 *           description: The end of lease rent
 *         tanggal_pengembalian:
 *           type: date
 *           description: The return date of rent
 *         status:
 *           type: integer
 *           description: The status of rent
 * @swagger
 * tags:
 *   name: Authentication Admin
 *   description: The Authentication Admin managing API
 * /login/admin:
 *   post:
 *     summary: Login Admin
 *     tags: [Authentication Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Authentication Admin'
 *     responses:
 *       200:
 *         description: The Login Admin.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Authentication Admin'
 *       500:
 *         description: Some server error
 * @swagger
 * tags:
 *   name: Authentication Customer
 *   description: The Authentication Customer managing API
 * /login:
 *   post:
 *     summary: Login Customer
 *     tags: [Authentication Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Authentication Customer'
 *     responses:
 *       200:
 *         description: The Login Customer.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Authentication Customer'
 *       500:
 *         description: Some server error
 * @swagger
 * tags:
 *   name: Admin
 *   description: The Admin Managing API
 * /admins:
 *   get:
 *     summary: Lists all the Admin
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: The list of the Admin
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *   post:
 *     summary: Insert Admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: The Login Admin.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Some server error
 * @swagger
 *  /count-data:
 *   get:
 *     summary: Count All Table
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: The list of the Admin
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 * 

 * /admins/{id}:
 *   get:
 *     summary: Get the admin by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin id
 *     responses:
 *       200:
 *         description: The admin response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: The admin was not found
 *   put:
 *    summary: Update the admin by the id
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The admin id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Admin'
 *    responses:
 *      200:
 *        description: The admin was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *      404:
 *        description: The admin was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the admin by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin id
 *
 *     responses:
 *       200:
 *         description: The admin was deleted
 *       404:
 *         description: The admin was not found
* @swagger
 * tags:
 *   name: Customer
 *   description: The Kostumer Managing API
 * /kostumers:
 *   get:
 *     summary: Lists all the Kostumer
 *     tags: [Customer]
 *     responses:
 *       200:
 *         description: The list of the Customer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *   post:
 *     summary: Insert Customer
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: The Login Customer.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 * 
 * @swagger
 * /kostumer-delete/{id}:
 *   delete:
 *     summary: Remove the Customer by id
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Customer id
 *
 *     responses:
 *       200:
 *         description: The Customer was deleted
 *       404:
 *         description: The Customer was not found
 * 
* @swagger
 * tags:
 *   name: Car
 *   description: The car Managing API
 * /cars:
 *   get:
 *     summary: Lists all the car
 *     tags: [Car]
 *     responses:
 *       200:
 *         description: The list of the car
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *   post:
 *     summary: Insert car
 *     tags: [Car]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: The insert car.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       500:
 *         description: Some server error
 * 
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Get the car by id
 *     tags: [Car]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car id
 *     responses:
 *       200:
 *         description: The car response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: The car was not found
 *   put:
 *    summary: Update the car by the id
 *    tags: [Car]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The car id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Car'
 *    responses:
 *      200:
 *        description: The car was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Car'
 *      404:
 *        description: The car was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the car by id
 *     tags: [Car]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car id
 *
 *     responses:
 *       200:
 *         description: The car was deleted
 *       404:
 *         description: The car was not found
* @swagger
 * tags:
 *   name: Rent
 *   description: The rent Managing API
 * /data-sewa:
 *   get:
 *     summary: Lists Rental Data Only
 *     tags: [Rent]
 *     responses:
 *       200:
 *         description: The list of the car
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rent'
 * /data-booking:
 *   get:
 *     summary: Lists Rental Data With Customer and Car
 *     tags: [Rent]
 *     responses:
 *       200:
 *         description: The list of the car
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rent'
 * /sewamobil:
 *   post:
 *     summary: Insert Rent Rent
 *     tags: [Rent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rent'
 *     responses:
 *       200:
 *         description: The insert Rent.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rent'
 *       500:
 *         description: Some server error
 * 
 * /data-sewa/{id}:
 *   get:
 *     summary: Rent Car By Customer
 *     tags: [Rent]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: string
 *         required: true
 *         description: The Customer id
 *     responses:
 *       200:
 *         description: The list of the car
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rent'
 */

import express from "express";
import {
  getAdmin,
  insertAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getCount,
  deleteKostumer,
  getAllBooking,
} from "../controllers/Admin.js";
import {
  getCar,
  insertCar,
  getCarById,
  deleteCar,
  updateCar,
  getCarBySlug,
  getCarByStatus,
} from "../controllers/Car.js";
import { upload, uploadSupir } from "../middleware/upload.js";
import {
  loginAdmin,
  logout,
  loginUser,
  resetPassword,
  verifyToken,
} from "./auth.js";
import {
  changePassword,
  editMyProfile,
  getKostumer,
  insertKostumer,
  sendVerifikasiEmail,
  verifikasiEmail,
} from "../controllers/Kostumer.js";
import {
  addSewa,
  createPayment,
  sewaKostumer,
  updateStatusSewa,
  getAllSewa,
} from "../controllers/Sewa.js";
import { insertPromo } from "../controllers/Promo.js";

const router = express.Router();

//Route Auth
router.post("/login/admin", loginAdmin);
router.post("/login", loginUser);
router.post("/logout", logout);

//Route Promo

router.post("/promo", insertPromo);

//Route Admin
router.get("/admins", getAdmin);
router.post("/admins", insertAdmin);
router.get("/admins/:id", getAdminById);
router.put("/admins/:id", updateAdmin);
router.delete("/admins/:id", deleteAdmin);
router.get("/count-data", getCount);
router.delete("/kostumer-delete/:id", deleteKostumer);
router.get("/data-booking", getAllBooking);

//Route Sewa
router.post("/sewamobil", addSewa);
router.get("/data-sewa/:id_kostumer", sewaKostumer);
router.put("/status-sewa/:id_car", updateStatusSewa);
router.get("/data-sewa", getAllSewa);

//Route Pembayaran
router.post("/create-payment", createPayment);

//Route Kostumer
router.get("/kostumers", getKostumer);
router.post("/kostumers", insertKostumer);
router.post("/verifikasi", verifikasiEmail);
router.post("/sendverifikasi", sendVerifikasiEmail);
router.post("/resetpassword", resetPassword);
router.get("/kostumername", verifyToken, (req, res) => {
  const {
    id,
    nama_lengkap,
    username,
    email,
    alamat,
    whatsapp,
    ktp,
    jenis_kelamin,
  } = req.kostumer;
  res.json({
    id,
    nama_lengkap,
    username,
    email,
    alamat,
    whatsapp,
    ktp,
    jenis_kelamin,
  });
});
router.post("/changepassword", changePassword);
router.post("/updateprofile", editMyProfile);

//Route Car
router.get("/cars", getCar);
router.post("/cars", upload.single("image"), insertCar);
router.get("/cars/:id", getCarById);
router.delete("/cars/:id", deleteCar);
router.put("/cars/:id", upload.single("image"), updateCar);
router.get("/cars-slug/:slug", getCarBySlug);
router.get("/carbystatus", getCarByStatus);

// //Router Supir
// router.get('/supirs', getSupir);
// router.post('/supirs', uploadSupir.single('foto'), insertSupir)

export default router;
