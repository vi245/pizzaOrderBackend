var { getIngredientList,addIngredient }=require("../Controller/ingredientController");
var express =require('express');
var router= express.Router();

router.get('/', (req,res,next)=>{
    getIngredientList(req,res,next);
});
router.get('/getIngredient', (req,res,next)=>{
    getIngredientList(req,res,next);
});

router.post('/addIngredientList', (req,res,next)=>{
    addIngredient(req,res,next);
});

module.exports=router;