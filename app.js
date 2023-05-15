
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();

app.set("view-engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

//Connecting to MongoDB Atlas
mongoose.connect("mongodb+srv://Priyabrata111:123456789priya@cluster0.5a6mqet.mongodb.net/usersDB");
//mongoose.connect("mongodb://0.0.0.0:27017/usersDB");


const articleSchema = {
    username:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        required:true
    },

    hobbies:[
        {type:String,
        required:true}
    ]
}
const Article = mongoose.model("Article",articleSchema);


// API to get all the users
app.get("/api/users",function(req,res){
    Article.find({}).then(function(foundItem,err){
        if(!err)
        {
           res.status(200).send(foundItem);
            
        }else
        {
            res.status(404).send("Error to fetch Data");
        }
    })
});

//API to get specified user Id from database
app.get("/api/users/:userId",function(req,res){
    
    Article.findOne({_id:req.params.userId}).then(function(foundItem){
        if(foundItem)
        {
            res.status(200).send(foundItem);
        }else{
            res.status(404).send("User Id does not exist");
        }
    },
    function(err){
       res.status(400).send("User Id is Invalid");
    })
});



//API to create a new user to database
app.post("/api/users",function(req,res){
    
    const newArticle = new Article({
        username:req.body.username,
       age:req.body.age,
       hobbies:req.body.hobbies

    });
    newArticle.save().then((foundItem)=>{
        if(foundItem)
        {
           
            res.status(201).send(newArticle); 
        }
    },(err)=>
    {
        if(err)
        {
            res.status(400).send("body does not contain required fields");
        }
    })
});


//API to update the database
app.put("/api/users/:userId",function(req,res){

    Article.findOne({_id:req.params.userId}).then(function(foundItem){
        if(foundItem)
        {

            Article.updateMany(
                {_id:req.params.userId},
                {$set:req.body}
            ).then(foundItem)
            {
                if(foundItem)
                {
                    Article.findOne({_id:req.params.userId}).then(function(foundItem){
                        if(foundItem)
                        {
                            res.status(200).send(foundItem);
                        }
                    })
                }
            }

        }else
        {
            res.status(404).send("User Id does not exist");

        }
    },(err)=>{
        if(err)
        {
            res.status(400).send("User Id is invalid");
        }
    });
});


//API to delete the userId from database 
app.delete("/api/users/:userId",function(req,res){
    Article.deleteOne({_id:req.params.userId}).then((foundItem)=>{
        if(foundItem.deletedCount>=1)
        {
            res.status(204).send("sucessfulyy deleted");  
        }
        else{
            res.status(404).send("There is No such Object");
        }
    },(err)=>{
        res.status(400).send("User Id is Invalid");
    })
})





/************************************************************************************************************************** */

app.listen(4000,()=>{
    console.log("server is live at 4000 port");
});