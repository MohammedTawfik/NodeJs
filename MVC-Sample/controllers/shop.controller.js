const Product = require('../models/product.model');
const path = require('../util/path');
const cart = require('../models/cart.model');
const Cart = require('../models/cart.model');

/***** pass callback method to fetchAllProducts and move all the rendering code inside th callback */
exports.getProducts = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Products List',
      path: '/product-list',
    });
  });
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    res.render('shop/product-detail', {
      product: product,
      path: '/product-details',
      pageTitle: 'Product Details',
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
  Cart.getCart((cart) => {
    Product.fetchAllProducts((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProduct = cart.products.find(prod => prod.id === product.id);
        if(cartProduct){
          cartProducts.push({productData: product, quantity: cartProduct.qty});
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.addToCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    cart.addToCart(productId, product.price);
    res.redirect('/cart');
  });

};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Orders',
  });
};
