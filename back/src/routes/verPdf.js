
const express = require('express');
const router = express.Router();
const {verPdfController }= require('../controllers');

router.get('/todos/:id', verPdfController.listAll);


module.exports = router;
