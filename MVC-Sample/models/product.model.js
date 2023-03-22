const pathUtil = require('../util/path');
const path = require('path');
const fs = require('fs');
const cart = require('./cart.model');

const filePath = path.join(pathUtil, 'data', 'products.json');


const getProductsData = (callBack)=> {
  const filePath = path.join(pathUtil, 'data', 'products.json');
  fs.readFile(filePath, (error, fileContent) => {
    if (error) {
      callBack([]);
    }
    callBack(JSON.parse(fileContent));
  });
}

//in this case of exporting a class we must use MODULE.EXPORTS as using EXPORTS only will cause errors
module.exports = class Product {
  constructor(id,productTitle, description, imageUrl, price) {
    this.id = id;
    this.title = productTitle;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  save() {
    let products = [];
    
    fs.readFile(filePath, (error, fileContent) => {
      if (!error) {
        products = JSON.parse(fileContent);
      }
      if(this.id){
        const currentProductIndex = products.findIndex(prod => prod.id === this.id);
        const newProducts = [...products];
        newProducts[currentProductIndex] = this
        products = [...newProducts];
      }
      else{
        this.id = Math.random().toString();
        products.push(this);
      }
      fs.writeFile(filePath, JSON.stringify(products), (error) => {
        console.log(error);
      });
    });
  }


  //***** having the following implementation will cause an error "Cannot read property 'length' of undefined" because
  //***** fetchAllProducts method don't return anything and it call the asynchronous version of readfile and close its scope before readfile finish
  //***** so any code calling fetchAllProducts will receive undefined
  //   static fetchAllProducts() {
  //     fs.readFile(filePath,(error, fileContent) => {
  //         if(error){
  //             return [];
  //         }
  //         return JSON.parse(fileContent);
  //     });
  //   }

  /***** SOLUTION is to use call back */
  static fetchAllProducts(callBack) {
    getProductsData(callBack);
  }

  static findById(id, callBack) {
    getProductsData((products) => {
      const product = products.find((product) => product.id === id);
      callBack(product);
    });
  }

  static deleteById(productId){
    fs.readFile(filePath,(error, fileContent) => {
      if (!error) {
        var products = JSON.parse(fileContent);
        const product = products.find((product) => product.id === productId);
        products = products.filter((product) => product.id !== productId);
        fs.writeFile(filePath, JSON.stringify(products), (error) => {
          if(!error) {
            cart.delete(productId,product.price);
          }
        });
      }
    })
  }
};
