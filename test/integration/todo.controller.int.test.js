const supertest = require('supertest')
const app = require('../../app')
const newTodo = require('../mock-data/new-todo.json')
const mongoose = require('mongoose')
const { request } = require('express')

const endpointUrl = '/todos/'
const testData = {title: 'Make integration test for PUT', done: true}
const nonExistingTodoId = '60a1d23ba239bcb115d2b7a9'
let firstTodo, newTodoId

/**
 * Integration Test
 */
describe(endpointUrl, () => {

  /**
   * GET request
   */
  test('Get /todos/', async () => {
    const response = await supertest(app).get(endpointUrl)

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body[0].title).toBeDefined()
    expect(response.body[0].done).toBeDefined()

    firstTodo = response.body[0]
  })


  /**
   * GET by id
   */
  test('Get by id /todos/:todoId', async () => {
    const response = await supertest(app).get(endpointUrl + firstTodo._id)
    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe(firstTodo.title)
    expect(response.body.done).toBe(firstTodo.done)
  })
  test('Get todo by id doesnt exist /todos/:todoId', async () => {
    const response = await supertest(app).get(endpointUrl + nonExistingTodoId)
    expect(response.statusCode).toBe(404)
  })



  /**
   * POST request
   */
  it('Should send post request to /todos', async () => {

    const response = await supertest(app)
      .post(endpointUrl)
      .send(newTodo)

    expect(response.statusCode).toBe(201)
    expect(response.body.title).toBe(newTodo.title)
    expect(response.body.done).toBe(newTodo.done)

    newTodoId = response.body._id
  })
  it('Should return error 500 malformed data with POST /todos', async () => {

    const response = await supertest(app)
      .post(endpointUrl)
      .send({title: "Missing done property"})

    expect(response.statusCode).toBe(500)
    expect(response.body).toStrictEqual({message:'Todo validation failed: done: Path `done` is required.'})
  })

  /**
   * PUT request
   */
  it('PUT /todos/:todoId', async () => {
    const response = await supertest(app)
      .put(endpointUrl + newTodoId)
      .send(testData)
    
    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe(testData.title)
    expect(response.body.done).toBe(testData.done)
  })


  /**
   * DELETE request
   */
  test('HTTP delete', async () => {
    const response = await supertest(app).delete(endpointUrl + newTodoId).send()

    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe(testData.title)
    expect(response.body.done).toBe(testData.done)
  })

  test('HTTP DELETE 404', async () => {
    const response = await supertest(app).delete(endpointUrl + nonExistingTodoId).send()
    
    expect(response.statusCode).toBe(404)
  })



  // test teardown
  afterAll(() => {
    mongoose.connection.close()
  })
})