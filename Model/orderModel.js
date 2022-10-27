const mongoose = require('mongoose');

const orderSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    meals:[
       {mealId:String,
        quantity:Number,
        pizzaType:String,
        desc:String,
        } ],
   total:{
            type:Number,
            required:true,
        },
        shipping:{
            type:Object,
            required:true,
        },
        customerId:{type:String,required:true},
    payment_status:{
        type:String,
        required:true,
    },
  
},
{timestamps:true}
)
const order=mongoose.model("order",orderSchema);
module.exports= order;