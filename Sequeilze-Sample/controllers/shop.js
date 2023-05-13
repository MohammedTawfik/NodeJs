const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  //there are two ways to get certain record
  //First : get by primary key
  // Product.findByPk(prodId)
  //   .then((product) => {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: product.title,
  //       path: '/products',
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  //Second call findAll and set where parameter
  Product.findAll({ where: { id: prodId } })
    .then((products) => {
      res.render('shop/product-detail', {
        product: products[0],
        pageTitle: products[0].title,
        path: '/products',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCart = async (req, res, next) => {
  const userCart = await req.user.getCart();
  let cartProducts = [];
  if (userCart) {
    cartProducts = await userCart.getProducts();
  }

  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products: cartProducts,
  });
};

exports.postCart = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    let productQuantity = 1;
    let userCart = await req.user.getCart();
    if (!userCart) {
      await req.user.createCart();
      userCart = await req.user.getCart();
    }
    const cartProduct = await userCart.getProducts({
      where: { id: prodId },
    });
    if (cartProduct.length > 0) {
      productQuantity = cartProduct[0].cartItem.quantity + 1;
      await userCart.addProduct(cartProduct[0], {
        through: { quantity: productQuantity },
      });
    } else {
      const product = await Product.findByPk(prodId);
      await userCart.addProduct(product, {
        through: { quantity: productQuantity },
      });
    }

    res.redirect('/cart');
  } catch (error) {
    console.log(error);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  try {
    const userCart = await req.user.getCart();
    const cartProducts = await userCart.getProducts({ where: { id: prodId } });
    await cartProducts[0].cartItem.destroy();
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
  }
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
