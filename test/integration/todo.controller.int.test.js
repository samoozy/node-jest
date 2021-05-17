const supertest = require('supertest')
const app = require('../../app')
const newTodo = require('../mock-data/new-todo.json')
const mongoose = require('mongoose')
const { request } = require('express')

const endpointUrl = '/todos/'

describe(endpointUrl, () => {
  test('Get /todos/', async () => {
    const response = await supertest(app).get(endpointUrl)

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body[0].title).toBeDefined()
    expect(response.body[0].done).toBeDefined()
  })

  it('Should send post request to /todos', async () => {

    const response = await supertest(app)
      .post(endpointUrl)
      .send(newTodo)

    expect(response.statusCode).toBe(201)
    expect(response.body.title).toBe(newTodo.title)
    expect(response.body.done).toBe(newTodo.done)
  })
  it('Should return error 500 malformed data with POST /todos', async () => {

    const response = await supertest(app)
      .post(endpointUrl)
      .send({title: "Missing done property"})

    expect(response.statusCode).toBe(500)
    expect(response.body).toStrictEqual({message:'Todo validation failed: done: Path `done` is required.'})
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})