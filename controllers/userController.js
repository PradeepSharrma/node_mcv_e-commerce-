const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const configs = process.env;
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

const res = require('express/lib/response');
const fs = require('fs');

const sequrePassword = async (password) => {
    try {
        // const passwordHas = await bcryptjs.hash(password, 10);
        const passwordHas = await bcryptjs.hash(password, 10);
        return passwordHas;

    } catch (error) {
        res.status(400).send(error.message)
    }
}

const create_token = async (id) => {
    try {
        const token = await jwt.sign({ _id: id }, config.secret_jwt);
        // const token = await jwt.sign({ _id: id }, process.env.TOKEN_KEY);
        return token;


    } catch (error) {
        res.status(400).send(error.message)
    }
}

const sendPasswordMail = async (name, email, token) => {
    try {
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: config.emailUser,
                pass: config.emailPassword,
            },
        });

        const mailOption = {
            from: config.emailUser,
            to: email,
            subject: " For reset password ",
            html: '<p> Hiii ' + name + ' plz coy this link and <a href="http://127.0.0.1:8080/api/reset-password?token=' + token + '"> reset your password </a>'
        }

        transport.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("mail has been sent ", info.response)
            }
        });

    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
}

const register_user = async (req, res) => {
    try {

        const spassword = await sequrePassword(req.body.password)

        var user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            image: req.file.filename,
            password: spassword,
            type: req.body.type,
        });

        const userData = await User.findOne({ email: req.body.email });

        if (userData) {
            res.status(401).send({
                success: false,
                message: "This email is already exists .",
            })

        } else {
            const user_data = await user.save();
            res.status(200).send({
                success: true,
                message: "Record has beed saved successfully .",
                data: user_data
            })
        }
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
}

//  Login user 
const user_login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({ email: email });
        if (userData) {
            const passwordMatch = await bcryptjs.compare(password, userData.password);

            if (passwordMatch) {
                const tokenData = await create_token(userData._id);
                const userResult = {
                    _id: userData._id,
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    image: userData.password,
                    image: userData.image,
                    type: userData.type,
                    token: tokenData,
                };
                const responce = {
                    success: true,
                    message: "User details",
                    data: userResult
                }
                res.status(200).send(responce)
            } else {
                res.status(200).send({
                    success: false,
                    message: "Login details are incorrect .",
                })
            }


        } else {
            res.status(200).send({
                success: false,
                message: "Login details are incorrect .",
            })

        }
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }


}

//  update password 
const update_password = async (req, res) => {
    try {

        const user_id = req.body.user_id;
        const password = req.body.new_password;

        const data = await User.findOne({ _id: user_id });  // change password by id 

        //  take user user id from token , 
        const usertoken = req.headers['authorization'];
        const token = usertoken.split(' ');
        const decoded = jwt.verify(token[1], config.secret_jwt);
        var userId = decoded._id;
        // ==================================

        if (data) {
            const new_password = await sequrePassword(password);
            // const userData = await User.findByIdAndUpdate({_id:user_id},
            const userData = await User.findByIdAndUpdate({ _id: userId },
                {
                    $set: { password: new_password }
                }
            );

            res.status(200).send({
                success: true,
                message: "Password has been update successfully .",
            })

        }

        else {
            res.status(200).send({
                success: false,
                message: "User id does not match .",
            })
        }

    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
}

const forgot_password = async (req, res) => {
    try {
        const email = req.body.email;
        const userData = await User.findOne({ email: email });
        if (userData) {
            const randomString = randomstring.generate();

            const data = await User.updateOne({ email: email }, { $set: { token: randomString } });
            // sendPasswordMail(userData.name, userData.email, randomString);

            res.status(200).send({
                success: true,
                message: "Mail has been sent your email id  .",
            })
        }
        else {
            res.status(200).send({
                success: false,
                message: "This emai does not exists .",
            })
        }
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
}

const reset_password = async (req, res) => {
    try {

        const token = req.query.token;
        const tokenData = await User.findOne({ token: token });
        // res.status(200).send(tokenData);

        if (tokenData) {
            const password = req.body.password;

            const newPassword = await sequrePassword(password);
            // res.status(200).send(newPassword);
            const userData = await User.findByIdAndUpdate({ _id: tokenData._id }, { $set: { password: newPassword, token: '' } }, { new: true });
            // const userData = await User.findByIdAndUpdate({ _id:tokenData._id },{ $set: { password: newPassword}},{new:true});

            res.status(200).send({
                success: true,
                message: "Password has been update successfully .",
                data: userData
            });
        }

        else {
            res.status(200).send({
                success: false,
                message: "Token does not match .",
            })
        }

    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
};

const renew_token = async (id) => {
    try {
        const secret_jwt =  config.secret_jwt;
        const newSecretJwt = randomstring.generate();

        fs.readFile('config/config.js','utf-8', function(err , data){
            if(err) throw err;
          var newValue =  data.replace(new RegExp(secret_jwt,"g"), newSecretJwt);
          fs.writeFile('config/config.js', newValue,'utf-8',function(err, data){
            if(err) throw err;
            console.log('Done');
          });
        });

        const token = await jwt.sign({ _id: id }, config.secret_jwt);
        return token;
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
}

const refresh_token = async (req, res) => {
    try {
        // const user_id = req.body.user_id;
        // const password = req.body.new_password;
        // const data = await User.findOne({ _id: user_id });  // change password by id 

        //  take user user id from token , 
        const usertoken = req.headers['authorization'];
        const token = usertoken.split(' ');
        const decoded = jwt.verify(token[1], config.secret_jwt);
        var userId = decoded._id;

        const data = await User.findById(userId);
        if (data) {
            const tokenData = await renew_token(userId);
            const responce = {
                user_id: userId,
                token: tokenData
            }
            res.status(200).send({
                success: true,
                message: "This is refresh token .",
                data: responce
            });
        } else {
            res.status(200).send({
                success: true,
                message: "User not found ."
            });
        }

    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
}

module.exports = {
    register_user,
    user_login,
    update_password,
    forgot_password,
    reset_password,
    refresh_token
}
