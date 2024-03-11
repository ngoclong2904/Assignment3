const express = require('express');
const router = express.Router();

const orchidsController = require('../controllers/orchidsController')

const User = require('../controllers/usersController');

router.get('/', orchidsController.index)

module.exports = new router;

