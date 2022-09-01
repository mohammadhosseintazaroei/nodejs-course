const bcrypt = require('bcrypt')
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const { SECRET_KEY, EXPIRES_IN } = require('../configs/constant');

function hashString(data) {
    const salt = bcrypt.genSaltSync(13);
    const hashed = bcrypt.hashSync(data, salt);
    return hashed;
}
function compareDataWithHash(data, hashedString) {
    return bcrypt.compareSync(data, hashedString);
}

function jwtTokenGenerator(payload, day = " 6") {
    // new Date().getDate()  + (1000*60*60*24*day) // expiresIn nth days
    const { username } = payload;
    return jwt.sign({ username }, SECRET_KEY, { expiresIn: EXPIRES_IN });
}
function verifyJwtToken(token) {
try {
    const result = jwt.verify(token, SECRET_KEY)
    if (!result?.username) throw { status: 401, message: 'ورود به حساب کاربری اننجام نشد مجددا اقدام کنید' }
    console.log(result);
    return result
} catch (error) {
    throw {status:401 , message : 'ورود به حساب کابری با خطا مواجه شد لطفا مجددا وارد حساب کابری خنود شوید'}
}
}
const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDay();
        const fileAddress = `${__dirname}/../public/uploads/images/${year}/${month}/${day}`
        require('fs').mkdirSync(fileAddress, { recursive: true })
        callback(null, fileAddress)
    },
    filename: (req, file, callback) => {
        const type = path.extname(file.originalname)
        callback(null, String(Date.now()) + type)
    },
})
const upload = multer({ storage })

module.exports = {
    hashString, upload, compareDataWithHash, jwtTokenGenerator,verifyJwtToken
}