const express = require('express')

const {transactAdd, transactUpdate, transactDelete, transactGet} = require('../controllers/transactionController')

const transactRouter = express.Router()

transactRouter.get('/', transactGet)
transactRouter.post('/add', transactAdd)
transactRouter.put('/update', transactUpdate)
transactRouter.delete('/delete', transactDelete)

module.exports = transactRouter
