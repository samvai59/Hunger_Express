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
router.get('/:id', async function (req, res, next) {
let id=req.params.id;
let ans=await models.cart.findOne({
    where: {
        id: id
    }
});
console.log(ans);

if(ans.order_id==null){
    res.render('Webpages/OrderPage',{par:"your order is not confirmed yet"});

}
else
{
    let ans1=await models.orderr.findOne({
        where: {
            id: ans.order_id
        }
    });
    console.log(ans1);
    if(ans1.status=="Confirmed") {
        res.render('Webpages/OrderPage', {par: "your order is confirmed"});
    }
}
});
module.exports = router;