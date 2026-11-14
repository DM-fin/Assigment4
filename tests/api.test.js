import {describe, test, beforeEach, afterEach} from 'node:test'
import assert from 'node:assert/strict'
import request from "supertest"
import app from "../src/app.js"
import { todos } from '../src/services/todos.js' 
import {v4 as uuidv4} from 'uuid'

const newTodo = {}

beforeEach(() => {
    todos.length = 0
    const now = new Date(Date.now()).toLocaleTimeString('en-FI')
    todos.push({
        "id": uuidv4(),
        "title": "Submit API assignment",
        "description": "Create own API server",
        "state": "todo",
        "dueDate": "17.11.2026",
        "createdAt": now,
        "modifiedAt": now
    })
    Object.assign(newTodo, {
        "title": "Refactor API assignment",
        "state": "todo"
    })
})

describe('post /todos', () => {
    test('responds with 201 and a json object with the same \"title\" as in the posted Task', async () => {
        const res = await request(app)
            .post('/todos')
            .expect("content-type", /json/i)
            .expect(201)
            .send(newTodo)
        assert.strictEqual(newTodo.title, res.body.title)
    })
})

describe('get /todos/:id', () => {
    test('responds with 404 if a todo not found', async () => {
        const res = await request(app)
            .get('/todos/${uuidv4()}')
            .expect(404)
    })
})
describe('get /todos/todos?state=todo', () => {
    test('responds with a json containing only \"todo\" Tasks', async () => {
        const res = await request(app)
            .get('/todos?state=todo')
            .expect("content-type", /json/i)
            .expect(200)
        assert.ok(!(res.body.find(item => item.state !== "todo")))
    })
})
describe('delete /todos', () => {
    test('responds with a text containing \"deleted\"', async () => {
        const res = await request(app)
            .delete('/todos')
            .expect("content-type", /text/i)
            .expect(200)
        assert.match(res.text, /deleted/i)
    })
})
describe('put /todos', () => {
    test('responds with a status 200 and a json object with a new \"title\"', async () => {
        const res = await request(app)
            .put(`/todos/${todos[0].id}`)
            .expect("content-type", /json/i)
            .expect(200)
            .send(newTodo)
        assert.strictEqual(res.body.title, newTodo.title)
    })
})