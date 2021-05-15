const TodoController = require('../../controllers/todo.controller')
const TodoModel = require('../../model/todo.model')
const httpMocks = require('node-mocks-http')
const newTodo = require('../mock-data/new-todo.json')

TodoModel.create = jest.fn()

let req, res, next
beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = null
})

describe('TodoController.createTodo', () => {
  beforeEach(() => {
    req.body = newTodo
  })

  it('Should have a createTodo function', () => {
    expect(typeof TodoController.createTodo).toBe('function')
  })
  it('Should call TodoModel.create', () => {
    TodoController.createTodo(req, res, next)
    expect(TodoModel.create).toBeCalledWith(newTodo)
  })
  it('Should return 201 response code', async () => {
    await TodoController.createTodo(req, res, next)
    expect(res.statusCode).toBe(201)
    expect(res._isEndCalled()).toBeTruthy()
  })
  it('Should return json body in response', async () => {
    TodoModel.create.mockReturnValue(newTodo)
    await TodoController.createTodo(req,res,next)
    expect(res._getJSONData()).toStrictEqual(newTodo)
  })
})