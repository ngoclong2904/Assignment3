var express = require('express');
const orchidsController = require('../controllers/orchidsController')
const orchidsRouter = express.Router();

orchidsRouter
    .route('/')
    .get(orchidsController.index)
    .post(orchidsController.create)


orchidsRouter
    .route('/edit/:orchidId')
    .get(orchidsController.formEdit)
    .post(orchidsController.edit);

orchidsRouter
    .route('/delete/:orchidId')
    .get(orchidsController.delete)

module.exports = orchidsRouter;