const mongoose = require('mongoose');
const Task = require('../modals/tasks');
const { ObjectId } = require('mongodb');
const { options } = require('../routes/tasks');
const asyncWrapper = require('../middleware/async');
const { creeCostumError } = require('../error/costum-error');
// controllers : 

const getAllTasks = asyncWrapper(async (req, res, next) => {
    const allTasks = await Task.find({})
    res.status(200).json({ tasks: allTasks, sucsess: true });
})

const createTask = asyncWrapper(async (req, res, next) => {
    const task = await Task.create(req.body)
    res.status(201).json({ sucsess: true, task });
}
)
const getSingleTask = asyncWrapper(async (req, res, next) => {


    let { id: taskId } = req.params;
    const taskById = await Task.findOne({ _id: taskId }).exec();
    if (!taskById) {
        return next(creeCostumError(`No task with this Id : ${taskId}`, 404))
    }
    res.status(200).json({ task: taskById, sucsess: true })
})

const updateTask = asyncWrapper(async (req, res, next) => {
    const { id: taskUpdateId } = req.params;
    const updates = req.body;


    const task = await Task.findOneAndUpdate({ _id: taskUpdateId }, updates,
        {
            runValidators: true,
            new: true
        }).exec();
    if (!task) {
        return next(createCustomError(`No task with this Id : ${taskUpdateId}`, 404))
    }

    res.status(200).json({ task, sucsess: true });


})

const deleteTask = asyncWrapper(async (req, res, next) => {
    let { id: taskDeleteId } = req.params;
    const taskById = await Task.findOneAndDelete({ _id: taskDeleteId }).exec();
    if (!taskById) {
        return next(createCustomError(`No task with this Id : ${taskUpdateId}`, 404))
    }
    res.status(200).json({ task: taskById, sucsess: true });
}
)

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
}