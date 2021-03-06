const db = require("../database/dbConfig.js");

module.exports = {
    findList,
    findListById,
    findTodos,
    findTodosById,
    addList,
    addTodo,
    updateList,
    updateTodo,
    removeList,
    removeTodo
}

function findList(user_id) {
    return db('lists')
        .where("lists.user_id", user_id)
        .select('lists.id', 'lists.listname', 'lists.user_id')
        .join('users', 'users.id', 'lists.user_id')
}

function findListById(id, user_id) {
    return findList(user_id)
        .where("lists.id", id)
        .select('lists.id', 'lists.listname', 'lists.user_id')
}

function findTodos(list_id) {
    return db('todo')
        .where("todo.list_id", list_id)
        .select('todo.id', 'todo.todo', 'todo.list_id', 'todo.completed')
        .join('lists', 'lists.id', 'todo.list_id')
}

function findTodosById(id, list_id) {
    return findTodos(list_id)
            .where("todo.id", id)
            .select('todo.id', 'todo.todo', 'todo.list_id', 'todo.completed')
}

function findByListId(id) {
    return db('lists')
    .where({id})
    .first()
}

function addList(list) {
    return db('lists')
        .insert(list, 'id')
        .then((ids) => {
            return findByListId(ids)
        })
}

function findByTodoId(id) {
    return db('todo')
    .where({id})
    .first()
}

function addTodo(todo) {
    return db('todo')
        .insert(todo, 'id')
        .then((ids) => {
            return findByTodoId(ids)
        })
}

function updateList(changes, id) {
    return db('lists')
        .where({id})
        .update(changes)
        .then(() => {
            return findByListId(id)
        })
}

function updateTodo(changes, id) {
    return db('todo')
        .where({id})
        .update(changes)
        .then(() => {
            return findByTodoId(id)
        })
}

function removeList(id) {
    let toBeDeleted = findByListId(id).then((item) => {
        return item
    })

    return db("lists")
        .where({id})
        .del()
        .then(() => {
            return toBeDeleted
        })
}

function removeTodo(id) {
    let toBeDeleted = findByTodoId(id).then((item) => {
        return item
    })

    return db("todo")
        .where({id})
        .del()
        .then(() => {
            return toBeDeleted
        })
}
