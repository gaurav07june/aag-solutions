const Customer = require('../models/Customer')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getCustomers = asyncWrapper(async (req, res) => {
    const customers = await Customer.find({})
    res.status(200).json({ customers })
})

const createCutomer = asyncWrapper(async (req, res) => {
    const customer = await Customer.create(req.body)
    res.status(201).json({ customer })
})

const getCustomer = asyncWrapper(async (req, res, next) => {
    const { id: customerID } = req.params
    const customer = await Customer.findOne({ _id: customerID })
    if (!customer) {
        return next(createCustomError(`No customer with id : ${customerID}`, 404))
    }
    res.status(200).json({ customer })
})

const deleteCustomer = asyncWrapper(async (req, res, next) => {
    const { id: customerID } = req.params
    const customer = await Customer.findOneAndDelete({ _id: customerID })
    if (!customer) {
        return next(createCustomError(`No customer with id : ${customerID}`, 404))
    }
    res.status(200).json({ customer })
})

const updateCustomr = asyncWrapper(async (req, res, next) => {
    const { id: customerID } = req.params
    const customer = await Customer.findOneAndUpdate({ _id: customerID }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!customer) {
        return next(createCustomError(`No customer with id : ${customerID}`, 404))
    }
    res.status(200).json({ customer })
})

module.exports = {
    getCustomers,
    createCutomer,
    getCustomer,
    updateCustomr,
    deleteCustomer,
}
