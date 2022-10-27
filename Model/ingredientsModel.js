var mongoose=require("mongoose");

const ingredientSchema=mongoose.Schema([{
    type_pizza:[{
        name:String
    }],
    type_crust:[{
        name:String,
        price:Number
    }],
    type_cheese:[{
        name:String,
        price:Number
    }],
    type_vegToppings:[{
        name:String,
        price:Number
    }],
    type_NonVegToppings:[{
        name:String,
        price:Number
    }],
    type_Sauce:[{
        name:String,
        price:Number
    }]
}]
)
 
const ingredients=mongoose.model("ingredients",ingredientSchema);
module.exports =ingredients;