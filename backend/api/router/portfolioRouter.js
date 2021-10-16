const express = require('express')
const router = express.Router()
const PortfolioController = require('../controller/PortfolioController')

//http://localhost:2727/portfolio
router.get('/', PortfolioController.getAll)

//http://localhost:2727/portfolio/:id
router.get('/:id', PortfolioController.getOne)

//add portfolio
//POST
//http://localhost:2727/portfolio
router.post('/', PortfolioController.add)
//delete port
//http://localhost:2727/portfolio/:port_id
router.delete('/:port_id', PortfolioController.delete)

//update port
//http://localhost:2727/portfolio/:port_id
router.put('/:port_id', PortfolioController.update)

module.exports = router