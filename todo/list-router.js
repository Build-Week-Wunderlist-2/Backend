const express = require('express');

const Lists = require('./list-model.js');

const router = express.Router();

router.get('/', (req, res)=>{
    Lists.find()
        .then(lists => {
            res.status(200).json(lists)
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
})

router.get('/:id', (req, res) => {
    const {id} = req.params

    Lists.findById(id)
        .then(list => {
            res.status(200).json(list)
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
})

router.post('/', (req, res) => {
    const bodyData = req.body

    Lists.add(bodyData)
        .then(list => {
            res.status(201).json(list)
        })
        .catch(error => {
            res.status(400).json({message: error.message})
        })
})

module.exports = router;
