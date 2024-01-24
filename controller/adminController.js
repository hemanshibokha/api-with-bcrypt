console.log("Admin Controller Connected");
const adminSchema = require('../model/adminSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerData = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (req.file) {
            const hashedPassword = await bcrypt.hash(password, 10);
            let exitUser = await adminSchema.findOne({ email });
            if (exitUser) {
                return res.json({ message: 'User already Registered', status: 0 });
            }
            else {
                const insertData = await adminSchema.create({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    role: role,
                    image: req.file.path
                })
                if (insertData.role == 'admin') {
                    return res.json({ message: 'Admin Registered', status: 1 });
                }
                else if (insertData.role == 'user') {
                    return res.json({ message: 'user Registered', status: 1 });
                }
                else {
                    return res.json({ message: 'something wrong while registerData', status: 0 });
                }
            }
        }
        else {
            return res.json({ message: 'Image not Fetch', status: 0 });
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const loginData = async (req, res) => {
    try {
        const { email, password } = req.body;
        let loginRecord = await adminSchema.findOne({ email: email });
        bcrypt.compare(password , loginRecord.password).then(function(result){
            if(result){
                const Token = jwt.sign({ payload: loginRecord }, 'hemanshi', { expiresIn: '1hr' });
                console.log(Token);
                return res.json({ token: Token });
            }
            else{
                return res.json({ message: 'check youe email or password', status: 0 });
            }
        })
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const viewData = async (req, res) => {
    try {
        let viewRecord = await adminSchema.find({});
        if (viewRecord) {
            return res.json({ message: viewRecord, status: 1 });
        }
        else {
            return res.json({ message: 'Record not Fetch', status: 0 });
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    registerData,
    loginData,
    viewData
}