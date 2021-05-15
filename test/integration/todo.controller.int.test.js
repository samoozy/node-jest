const supertest = require('supertest')
const app = require('../../app')
const newTodo = require('../mock-data/new-todo.json')

const endpointUrl = '/todos/'

describe(endpointUrl, () => {
  it('Should send post request to /todos', async () => {
    jest.setTimeout(15000)

    const response = await supertest(app)
      .post(endpointUrl)
      .send(newTodo)

    expect(response.statusCode).toBe(201)
    expect(response.body.title).toBe(newTodo.title)
    expect(response.body.done).toBe(newTodo.done)
  })
})