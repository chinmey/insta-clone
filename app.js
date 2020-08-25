const express=require('express');

const app=express();

const mongoose=require('mongoose');

const {MONGOURI}=require('./config/keys');


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})


mongoose.connection.on('connected',()=>{
    console.log("database connected")
})

require('./models/user')
require('./models/post')

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

const PORT=process.env.PORT||5000;

if(process.env.NODE_ENV==="production")
{
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(_dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("started")
    
})