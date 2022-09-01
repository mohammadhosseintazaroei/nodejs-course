const { userRegister, userLogin } = require('../controllers/auth.controller');
const { UserModel } = require('../models/users');
const jwt = require("jsonwebtoken")
const router = require('express').Router();
router.post('/register', userRegister)
router.post('/login', userLogin);
router.post('/reset-password', (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
})
module.exports = router
