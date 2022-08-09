const { json } = require('express');
var express = require('express');
const session = require('express-session');
var router = express.Router();
const Pool = require('pg').Pool;
let pool = require('./../../db_config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:tanmoy@localhost:5432/HungerExpress');

var initModels = require('./../../Models/init-models');
var models = initModels(sequelize);

router.get('/', function (req, res, next) {
    //console.log(req.session.cart.key);
    const name=[];
    const price=[];
    const qty =[];
    const subTotal=[];
    if(!req.session.cart){
        res.render('Webpages/noOrder');
    }
    let totalprice=req.session.cart.totalPrice;
    let totalqty=req.session.cart.totalQty;
    for(var i=0;i<req.session.cart.key.length;i++){
    name.push(req.session.cart.key[i]);
    price.push(req.session.cart.items[req.session.cart.key[i]].price/req.session.cart.items[req.session.cart.key[i]].qty);
    qty.push(req.session.cart.items[req.session.cart.key[i]].qty);
    subTotal.push(req.session.cart.items[req.session.cart.key[i]].price);

    }
    console.log(name,price,qty,subTotal);
    res.render('Webpages/cart-page',{
        title:'Cart',
        name:name,
        price:price,
        qty:qty,
        subTotal:subTotal,
        totalprice:totalprice,
        totalqty:totalqty
    });
});




router.post('/update', async function (req, res, next) {
    console.log('received');
     if(!req.session.cart)
     {
        req.session.cart={
            items:{},
            totalQty:0,
            totalPrice:0,
            key:[]

        }
     }

     let cart = req.session.cart;
       console.log(req.body.name);
         if(!cart.items[req.body.name])
         {
            cart.items[req.body.name] ={
                id:req.body.id,
                name: req.body.name,
                qty : 1,
                price: req.body.price,
                
            }
            cart.totalQty = cart.totalQty + 1;
            cart.totalPrice = cart.totalPrice + req.body.price;
            cart.key.push(req.body.name);
            cart.rest_id=req.body.rest_id;
            cart.customer_id=req.body.customer_id;
         }
         else{
            cart.items[req.body.name].qty = cart.items[req.body.name].qty + 1;
            cart.items[req.body.name].price = cart.items[req.body.name].price + req.body.price;
            cart.totalQty = cart.totalQty + 1;
            cart.totalPrice = cart.totalPrice + req.body.price;
            
         }
         console.log('hello',cart); 
        
          res.json({ cart : req.session.cart});
});
router.post('/', async function (req, res, next) {

    let col=await models.cart.findAll();
    let l=col.length;
    let ans=await models.cart.create({
        id:l+1,
        customer_id:req.session.customer_id,
        rest_id:req.session.rest_id,
        total_price:req.session.cart.totalPrice,

        });
    for(var i=0;i<req.session.cart.key.length;i++){
        let ans=await models.cart_item.create({
            cart_id:l+1,
            item_id:req.session.cart.items[req.session.cart.key[i]].id,
            item_name:req.session.cart.items[req.session.cart.key[i]].name,
            item_qty:req.session.cart.items[req.session.cart.key[i]].qty,
            item_price:req.session.cart.items[req.session.cart.key[i]].price,
        });
    }

});
module.exports = router;
