import {beforeEach, describe, test} from 'node:test'
import assert from 'node:assert/strict'
import {v4 as uuidv4} from 'uuid'
import {
    getAllTodo, 
    getTodoByState, 
    postTodo, 
    delByID, 
    delAll,
    getTodoById,
    putTodo,
    todos
 } from '../src/services/todos.js' 

const newTodo = {}

describe ('Tests \"/todos\" endpoint functions:', () => {
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
    test('\"postTodo\" function should increase a \"todos\" list by 1 item', () =>{
        const todoListBefore = todos.length
        postTodo(newTodo)
        const todoListAfter = todos.length
        assert.strictEqual(todoListAfter - todoListBefore, 1)
    })
    test('\"putTodo\" function should update \"title\" property of a task', () =>{
        const todoItemBefore = todos[0].title
        putTodo(todos[0].id, newTodo)
        const todoItemAfter = todos[0].title
        assert.notStrictEqual(todoItemBefore, todoItemAfter)
    })
    test('\"getTodoById\" function should throw error status 404, if a Task not found', () =>{
        const id = uuidv4()
        assert.throws(() => getTodoById(id), (error) => {
            assert.strictEqual(error.status, 404)
            return true
            }
        )
    })
    test('\"getTodoByState\" function should throw error with \"invalid state-parameter\" description, when a state is invalid', 
        () => {
            const wrongState = "invalid"
            assert.throws(() => getTodoByState(wrongState), (error) => {
                assert.match(error.message, /invalid state-parameter/i)
                return true
            }) 
        }
    )
    test('\"delByID\" function should delete a Task by id', () => {
            const allTodos = getAllTodo()
            const todoToDel = allTodos[0]
            delByID(allTodos[0].id)
            postTodo(newTodo)
            assert.notStrictEqual(todoToDel.id, todos[0].id)
        })
    test('\"delAll\" function message should contain \"deleted\"', () => {
            assert.match(delAll(), /deleted/i)
        })
})

