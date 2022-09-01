const router = require('express').Router()
const userRouter = require("./users")
const authRouter = require("./auth")
const taskRoutes = require("./tasks")
const { autoLogin } = require('../middlewares/checkLogin')


router.use("/users", userRouter)
router.use("/auth", authRouter)
router.use("/tasks",autoLogin,  taskRoutes)



module.exports = router