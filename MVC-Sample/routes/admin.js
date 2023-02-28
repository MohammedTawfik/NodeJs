const path = require('path');

const express = require('express');
const productsController = require('../controllers/shop.controller')

const router = express.Router();
// /admin/add-product => GET
router.get('/add-product', productsController.getProduct);

// /admin/add-product => POST
router.post('/add-product', productsController.addProduct);

exports.routes = router;
