const products = [];


//in this case of exporting a class we must use MODULE.EXPORTS as using EXPORTS only will cause errors
module.exports = class Product{
    constructor(productTitle){
        this.title = productTitle;
    }

    save(){
        products.push(this);
    }

    static fetchAllProducts(){
        return products;
    }
}