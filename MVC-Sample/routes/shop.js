const path = require('path');

const express = require('express');
const shopController = require('../controllers/shop.controller');

const router = express.Router();

router.get('/',shopController.getIndex);
router.get('/products',shopController.getProducts);
router.get('/products/:productId',shopController.getProductById);
router.get('/cart',shopController.getCart);
router.get('/checkout',shopController.getCheckout);

module.exports = router;
