const express= require('express')
const app=express();
require('dotenv').config();

const bodyParser=require('body-parser')
const mongoose=require('mongoose')

var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({
  extended:true,
}))
app.use(bodyParser.json())
app.use(express.json())

mongoose.connect('mongodb+srv://sricharankasula:Idkidfcare@cluster0.c7kt8r4.mongodb.net/',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }).then(()=>{
    console.log('Connection OK!');
  })
  .catch(err=>console.log(err.message));
  
  const path=require('./models/shortestPath');
  const actual_path=require('./models/actualString');
  const User=require('./models/user');
  app.use(express.json());
  
  
  app.listen(8000, ()=>{
      console.log("Server running on 8000");
  })
  app.post('/register',async (req,res)=>{
    try {
      const { username, gmail, phone} =  JSON.parse(req.body.data);
      const isNewUser = await User.userAlreadyInUse(username);
      if (!isNewUser)
        return res.json({
          success: false,
          message: 'This username is already in use',
        });
      console.log("sucessfull registration");
      const user = await User({
        username, gmail, phone
      });
      await user.save();
      res.json({ success: true, user });
    } catch (error) {
        return res.json(`no reg`);
    }
});

app.get('/userdetails/:username',async(req,res)=>{
  const usename=req.params.username;
  User.find({username:usename},(err,result)=>{
      if(err)
      {
          res.send(err)
      }
      res.send(result)
  })
});

app.post('/path',async(req,res)=>{
  try {
    const {source, destination} =(req.body);
    var ans= await path(source,destination);
    ans=actual_path(ans);
    res.json({ success: true, ans });
  } catch (error) {
    console.log(error);
      return res.json('No path');
  }
});