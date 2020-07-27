const db = require("../database/dbConfig.js");

module.exports = {
    findList,
    findListById,
    findTodos,
    findTodosById,
    addList,
    addTodo
}

function findList(user_id) {
    return db('lists')
        .where({user_id})
        .select('lists.id', 'lists.listname', 'lists.user_id')
        .join('users', 'users.id', 'lists.user_id')
}

function findListById(id) {
    return db('lists')
        .where({id})
        .select('lists.id', 'lists.listname', 'lists.user_id')
}

function findTodos(list_id) {
    return db('todo')
        .where({list_id})
        .select('todo.id', 'todo.todo', 'todo.list_id')
        .join('lists', 'lists.id', 'todo.list_id')
}

function findTodosById(id) {
    return db('todo')
        .where({id})
        .select('todo.id', 'todo.todo', 'todo.list_id')
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
