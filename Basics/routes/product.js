const express = require('express');
const path = require('path');
const router = express.Router();

const routeDir = require('../utils/path')

router.use('/add-product', (req, res, next) => {
    //Old way to get the html file path
    //res.sendFile(path.join(__dirname,'../','views','add-product.html'))

    //More cleaner way to get html file path
    res.sendFile(path.join(routeDir,'views','add-product.html'))
  });
  
  router.use('/products', (req, res, next) => {
    
    console.log(req.body);
    res.redirect('/');
  });

module.exports = router;