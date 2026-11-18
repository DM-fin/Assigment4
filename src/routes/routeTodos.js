import express from 'express'
// requires npm install uuid
import { v4 as uuidv4 } from 'uuid'
import {
    getAllTodo, 
    getTodoByState, 
    getTodoByStateCSV, 
    postTodo, 
    delByID, 
    delAll,
    getTodoById,
    putTodo
 } from '../services/todos.js' 

const router = express.Router()

// simulate the database

//let todos = []
//const todoStates = ["todo", "doing", "done"]

router.post('/', (req, res) => {
    try {
        const newTodo = postTodo(req.body)
        res.status(201).json(newTodo)
    } catch (error) {
        res.status(error.status).send(error.message)
    }
})
    
router.delete('/', (req, res) => {
    res.status(200).send(delAll())
})

router.delete('/:id', (req, res) => {
    try {
        res.status(200).send(delByID(req.params.id))
    } catch (error) {
        res.status(error.status).send(error.message)
    }
})

router.get('/', (req, res) => {
    const qState = req.query.state

    //console.log(qState)
    if (qState !== undefined) {
        try {
            if (req.accepts('json')) res.status(200).json(getTodoByState(qState))
                else res.type('text/csv').status(200).send(getTodoByStateCSV(qState))
        } catch (error){
            return res.status(error.status).
                send(error.message)
        }
    } else res.status(200).json(getAllTodo())
})

router.get('/:id', ( req, res ) => {
    try {
        res.status(200).json(getTodoById(req.params.id))
    } catch (error) {
        res.status(error.status).send(error.message)
    }
})

router.put('/:id', (req, res) => {
    try {
        res.status(200).json(putTodo(req.params.id, req.body))
    } catch (error) {
        res.status(error.status).json(error.message)
    }
})

export default router