var mongoose=require("mongoose");

const userInfoSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:[true,"Please provide an Email!"],
        unique:[true,"Email Exist"],
        
    },
    password:{
        type:String,
        required:[true,"Please provide a password!"],
        unique:false,
    },
    token:{
       type: String,
       required:true,
    },
    isVerified:{
        type:Boolean,
        required:true,
        default:false,
    }
},


{timestamps:true}
);
 



const user=mongoose.model("user",userInfoSchema);
module.exports =user;