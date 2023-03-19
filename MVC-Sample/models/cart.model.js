const fs = require('fs');
const path = require('path');
const pathUtil = require('../util/path');

const filePath = path.join(pathUtil, 'data', 'cart.json');

module.exports = class Cart {
  static addToCart(productId, ProductPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent);
      }
      if(!cart.products){
        cart = { products: [], totalPrice: 0 };
      }
      const currentProductIndex = cart.products.findIndex(
        (prod) => prod.id === productId
      );
      const currentProduct = cart.products[currentProductIndex];
      let updatedProduct;
      if (currentProduct) {
        updatedProduct = {...currentProduct};
        updatedProduct.qty+=1;
        cart.products = [...cart.products];
        cart.products[currentProductIndex] = updatedProduct;
      }
      else{
        updatedProduct = {id: productId , qty:1};
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +ProductPrice;
      fs.writeFile(filePath,JSON.stringify(cart),(err)=>{
        console.log(err);
      });
    });
  }
};
