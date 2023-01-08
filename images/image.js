const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');

/*------------------------------------------
--------------------------------------------
parse application/json                  Please ap thori help kry na😪😫😥
--------------------------------------------
--------------------------------------------*/
// app.use(bodyParser.json());
  
/*------------------------------------------
--------------------------------------------
image upload code using multer 
--------------------------------------------  mjy idea ni ara, apko 1 mint lgna h
--------------------------------------------*/

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
       cb(null, Date.now() + '-' + file.originalname);
    }
 });
 var upload = multer({ storage: storage });



 //app.use(express.static(__dirname + '/public')); // router.use() maybe 
 //app.use('/uploads', express.static('uploads'));



   //Method one
 router.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
   // req.file is the `profile-file` file
   // req.body will hold the text fields, if there were any
   console.log(JSON.stringify(req.file))
   var response = '<a href="/">Home</a><br>'
   response += "Files uploaded successfully.<br>"
   response += `<img src="${req.file.path}" /><br>`
   return res.send(response)
 })
    
    //Method 2

 //Create New Item** @return response()
 router.post('/api/image-upload', upload.single('image'),(req, res) => {
   const image = req.image;
     res.send(apiResponse({message: 'File uploaded successfully.', image}));
 });
   
 //  * API Response * @return response()
 function apiResponse(results){
     return JSON.stringify({"status": 200, "error": null, "response": results});
 }
   
