// 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

const express=require('express');

const router=express.Router();
const mongoose=require('mongoose');

const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config/keys")

const User=mongoose.model('User')

const bcrypt=require('bcryptjs')

const requireLogin=require('../middleware/requireLogin');
const { route } = require('./post');

const nodemailer=require('nodemailer')
const sendgridTransport=require('nodemailer-sendgrid-transport')

const transporter=nodemailer.createTransport(sendgridTransport({auth:{
    api_key:"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"
}}))
router.get("/test",requireLogin,(req,res)=>{
    res.send("true");
})

router.post('/signup',(req,res)=>{
    const {name,email,password,pic} = req.body 
    if(!email || !password || !name){
       return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
          return res.status(422).json({error:"user already exists with that email"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
              const user = new User({
                  email,
                  password:hashedpassword,
                  name,
                  pic
              })
      
              user.save()
              .then(user=>{
                   transporter.sendMail({
                       to:user.email,
                      from:"srichinmey.43@gmail.com",
                      subject:"signup success",
                       html:"<h1>welcome to instaclone</h1>"
                   })
                  res.json({message:"saved successfully"})
              })
              .catch(err=>{
                  console.log(err)
              })
        })
       
    })
    .catch(err=>{
      console.log(err)
    })
  })

router.post('/signin',(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password)
    return res.status(400).json({err:"pls add all field"})
    User.findOne({email:email})
    .then(saveduser=>{
        if(!saveduser){
           return res.status(422).json({err:"user not found"})
        }
        bcrypt.compare(password,saveduser.password)
        .then(doMatch=>{
            if(doMatch){
                const token=jwt.sign({_id:saveduser._id},JWT_SECRET)
                //console.log(saveduser)
                const{_id,name,email,followers,following,pic}=saveduser
                res.json({token:token,user:{_id,name,email,followers,following,pic}})
            }
            else
            {
                return res.status(422).json({err:"password not correct"})
            }
        })

    })
})

module.exports=router