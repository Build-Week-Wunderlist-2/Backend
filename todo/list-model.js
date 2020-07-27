const db = require('../database/dbConfig.js')

module.exports = {
    find,
    findById,
    add
}

function find() {
    return db('lists')
            .select('lists.id', 'lists.listname', 'lists.user_id')
            .join('users', 'users.id', 'lists.user_id')
}

function findById(id) {
    return db('lists')
    .where({id})
    .first()
}

function add(list) {
    return db('lists')
        .insert(list, 'id')
        .then((ids) => {
            return findById(ids)
        })
    }
