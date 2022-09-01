const router = require('express').Router()
const { default: axios } = require('axios')
const { createUser, listOfUser, getUserById, deleteUserById, updateUserById, uploadProfileImage } = require('../controllers/user.controller')
const { autoLogin } = require('../middlewares/checkLogin')
const { upload } = require('../modules/utils')

router.get('/profile', autoLogin,  (req, res, next) => {
// console.log(req.isLogin);
    return res.json({ user: req.user })
})
router.get('', listOfUser)
router.post('/create', createUser)
router.get('/:id', getUserById)
router.delete('/:id', deleteUserById)
router.put('/:id', updateUserById)
router.put('/:id', upload.single("image"), uploadProfileImage)



module.exports = router;