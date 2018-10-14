const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/Users');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.post('/sign-up', (req, res, next) => {
    const {firstname, lastname, email, password} = req.body;

    bcrypt.hash((password), 10).then((hash) => {
        const user = new User({
            firstname,
            lastname,
            email,
            password: hash
        });

        const promise = user.save();
        promise.then((data) => {
            console.log(data);
            res.json(data)
        }).catch((err) => {
            res.json(err);
        });
    });
});

router.post('/sign-in', (req, res) => {
    const {email, password} = req.body;

    User.findOne({
        email
    }, (err, user) => {
        if(err)
            throw err;

        if(!user){
            res.json({
                status: false,
                message: 'User not found.'
            });
        }else{
            bcrypt.compare(password, user.password).then((result) => {
                if(!result){
                    res.json({
                        status: false,
                        message: 'Wrong password.'
                    });
                }else{
                    const payload = {
                        email
                    };
                    const token = jwt.sign(payload, req.app.get('api_secret_key'),{
                        expiresIn: 5260 // 10 yıl
                    });

                    res.json({
                        status: true,
                        token
                    })
                }
            });
        }
    });
});

module.exports = router;
