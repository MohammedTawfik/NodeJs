const Product = require('../models/product.model');
const path = require('../util/path');

/***** pass callback method to fetchAllProducts and move all the rendering code inside th callback */
exports.getProducts = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render('shop/products-list', {
      prods: products,
      pageTitle: 'Products List',
      path: '/products-list',
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
