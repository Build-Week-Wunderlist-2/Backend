const express = require('express');

const UserData = require('./userdata-model.js');

const router = express.Router();

router.get('/:id/lists', (req, res)=>{

    const {id} = req.params

    UserData.findList(id)
        .then(lists =>{
            res.status(200).json(lists)
        })
        .catch(err =>{
            res.status(500).json({message: err.message })
        })
})

router.get('/:id/lists/:todoId', (req, res) => {

    const {todoId} = req.params

    UserData.findTodos(todoId)
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(500).json({message: err.message })
        })
})

router.post('/:id/lists', (req, res) => {
    const name = req.body.listname
    const {id} = req.params

    const bodyData = {
        listname: name,
        user_id: id
    }

    UserData.addList(bodyData)
        .then(list => {
            res.status(201).json(list)
        })
        .catch(error => {
            res.status(400).json({message: error.message})
        })
})

router.post('/:id/lists/:list_id' , (req, res) => {
    const {list_id} = req.params

    const bodyData = {
        todo: req.body.todo,
        list_id: list_id
    }

    UserData.addTodo(bodyData)
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(error => {
            res.status(400).json({message: error.message})
        })
})

module.exports = router;
