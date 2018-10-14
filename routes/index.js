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

module.exports = router;
