const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/dbConfig');
const Product = require('./models/product');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
  User.findByPk(1).then(user =>{
    req.user = user;
    next();
  })
  .catch(err =>{
    console.log(err);
  })
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'Cascade' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through:CartItem});
Product.belongsToMany(Cart, {through: CartItem});
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, {through : OrderItem});
Product.belongsToMany(Order, {through : OrderItem});


sequelize
  //.sync({ force: true })  // use force option to remove the existing tables and create new tables
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then((user) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
