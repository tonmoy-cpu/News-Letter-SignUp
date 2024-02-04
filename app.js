const express = require("express");
const bodyParser = require("body-parser");
 const app = express();
 const https = require("https");
 app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.post("/",function(req,res){
   const firstname = req.body.Fname;
   const lastname = req.body.Lname;
   const email = req.body.Email;
   const data = {
      members: [
         {
            email_address : email,
            status : "subscribed",
            merge_fields: {
               FNAME: firstname,
               LNAME: lastname
            }
         }

      ]
   };
   const jsonData = JSON.stringify(data);
   const url = "https://us21.api.mailchimp.com/3.0/lists/4f0b5df8f3";
   const options = {
      method: "POST",
      auth: "tom:d271b4c9becdd982787e6ee1a16ccaf6-us21"
   }
   const request = https.request(url,options,function(response){
      response.on("data",function(data){
         console.log(JSON.parse(data));
         if(response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
         }
         else {
            res.sendFile(__dirname+"/failure.html");
         }
      })
   })
   request.write(jsonData);
   request.end();
});
 app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html");
 })
 app.post("/failure",function(req,res){
   res.redirect("/");
 })
 app.listen(3000,function() {
    console.log("server is on port 3000....");
 })



// API key:
//  d271b4c9becdd982787e6ee1a16ccaf6-us21
// LIST ID: 
// 4f0b5df8f3