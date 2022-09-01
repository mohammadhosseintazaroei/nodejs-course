const { TaskModel } = require('../models/tasks')

async function getAllTask(req, res, next) {
    try {
        const userID = req.user._id;

        const tasks = await TaskModel.find({ user: userID }).sort({ _id: -1 });
        return res.status(200).json({
            status: 200,
            success: true,
            tasks
        })
    } catch (error) {
        next(error)
    }
}
async function createTask(req, res, next) {
    try {
        const { title, text, category, user = req.user._id, status = "pending" } = req.body;
        const result = await TaskModel.create({
            title,
            text,
            category,
            user,
            status,
            expiresIn: Date.now() + (1000 * 60 * 60 * 24 * 30),
        })
        console.log(result);
        if (!result) throw { status: 500, message: 'آیتم ثبت نشد' }
        return res.status(201).json({
            status: 201,
            success: true,
            message: "ثبت ذخیره تسک با موفقیت انجام شد"
        })
    } catch (error) {
        next(error)
    }
}
async function getTaskById(req, res, next) {
    try {
        const userID = req.user._id;
        const taskID = req.params.id;
        const task = await TaskModel.findOne({ user: userID, _id: taskID });
        if (!task) throw { status: 404, message: "آیتم مورد نظر یافت نشد" }
        return res.status(200).json({
            status: 200,
            success: true,
            task
        })
    } catch (error) {
        next(error)
    }
}
async function updateTask(req, res, next) {
    try {
        const { id : _id} = req.params;
        const user = req.user._id;
        const task = await TaskModel.findOne({ _id, user });
        if (!task) throw { status: 404, message: "تسکی یافت نشد" };
        const data = { ...req.body };
        Object.entries(data).forEach(([key, value]) => {
            if (!value || ["", " ", ".", null, undefined].includes(value) || value.length < 3) {
                delete data[key]
            }
            if (!['title', 'text', 'category'].includes(key)) {
                delete data[key]
            }
        })
        const updateTaskResult = await TaskModel.updateOne({ _id }, { $set: data })
        if(updateTaskResult.modifiedCount > 0 ) {
            return res.status(200).json({
                status:200 , 
                success: true ,
                message:"به روز رسانی با موفقیت انجام شد"
            })
        }
        throw { status: 400 , message : "به روزرسانی انجام نشد"}
    } catch (error) {
        console.log(error);
        next(error)
    }
}
async function removeTaskById(req, res, next) {
    try {
        const { id: _id } = req.params;
        const userID = req.user._id;
        const task = await TaskModel.findOne({ _id, userID })
        if (!task) throw { status: 404, message: 'تسکی یافت نشد' };
        if (removeResult.deletedCount > 0) {
            return res.json({
                status: 200, success: true, message: "حذف تسک با موفقیت انجام شد"
            })
        }
        throw { status: 500, message: "حذف تسک انجام نشد" }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllTask, createTask, getTaskById, updateTask, removeTaskById,
}