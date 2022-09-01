const { getAllTask, createTask, getTaskById, updateTask, removeTaskById } = require('../controllers/tasks.controller');

const router = require('express').Router()
router.get('/', getAllTask)
router.post('/create', createTask)
router.get('/:id', getTaskById)
router.put('/update/:id', updateTask)
router.delete('/remove/:id', removeTaskById)

module.exports = router
