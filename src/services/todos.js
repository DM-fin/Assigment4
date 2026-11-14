// requires npm install uuid
import { v4 as uuidv4 } from 'uuid'

// simulate the database
//const now = Date()
export const todos = [
  //  {
  //      "id": uuidv4(),
  //      "title": "Title of the task",
  //      "description": "Description of the ask",
  //      "state": "todo",
  //      "dueDate": now,
  //      "createdAt": now,
  //      "modifiedAt": now
  //  }
]
const todoStates = ["todo", "doing", "done"]

export function postTodo(objTodo) {
    if (objTodo.title === undefined || objTodo.state === undefined){
        const err = new Error('Title or status underfined')
        err.status = 400
        throw err
    }
    const curDate = new Date(Date.now()).toLocaleString('en-FI')
    const newTodo = {
        "id": uuidv4(),
        "title": objTodo.title,
        "description": objTodo.description,
        "state": objTodo.state,
        "dueDate": objTodo.dueDate,
        "createdAt": curDate,
        "modifiedAt": curDate
    } 
    todos.push(newTodo)
    return newTodo
}

export function delByID(reqID) {
    const delTodoIdx = todos.findIndex(item => item.id === reqID)
    if (delTodoIdx === -1) {
        const err = new Error(`Taks with ID ${reqID} not found`)
        err.status = 404
        throw(err)
    }
    todos.pop(delTodoIdx)
    return `Task with ID ${reqID} deleted`
    
}

export function delAll() {
    todos.length = 0
    return `All tasks deleted`
    
}

export function getAllTodo() {
    return todos
}

export function getTodoByState(qState) {
    if (!todoStates.includes(qState)) {
        const err = new Error("Invalid state-parameter in URL. Should be \"todo\", \"doing\" or \"done\"")  // "Invalid state-parameter in URL. Should be 'todo', 'doing' or 'done'"
        err.status = 400
        throw(err)
    }
    const filterTodos = todos.filter(item => item.state === qState)
    if (filterTodos.length == 0) {
        const err = new Error(`Record with the \"${qState}\" state not found`)  // Record with that state not found
        err.status = 404
        throw(err)
    }
    else return filterTodos
}


export function getTodoById (reqID) {
    const resTodo = todos.find( anItem => anItem.id === reqID )
    if (!resTodo) {
        const err = new Error(`Taks with ID ${reqID} not found`)
        err.status = 404
        throw(err)
    }
    return resTodo

}

export function putTodo(reqID, putTodoBody) {
    if (!putTodoBody.title || !putTodoBody.state ){
        const err = new Error('Title or status underfined')
        err.status = 400
        throw(err)
    }
    const putTodoIdx = todos.findIndex(item => item.id === reqID)
    if (putTodoIdx === -1){
        const err = new Error(`Taks with ID ${reqID} not found`)
        err.status = 404
        throw(err)
    }
    Object.assign(todos[putTodoIdx], putTodoBody)
    return todos[putTodoIdx]
}
