const express = require('express')

const {transactAdd, transactUpdate, transactDelete, transactGet} = require('../controllers/transactionController')

const transactRouter = express.Router()

transactRouter.post('/', transactGet)
transactRouter.post('/add', transactAdd)
transactRouter.patch('/update', transactUpdate)
transactRouter.delete('/delete', transactDelete)

module.exports = transactRouter
