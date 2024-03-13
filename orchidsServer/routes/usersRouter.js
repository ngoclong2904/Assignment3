const express = require('express');
const bodyParser = require('body-parser');

const userController = require('../controllers/usersController');
const usersRouter = express.Router();

const { redirectLogin } = require('../config/redirectLogin')
const { ensureAuthenticated } = require('../config/auth')
usersRouter.use(bodyParser.json())

usersRouter
  .route('/')
  .get(userController.index)
  .post(userController.regist)

usersRouter
  .route('/login')
  .get(userController.login)
  .post(userController.signin)

usersRouter
  .route('/logout')
  .get(userController.signout)

usersRouter
  .route('/dashboard')
  .get(ensureAuthenticated, redirectLogin, userController.dashboard)

// usersRouter
//   .route('/edit')
//   .get(ensureAuthenticated, userController.formEdit)
//   .post(ensureAuthenticated, userController.edit)

module.exports = usersRouter;

