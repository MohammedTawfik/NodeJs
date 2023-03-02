const Product = require('../models/product.model');

exports.getProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.addProduct = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;

  const product = new Product(title,description,imageUrl , price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products List',
      path: '/admin/products',
    });
  });
};
