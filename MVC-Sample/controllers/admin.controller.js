const Product = require('../models/product.model');

exports.getProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.addProduct = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;

  const product = new Product(title, description, imageUrl, price);
  product.save();
  res.redirect('/');
};

exports.editProduct = (req, res, next) => {
  const isEditing = req.query.edit;
  if (!isEditing) {
    res.redirect('/');
  }
  Product.findById(req.params.productId, (currentProduct) => {
    if (!currentProduct) {
      res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: isEditing,
      product: currentProduct,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  var product = new Product(
    productId,
    req.body.title,
    req.body.description,
    req.body.imageUrl,
    req.body.price
  );
  product.save();
  res.redirect('/admin/products');
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
