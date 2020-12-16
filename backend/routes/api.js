const express = require('express');
const router = express.Router();
const User = require('../models/product');
const { ObjectId } = require("mongodb");
var db = "";
var MongoClient = require("mongodb").connect(
	"mongodb+srv://favouronix:favouronix@favouronix.bysbl.gcp.mongodb.net/Favouronix?retryWrites=true&w=majority",{useUnifiedTopology:  true},
    function (err, client) {
        if (err) throw err;
        console.log("Connected Successfully");
        db = client.db("Favouronix");
        console.log("Connected to Datavase !");
    }
);
router.get("/viewProducts", function (req, res) { 
    db.collection("Product").find().toArray(function (err, items) {
        if (err) throw err;
       
        res.json(items);
    });
});

router.post('/addProduct', async(req,res) => {
    let reqData=req.body;
    db.collection("Product").insertOne(reqData,function(err,res){
        if(err) console.log(err)
        console.log("Inserted Successfully");
    })
  
})


router.put('/updateProduct/:id',async(req,res)=>{
    var id = req.params.id;
    var item = req.body;
    console.log(id);
    console.log(item);
    db.collection("Product", function (err, collection) {
      collection.updateOne({ "_id": ObjectId(id) }, { $set:item })
      if (err) throw err;
      res.json("Updated Successfully");
    });

})

router.delete('/deleteProduct/:id', async(req, res) => {
    var id = req.params.id
  db.collection("Product", function (err, collection) {
    collection.deleteOne({ "_id": ObjectId(id) }, function (err) {
      if (err) throw err;
    });
    if (err)
        console.log(err);
    else
        console.log("DEleted ")
  });        

})
module.exports = router;

