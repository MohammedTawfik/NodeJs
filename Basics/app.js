const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const productsRouter = require('./routes/product');
const adminRouter = require('./routes/admin');
const defaultRouter = require('./routes/default');
const booksRouter = require('./routes/books');
const coursesRouter = require('./routes/courses');



const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/courses',coursesRouter);
app.use('/books',booksRouter);

app.use(productsRouter);
app.use(adminRouter);
app.use(defaultRouter);

app.listen(3000);
