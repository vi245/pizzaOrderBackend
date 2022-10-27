const bcrypt=require('bcryptjs');
var userSchema= require('../Model/userInfoModel');
var { JWT_SIGN_KEY ,JWT_SECRET_KEY} =require( '../properties');
const jwt =require('jsonwebtoken');
require("dotenv").config();
const sendEmail=require('../helpers/sendMail');


exports.register=(req,res)=>{
   userSchema.findOne({email:req.body.email},(err,user)=>{
        if(err)
        {
            res.send('exception occurred');
        }
        else{
            if(user)
            {
                return res.send({status:401,message:"user already exist",userData:user,});
            }
            else{
                bcrypt.hash(req.body.password,10).then((hashedPassword)=>{
                    const userdetail=new userSchema({
                        name:req.body.name,
                        email:req.body.email,
                        password:hashedPassword,
                        token:jwt.sign({email:req.body.email},JWT_SECRET_KEY,{expiresIn:'10min'}),
                    });
                
                  
                    
                userdetail.save((err,response)=>{
                    if(err)
                    {
                        res.send({status:500,message:"error creating user",err,});
                    }
                    else{
                        res.send({status:201, message:"user is created successfully but has not been verified yet", userData:response});
                    }
                 });
                      
                    
                       const resetURL=`https://pizzaorderfrontend.herokuapp.com/verify/${userdetail.token}`;
                       try {
            
                      sendEmail({
                            to:userdetail.email,
                            subject:"Email verification link",
                            text:`<h4> email verification link</h4>
                            <p>please click on below link to verify the email</p>
                            <a href=${resetURL}>${resetURL}</a>`
                   });
                   
                   
                       } catch (error) {
                         console.log(error);
                       }
                    }).catch((e)=>{
                        res.send({status:500, message:"password not hashed",e,});
                    })
                       
                    
            }
        }
    });
  
    
    }
exports.login= (req,res)=>{
userSchema.findOne({email:req.body.email},(err,user)=>{
       if(user)
            {
                bcrypt.compare(req.body.password,user.password).then((passwordCheck)=>{
                if(!passwordCheck)
                 {
                 return res.send({status:400,message:"please provide correct password"});
                  }
                else if(!user.isVerified){
                const resetURL=`https://pizzaorderfrontend.herokuapp.com/verify/${user.token}`;
                try {sendEmail({
                     to:user.email,
                     subject:"Email verification link",
                     text:`<h4> email verification link</h4>
                     <p>please click on below link to verify the email</p>
                     <a href=${resetURL}>${resetURL}</a>`
            });
            return res.send({status:202,message:"email has been sent"});
    
            } catch (error) {
                  console.log(error);
             }
            }
             else{
                const{_id,name,email}=user;
                const token=jwt.sign({id:user._id},JWT_SIGN_KEY,{expiresIn:'10min'});
                res.send({
                    status:200,
                    message:"Login Successful",
                   name,
                   _id,
                   email,
                    token,
                });
             }}).catch(); 
                   }
                   else{
            res.send({status:404,message:'please provide correct email or sign up first'});
           }
        })
}

exports.confirmationPost=(req,res,next)=>{
    userSchema.findOne({token:req.params.token},(err,user)=>{
        if(!user)
        {
            return res.send({status:400,type:'not-verified',message:"unable to find token or token may have expired"});
        }
       else if(user.isVerified)
       {
        return res.send({status:201,type:'already-verified',message:"user has already been verified"});
       }
       else{
        user.isVerified=true;
        user.save((err,response)=>{
            if(err)
            {
                return res.status(500).send({message:err.message});
            }
            res.send({status:200,message:"the account has been verified.Please Login"});
        })
       }
    })
}        
