const path = require('path');

const express = require('express');
const adminController = require('../controllers/admin.controller')

const router = express.Router();
// /admin/add-product => GET
router.get('/add-product', adminController.getProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.addProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId', adminController.editProduct);

router.post('/edit-product',adminController.postEditProduct);

router.post('/delete-product',adminController.deleteProduct);

exports.routes = router;
