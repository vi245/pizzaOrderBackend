var { getCartItems,addCartItem,removeCartItem}=require("../Controller/viewCartController");
var express =require('express');
var router= express.Router();

router.get('/', (req,res,next)=>{
    getCartItems(req,res,next);
});
router.get('/getCartItems', (req,res,next)=>{
    getCartItems(req,res,next);
});

router.post('/addCartItem', (req,res,next)=>{
    addCartItem(req,res,next);
});
router.delete('/removeCartItem', (req,res,next)=>{
    removeCartItem(req,res,next);
});

module.exports=router;