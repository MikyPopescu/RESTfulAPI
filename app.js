const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB",{useUnifiedTopology:true, useNewUrlParser:true})

const articleSchema ={
    title: String,
    content: String
};

const Article = mongoose.model("Article",articleSchema);

//chainable routes
app.route("/articles")
    .get(function(req,res){
    Article.find(function(err,foundArticles){
       // console.log(foundArticles); 
       if(!err){
        res.send(foundArticles);
       }
       else{
        res.send(err);
       }
    
    });
})
    .post(function(req,res){
     const newArticle = new Article({
        title: req.body.title,
        content:req.body.content
    });

    newArticle.save(function(err){
        if(!err){
            res.send("Succesfully added a new article!")
        }
        else{
            res.send(err)
        }
    });
})
    .delete(
     function(req,res){
        Article.deleteMany(function(err){
            if(!err){
                res.send("Sucessfully deleted all articles!")
            }
            else{
                res.send(err);
            }
        });
    }
);

//Fetching all the articles
//GET
/*app.get("/articles",function(req,res){
    Article.find(function(err,foundArticles){
       // console.log(foundArticles); 
       if(!err){
        res.send(foundArticles);
       }
       else{
        res.send(err);
       }
    
    });
});*/

//Creating one new article
//POST
/*app.post("/articles",function(req,res){
    const newArticle = new Article({
        title: req.body.title,
        content:req.body.content
    });

    newArticle.save(function(err){
        if(!err){
            res.send("Succesfully added a new article!")
        }
        else{
            res.send(err)
        }
    });
});*/

//Deleting all the articles
//DELETE
// app.delete("/articles",function(req,res){
//     Article.deleteMany(function(err){
//         if(!err){
//             res.send("Sucessfully deleted all articles!")
//         }
//         else{
//             res.send(err);
//         }
//     });
// });

app.listen(8080, function() {
  console.log("Server started on port 8080");
});