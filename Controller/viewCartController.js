
var cartSchema = require('../Model/viewCartModel');

getCartItems = (req,res,next)=>{
    cartSchema.find((err,response)=>{
             if(err)
             {
                res.send("Exception Occurred");
             }
             else{
               res.send(response);
               
             }
    })
}

addCartItem=(req,res,next)=>
{ 
  
        const ItemToAdd=new cartSchema({
            pizzaType:req.body.pizzaType,
            crustType:req.body.crustType,
            cheeseType:req.body.cheeseType,
            vegToppingsType:req.body.vegToppingsType,
            NonVegToppingsType:req.body.NonVegToppingsType,
            SauceType:req.body.SauceType,
            amount:req.body.amount
        });
        ItemToAdd.save((err,response)=>{
            if(err)
            {
                res.send({status:500,message:"exception occured"});
            }
            else{
                res.send({status:200, message:"Data Posted Successfully", cartItems:response});
            }
         });
}
removeCartItem=(req,res,next)=>{
    cartSchema.findOneAndRemove({"_id":req.query.id},(err,response)=>
    {
       if(err)
       {
           res.send("exception occurred");
       }
       else{
           res.send({status:400,message:"Cart Item deleted Successfully",cart:response});
       }
    })
}

 

module.exports={ getCartItems,addCartItem,removeCartItem};