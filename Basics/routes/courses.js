const express = require('express');

const router = express.Router();

router.get('/view',(req,res,next)=>{
    res.send('<h1> Courses Gallery </h1>');
});

module.exports = router;