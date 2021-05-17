const { transactAddValidation, 
        transactDeleteValidation, 
        transactUpdateValidation,
        transactGetValidation} = require("../helpers/validations/transactionValidation");
const {paginatedResults} = require('../helpers/pagination/pagination')
const type = require('../enums/type')
const {v4: uuid} = require('uuid')

const Transaction = require('../models/Transactions');
const User = require("../models/Users");

const transactGet = async (req, res) => {
    const {error} = transactGetValidation(req.body)
    if(error){
        return res.status(400).json({error: true, message: error.details[0].message})
    }

    const filters = {
        user_id: req.body.user_id
    }
    
    let filter_by_type = req.query.type
    if(filter_by_type !== undefined){
        filters.type = filter_by_type.toLowerCase().split('').map((x, i) => i===0 ? x.toUpperCase() : x).join('')
    }

    let filter_by_category = req.query.category
    if(filter_by_category !== undefined){
        filters.category = filter_by_category.toLowerCase().split('').map((x, i) => i===0 ? x.toUpperCase() : x).join('')
    }

    let results = null
    try{
        results = await paginatedResults(Transaction, req, filters, {timestamp : -1})
        let credit = await Transaction.aggregate( [{ $match: {type: type.CREDIT, user_id: filters.user_id } },
                                                    { $group: {_id: null, amount: {$sum: "$amount"}} }
                                                ])
        let debit = await Transaction.aggregate( [{ $match: {type: type.DEBIT, user_id: filters.user_id } },
                                                    { $group: {_id: null, amount: {$sum: "$amount"}} }
        ])
        results.data.credit =
            credit.length > 0 ? credit[0].amount : 0;
        results.data.debit = debit.length > 0 ? debit[0].amount : 0
    }
    catch (err) {
        res.status(400).json({error: true, message: "Something went wrong."})
        return
    }

    if(results.error){
        res.status(400).json({...results})
    }
    else{
        res.json({...results})
    }
}

const transactAdd = async (req, res) => {
    const {error} = transactAddValidation(req.body)
    if(error){
        return res.status(400).json({error: true, message: error.details[0].message})
    }

    const user = await User.findOne({id: req.body.user_id})
    if(!user){
        return res.status(400).json({error: true, message: "User does not exist"})
    }
    const transaction = new Transaction({...req.body, id: uuid()})
    try{
        await transaction.save()
        res.status(200).json({error: false, message: "Transaction Added."})
    }
    catch(err){
        res.status(400).json({error: true, message: "Transaction was not added.", info: err})
    }
}

const transactDelete = async (req, res) => {
    
    const {error} = transactDeleteValidation(req.body)
    if(error){
        return res.status(400).json({error: true, message: error.details[0].message})
    }

    try{
        await Transaction.deleteOne({id: req.body.id})
        res.status(200).json({error: false, message: "Transaction Deleted successfully."})
    }
    catch(err){
        res.status(400).json({error: true, message: "Transaction was not deleted.", info: err})
    }
}

const transactUpdate = async (req, res) => {
    
    const {error} = transactUpdateValidation(req.body)
    if(error){
        return res.status(400).json({error: true, message: error.details[0].message})
    }

    try{
        await Transaction.updateOne({id: req.body.id}, {...req.body})
        res.status(200).json({error: false, message: "Transaction Updated."})
    }
    catch(err){
        res.status(400).json({error: true, message: "Transaction was not updated."})
    }
}


module.exports = {transactGet, transactAdd, transactUpdate, transactDelete}