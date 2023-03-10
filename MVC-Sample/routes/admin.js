const path = require('path');

const express = require('express');
const adminController = require('../controllers/admin.controller')

const router = express.Router();
// /admin/add-product => GET
router.get('/add-product', adminController.getProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.addProduct);

router.get('/products', adminController.getProducts);

exports.routes = router;
