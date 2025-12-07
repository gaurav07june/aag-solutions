const express = require('express')
const router = express.Router()

const {
    getCustomers,
    createCutomer,
    getCustomer,
    updateCustomr,
    deleteCustomer,
} = require('../controllers/customersTask')

router.route('/').get(getCustomers).post(createCutomer)
router.route('/:id').get(getCustomer).patch(updateCustomr).delete(deleteCustomer)

module.exports = router
