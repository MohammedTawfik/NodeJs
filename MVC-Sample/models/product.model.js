const pathUtil = require('../util/path');
const path = require('path');
const fs = require('fs');

const filePath = path.join(pathUtil, 'data', 'products.json');

//in this case of exporting a class we must use MODULE.EXPORTS as using EXPORTS only will cause errors
module.exports = class Product {
  constructor(productTitle) {
    this.title = productTitle;
  }

  save() {
    const products = [];
    fs.readFile(filePath, (error, fileContent) => {
      if (!error) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
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
    const filePath = path.join(pathUtil, 'data', 'products.json');
    fs.readFile(filePath, (error, fileContent) => {
      if (error) {
        callBack([]);
      }
      callBack(JSON.parse(fileContent));
    });
  }
};
