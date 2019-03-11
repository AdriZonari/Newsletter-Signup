
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html' );
  });

app.post('/', function(req, res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
      members: [
        {
          email_address: email, 
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }
      ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
      url: 'https://us17.api.mailchimp.com/3.0/lists/6e7f575425',
      method: "POST",
      headers: {
        "Authorization": "adriana1 4ca2b9a0d34b70d2c5c3477d62ec40b8-us17"
      },
      body: jsonData
    };

    request(options, function(error, response, body){
      if(error){
        res.sendFile(__dirname + '/failure.html');
      }else{
        if(response.statusCode === 200){
          res.sendFile(__dirname + '/success.html');
        }else{
          res.sendFile(__dirname + '/failure.html');
        }
      }

    });
});

  app.post("/failure", function(req, res){
    res.redirect('/');

  })
  
  let port = process.env.PORT;
    if (port == null || port == "") {
    port = 8000;
  }
app.listen(port);

  //API key: de5c7b2ee05a0e9f3e565a45f1a738bc-us17

  //list id: 6e7f575425


