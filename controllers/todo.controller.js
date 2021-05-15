const TodoModel = require('../model/todo.model')

exports.createTodo = async (req, res, next) => {
  try {
    const createdModel = await TodoModel.create(req.body)
    return res.status(201).json(createdModel)
  } catch(err) {
    console.error('something went wrong with todo.controller')
    console.error(err)
  }
}