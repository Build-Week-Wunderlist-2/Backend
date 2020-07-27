const express = require('express');

const Todo = require('./todo-model.js');

const router = express.Router();

router.get('/', (req, res)=>{
    Todo.find()
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
})

router.get('/:id', (req, res) => {
    const {id} = req.params

    Todos.findById(id)
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
})

router.post('/', (req, res) => {
    const bodyData = req.body

    Todo.add(bodyData)
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(error => {
            res.status(400).json({message: error.message})
        })
})

module.exports = router;
