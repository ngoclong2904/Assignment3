const express = require('express')
const bodyParser = require('body-parser')
const categoriesController = require('../controllers/categoriesController')
const categoriesRouter = express.Router();

categoriesRouter.use(bodyParser.json());

categoriesRouter
    .route('/')
    .get(categoriesController.index)
    .post(categoriesController.create);

categoriesRouter
    .route('/edit/:categoryId')
    .get(categoriesController.formEdit)
    .post(categoriesController.edit)

categoriesRouter
    .route('/delete/:categoryId')
    .get(categoriesController.delete)

module.exports = categoriesRouter;
