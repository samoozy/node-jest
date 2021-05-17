const TodoModel = require('../model/todo.model')

exports.createTodo = async (req, res, next) => {
  try {
    const createdModel = await TodoModel.create(req.body)
    res.status(201).json(createdModel)
  } catch(err) {
    next(err)
  }
}

exports.getTodos = async (req, res, next) => {
  try {
    const getTodos = await TodoModel.find()
    res.status(201).json(getTodos)
  } catch(err) {
    next(err)
  }
}