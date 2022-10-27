
var ingredientSchema = require('../Model/ingredientsModel');

getIngredientList = (req,res,next)=>{
    ingredientSchema.find((err,response)=>{
             if(err)
             {
                res.send("Exception Occurred");
             }
             else{
               res.send(response); 
             }
    })
}

addIngredient=(req,res,next)=>
{ 
  
        const ingredientToAdd=new ingredientSchema({
            type_pizza:req.body.type_pizza,
            type_crust:req.body.type_crust,
            type_cheese:req.body.type_cheese,
            type_vegToppings:req.body.type_vegToppings,
            type_NonVegToppings:req.body.type_NonVegToppings,
            type_Sauce:req.body.type_Sauce,
            amount:req.body.amount
            
        });
        ingredientToAdd.save().then((response)=>res.send(response)).catch(()=>res.send("exception occurred"));
    
}
 

module.exports={ getIngredientList,addIngredient};