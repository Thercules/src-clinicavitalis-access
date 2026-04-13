const express = require('express')
const medicosBackendAdapter = require('../adapters/medicosBackendAdapter')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await medicosBackendAdapter.listarMedicos()
    res.json(data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
