const db = require('../database/dbConfig.js')

module.exports = {
    find,
    findById,
    add
}

function find() {
    return db('todo')
            .select('todo.id', 'todo.todo', 'todo.list_id')
            .join('lists', 'lists.id', 'todo.list_id')
}

function findById(id) {
    return db('todo')
    .where({id})
    .first()
}

function add(todo) {
    return db('lists')
        .insert(todo, 'id')
        .then((ids) => {
            return findById(ids)
        })
    }
