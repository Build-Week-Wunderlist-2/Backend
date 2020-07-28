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

router.get('/:id/lists/:listId', validateList, (req, res)=>{

    const {id} = req.params
    const {listId} = req.params

    UserData.findListById(listId, id)
        .then(list =>{
            res.status(200).json(list)
        })
        .catch(err =>{
            res.status(500).json({message: err.message })
        })
})


router.get('/:id/lists/:listId/todos', validateList, (req, res) => {

    const {listId} = req.params

    UserData.findTodos(listId)
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(500).json({message: err.message })
        })
})

router.get('/:id/lists/:listId/todos/:todoId', validateList, validateTodo, (req, res) => {

    const {todoId} = req.params
    const {listId} = req.params

    UserData.findTodosById(todoId, listId)
        .then(todo => {
            console.log('from get' + todo)
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

router.post('/:id/lists/:listId/todos', validateList, (req, res) => {
    const {listId} = req.params

    const bodyData = {
        todo: req.body.todo,
        list_id: listId
    }

    UserData.addTodo(bodyData)
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(error => {
            res.status(400).json({message: error.message})
        })
})

router.put('/:id/lists/:listId', validateList, (req, res)=>{

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

router.put('/:id/lists/:listId/todos/:todoId', validateList, validateTodo, (req, res) => {

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

router.delete('/:id/lists/:listId', validateList, (req, res) => {
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

router.delete('/:id/lists/:listId/todos/:todoId', validateList, validateTodo, (req, res) => {
    const { todoId } = req.params;

    UserData.removeTodo(todoId)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find a todo item with that ID' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

async function validateList(req, res, next) {
    const {listId} = req.params
    const {id} = req.params

    UserData.findListById(listId, id).then(list => {
        if (list.length <= 0) {
            res.status(400).json({message: "The list does not exist"})
        }

        else {
            next();
        }
    })
    .catch(err => {
        console.log(err)
    })

}

async function validateTodo(req, res, next) {
    const {todoId} = req.params
    const {listId} = req.params
    UserData.findTodosById(todoId, listId).then(todo => {
        console.log(todo)
        if (todo.length <= 0) {
            res.status(400).json({message: "The todo item does not exist"})
        }

        else {
            next();
        }
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = router;
