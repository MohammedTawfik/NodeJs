const { getDb } = require('../util/database');

class Product {
  constructor( title, description, imageUrl, price) {
    this.title = title,
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  save() {
    const db = getDb();
    return db
      .collection('products')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
}



module.exports = Product;
