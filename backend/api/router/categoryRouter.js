const express = require('express')
const CategoryController = require('../controller/CategoryController')
const router = express.Router()

//get all portfolio for a category.
//http://localhost:2727/category/:id
router.get('/:id', CategoryController.getAll)

//add category
//POST
//http://localhost:2727/category
router.post('/', CategoryController.add)

// delete category
// http://localhost:2727/category/:cat_id
router.delete('/:cat_id', CategoryController.delete)

//update port
// http://localhost:2727/category/:cat_id
router.put('/:cat_id', CategoryController.update)

module.exports = router