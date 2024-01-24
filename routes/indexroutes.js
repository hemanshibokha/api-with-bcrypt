console.log("Routes Connected");
const express = require('express');
const routes = express.Router();
const multer = require('multer');
const {verifyToken} = require('../config/passport-jwt');
const {checkRole} = require('../config/passport-jwt');
const {userRole} = require('../config/passport-jwt');

const fileUploads = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null,'./uploads')
    },
    filename : (req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
    }
})

const imageUploads = multer({storage : fileUploads}).single('image');

const adminController = require('../controller/adminController');

routes.post('/registerData',imageUploads,adminController.registerData);
routes.post('/loginData',adminController.loginData);
routes.get('/viewData',verifyToken,userRole('user'),adminController.viewData);

module.exports = routes;