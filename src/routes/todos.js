import express from 'express'
// requires npm install uuid
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// simulate the database

let todos = []
const todoStates = ["todo", "doing", "done"]

router.post('/', (req, res) => {
    const reqTitle = req.body.title
    const reqState = req.body.state
    const reqDescription = (!req.body.description || typeof req.body.description === "number") ? "underfined" : req.body.description
    const reqDueDate = (!req.body.dueDate || typeof req.body.dueDate === "number") ? "underfined" : req.body.dueDate
    console.log(reqDescription)
    if (!todoStates.includes(reqState)) return res.status(400).send("Invalid todo state")
    if (typeof reqTitle == "string"){
        const curDate = new Date(Date.now()).toLocaleString('en-FI')
        todos.push({
            "id": uuidv4(),
            "title": reqTitle,
            "description": reqDescription,
            "state": reqState,
            "dueDate": reqDueDate,
            "createdAt": curDate,
            "modifiedAt": curDate
        })
        console.log(todos)
        return res.status(201).send("New todo created")
    } else return res.status(400).json({error:"Check title parameter"})
})
    
router.delete('/', (req, res) => {
    if (todos.length != 0) {
        todos.length = 0
        res.status(200).send("All todo records deleted")
    } else res.status(404).send("No records for todos exist")
})

router.delete('/:id', (req, res) => {
    const reqID = req.params.id
    const todoToDel = todos.find(item => item.id === reqID)
    if (todoToDel) {
        todos = todos.filter(item => item !== todoToDel)
        res.status(200).send("1 todo record deleted")
    } else {
        return res.status(404).json({error: "Todo not found"})
    }
})

router.get('/', (req, res) => {
    const qState = req.query.state
    //console.log(qState)

    if (qState) {
        if (!todoStates.includes(qState)) return res.status(400).send("Invalid state-parameter in URL")
        const filterTodos = todos.filter(item => item.state === qState)
        if (filterTodos.length == 0) return res.status(404).send("Record with that state not found")
        return res.status(200).json(filterTodos)
    } else res.json(todos)
})

router.get('/:id', ( req, res ) => {
    const id = req.params.id
    const resTodo = todos.find( anItem => anItem.id === id )
    if ( !resTodo )
        return res.status(404).json({error: "Todo not found"})
    else
        return res.json( resTodo )
})

router.put('/:id', (req, res) => {
    //console.log(re)
    const id = req.params.id
    const reqTitle = req.body.title
    const reqState = req.body.state
    const reqDescription = req.body.description
    const reqDueDate = req.body.dueDate
    if (!id) return res.status(400).json({error:"ID is obligatory"})
    if (!todoStates.includes(reqState)) return res.status(400).send("Invalid todo state")

    
    const resTodo = todos.find( anItem => anItem.id === id )
    if (!resTodo) return res.status(400).json({error:"Wrong ID"})
    else {
        resTodo.title = (reqTitle) ? reqTitle : resTodo.title
        resTodo.state = (reqState) ? reqState : resTodo.state
        resTodo.description = (reqDescription) ? reqDescription : resTodo.description
        resTodo.dueDate = (reqDueDate) ? reqDueDate : resTodo.dueDate
        const curDate = new Date(Date.now()).toLocaleString('en-FI')
        resTodo.modifiedAt = curDate
        const indx = todos.findIndex(item => item.id === resTodo.id)
        todos[indx] = resTodo
        return res.status(200).json(resTodo)
    }
            
    
})

export default router