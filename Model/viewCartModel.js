var mongoose=require("mongoose");

const cartSchema=mongoose.Schema([{
    pizzaType:String,
    crustType:String,
    cheeseType:String,
    vegToppingsType:{
        type:Array
    },
    NonVegToppingsType:{
        type:Array
    },
    SauceType:{
        type:Array
    },
    amount:Number
}],


{timestamps:true}
);
 
const cart=mongoose.model("cart",cartSchema);
module.exports =cart;