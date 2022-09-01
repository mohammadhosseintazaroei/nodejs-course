const { UserModel } = require('../models/users')
const { hashString } = require('../modules/utils')
const { isValidObjectId } = require('mongoose');
const { json } = require('express');
const path = require('path')

async function createUser(req, res, next) {
    try {
        const { username, password, email, mobile } = req.body;
        let user;
        const mobileRegex = /(\+?)(\d{1,2})?([-\s]?)(0?)(9[1-9]{2})([-\s]?)(\d{3})([-\s]?)(\d{4})/;
        const emailRegex = /^[sssA-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        // if (!mobileRegex.test(mobile)) throw { status: 400, message: 'شماره موبال وارد شده صحیح نمیباشد ' }
        // if (!emailRegex.test(email)) throw { status: 400, message: 'ایمیل وارد شده صحیح نمیباشد' }

        user = await UserModel.findOne({ username });
        if (user) throw { status: 400, message: 'نام کاربری تکراری میباشد' }

        user = await UserModel.findOne({ email });
        if (user) throw { status: 400, message: 'ایمیل تکرای میباشد' }

        user = await UserModel.findOne({ mobile });
        if (user) throw { status: 400, message: 'شماره موبایل تکرای میباشد' }

        if (password.length < 6 || password.length > 16) throw { status: 400, message: 'پسورد باید کمتر از 1 و بیشتر از 16 باشد' }
        const hashPassword = hashString(password)
        const userCreateResult = await UserModel.create({
            username,
            password: hashPassword,
            email,
            mobile
        })

        if (userCreateResult) {
            return res.json(userCreateResult)
        }
        throw { status: 500, message: 'ایجاد کاربر ایجاد نشد' }
    } catch (error) {
        next(error)
    }
}
async function listOfUser(req, res, next) {
    try {
        const users = await UserModel.find({}, { password: 0, createdAt: 0, updatedAt: 0, __v: 0 }).sort({ _id: -1 })
        return res.json(users)

    } catch (error) {
        next(error)
    }
}
async function getUserById(req, res, next) {
    try {
        const { id } = req.params
        if (!isValidObjectId(id)) throw { status: 400, message: 'شناسه کاربر را به درستی وارد کنید' }
        const user = await UserModel.findOne({ _id: id }, { password: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        if (!user) throw { status: 404, message: 'کاربری یافت نشد' }
        console.log(req.get('host'));
        user.profile_image = req.protocol + "://" + req.get('host') + user.profile_image.replace(/[\\\\]/gm, '/')
        return res.json(user)
    } catch (error) {
        next(error)
    }
}
async function deleteUserById(req, res, next) {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) throw { status: 400, message: 'شناسه کاربر را به درستی وارد کنید' }
        const user = await UserModel.findById(id);
        if (!user) throw { status: 400, message: 'کاربری با این مشخصات یافت نشد' }
        const result = await UserModel.deleteOne({ _id: id })
        if (result.deletedCount > 0) return res.json({ status: 200, success: true, message: "کاربر با موفقیت خذف شد" })
        throw { status: 500, message: "کابر حذف نشد" }
    } catch (error) {
        next(error)
    }
}
async function updateUserById(req, res, next) {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) throw { status: 400, message: 'شناسه کاربر را به درستی وارد کنید' }
        const userFindResult = await UserModel.findById(id);
        if (!userFindResult) throw { status: 400, message: 'کاربری با این مشخصات یافت نشد' }

        const { username, email, mobile } = req.body;
        let data = { ...req.body }
        let user;
        const mobileRegex = /(\+?)(\d{1,2})?([-\s]?)(0?)(9[1-9]{2})([-\s]?)(\d{3})([-\s]?)(\d{4})/;
        const emailRegex = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (mobile && !mobileRegex.test(mobile)) throw { status: 400, message: 'شماره موبال وارد شده صحیح نمیباشد ' }
        if (email && !emailRegex.test(email)) throw { status: 400, message: 'ایمیل وارد شده صحیح نمیباشد' }
        user = await UserModel.findOne({ username });
        if (user) throw { status: 400, message: 'نام کاربری تکراری میباشد' }
        user = await UserModel.findOne({ email });
        if (user) throw { status: 400, message: 'ایمیل تکرای میباشد' }
        user = await UserModel.findOne({ mobile });
        if (user) throw { status: 400, message: 'شماره موبایل تکرای میباشد' }

        Object.entries(data).forEach(([key, value]) => {
            if (!value || ["", " ", ".", null, undefined].includes(value) || value.length < 3) {
                delete data[key]
            }
            if (!['username', 'email', ' mobile'].includes(key)) {
                delete data[key]
            }
        })
        const result = await UserModel.updateOne({ _id: id }, {
            ...data
        })
        if (result.modifiedCount > 0) return res.json({ status: 200, success: true, message: "کاربر با موفقیت بروزرسانی شد" })
        throw { status: 500, message: "کابر بروزرسانی نشد" }
    } catch (error) {
        next(error)
    }
}
async function uploadProfileImage(req, res, next) {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) throw { status: 400, message: 'شناسه ارسال شده صحیح نمیباشد' }
        const prefixPath = path.join(__dirname, "../public");
        let image;
        if (req.file) {
            image =  req.file.path.substring(prefixPath.length);
        } else {
            throw { status: 400, message: 'لطفا یک فایل را انتخاب کنید' }
        }
        console.log(image);
        const result = await UserModel.updateOne({ _id: id }, { $set: { profile_image: image } });
        if (result.modifiedCount <= 0) throw { status: 400, message: 'بروزرسانی اتفاق نیفتاد' }

        return res.json({
            file: JSON.stringify(req.files)
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createUser, listOfUser, getUserById, deleteUserById, updateUserById, uploadProfileImage
}