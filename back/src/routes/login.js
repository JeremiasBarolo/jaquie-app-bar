
const express = require('express');
const router = express.Router();
const {loginController }= require('../controllers');

router.post('/', loginController.login);


module.exports = router;
