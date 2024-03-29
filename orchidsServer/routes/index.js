var express = require('express');
var router = express.Router();
const orchidsController = require("../controllers/orchidsController");
const User = require("../controllers/usersController")
const { ensureAuthenticated } = require('../config/auth')
const { requireRole } = require('../config/verifyRole')
/* GET home page. */
router.get('/', orchidsController.home);
router.get('/accounts', ensureAuthenticated, requireRole, User.listUsers);
module.exports = router;
