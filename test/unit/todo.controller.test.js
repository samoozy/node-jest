const TodoController = require('../../controllers/todo.controller')
const TodoModel = require('../../model/todo.model')
const httpMocks = require('node-mocks-http')
const newTodo = require('../mock-data/new-todo.json')

TodoModel.create = jest.fn()

let req, res, next
beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})


describe('TodoController.getTodos', () => {
  it('Should have a getTodos function', () => {
    expect(typeof TodoController.getTodos).toBe('function')
  })
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
  it('Should handle errors', async () => {
    const errorMessage = { message: "Done property missing" }
    const rejectedPromise = Promise.reject(errorMessage)

    TodoModel.create.mockReturnValue(rejectedPromise)
    await TodoController.createTodo(req, res, next)
    
    expect(next).toBeCalledWith(errorMessage)
  })
})