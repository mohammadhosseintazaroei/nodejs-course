const { UserModel } = require('../models/users')
const { hashString, compareDataWithHash, jwtTokenGenerator } = require('../modules/utils')

async function userRegister(req, res, next) {
    try {
        const { email, mobile, username, password, confirm_password } = req.body;
        let user;
        const mobileRegex = /(\+?)(\d{1,2})?([-\s]?)(0?)(9[1-9]{2})([-\s]?)(\d{3})([-\s]?)(\d{4})/;
        const emailRegex = /^[sssA-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        // if (!mobileRegex.test(mobile)) throw { status: 400, message: 'شماره موبال وارد شده صحیح نمیباشد ' }
        // if (!emailRegex.test(email)) throw { status: 400, message: 'ایمیل وارد شده صحیح نمیباشد' }
        if (password.length < 6 || password.length > 16) throw { status: 400, message: 'پسورد باید کمتر از 1 و بیشتر از 16 باشد' }
        if (password !== confirm_password) throw { status: 400, message: 'رمز عبور با تکرار ان یکسان نمیباشد' }
        user = await UserModel.findOne({ email })
        if (user) throw { status: 400, message: "ایمیل قبلا استفاده شده است" }
        user = await UserModel.findOne({ mobile })
        if (user) throw { status: 400, message: "شماره موبایل  قبلا استفاده شده است " }
        user = await UserModel.findOne({ username })
        if (user) throw { status: 400, message: "نام کاربری قبلا استفاده شده است " }


        const result = await UserModel.create({
            mobile, username, email, password: hashString(password)
        })
            .catch(error => {
                return res.status(500).json({
                    status: 500, message: "خطایی در ثبت نام رخداد"
                })
            })
        return res.status(201).json({
            status: 201,
            success: true,
            message: 'حساب کاربری شما با موفقیت ایجاد شد لطفا در بخش ورود وارد حساب کاربری خود شوید'
        })
    } catch (error) {
        next(error)
    }
}
async function userLogin(req, res, next) {
    try {
        const { username, password } = req.body;
        let user = await UserModel.findOne({ username })
        if (!user) throw { status: 401, message: " نام کاربری یا رمز عبور صحیح نمیباشد" }
        if (!compareDataWithHash(password, user.password)) throw { status: 401, message: "نام کاربری یا رمز عبور صحیح نمیباشد" }
        let token = jwtTokenGenerator(user)
        user.token = token;
        user.save()
        return res.status(200).json({
            status: 200,
            success: true,
            message: 'با موفقیت وارد حساب خود شدید',
            token
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    userRegister, userLogin
}