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

router.get('/:id/lists/:listId', (req, res)=>{

    const {listId} = req.params

    UserData.findListById(listId)
        .then(list =>{
            res.status(200).json(list)
        })
        .catch(err =>{
            res.status(500).json({message: err.message })
        })
})


router.get('/:id/lists/:listId/todos', (req, res) => {

    const {listId} = req.params

    UserData.findTodos(listId)
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(500).json({message: err.message })
        })
})

router.get('/:id/lists/:listId/todos/:todoId', (req, res) => {

    const {todoId} = req.params

    UserData.findTodosById(todoId)
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

router.post('/:id/lists/:list_id/todos' , (req, res) => {
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

router.put('/:id/lists/:listId', (req, res)=>{

    const {listId} = req.params
    const changes = req.body

    UserData.updateList(changes, listId)
        .then(list => {
            res.status(200).json(list)
        })
        .catch(err =>{
            res.status(500).json({message: err.message })
        })
})

router.put('/:id/lists/:listId/todos/:todoId', (req, res) => {

    const {todoId} = req.params
    const changes = req.body

    UserData.updateTodo(changes, todoId)
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(500).json({message: err.message })
        })
})

router.delete('/:id/lists/:listId', (req, res) => {
    const { listId } = req.params;

    UserData.removeList(listId)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find a list with that ID' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
  });


module.exports = router;
