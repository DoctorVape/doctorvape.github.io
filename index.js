var express = require('express');
var app = express();
var mailler = require('nodemailer');
var low = require('lowdb');
const db= low('db.json');
var bodyParser = require('body-parser');


//var multer = require('multer'); // v1.0.5
//var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

app.set('port', (process.env.PORT || 9000));
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/public/index.html")
});

app.get('/api/:category/:itemId',function(req,res){
     res.send(db.get(req.params.category).find({id:parseInt(req.params.itemId)}).value());
});

app.post("/subscribe", function (req, res) {
  var subscribermail = req.query.mail


});



app.post('/sendmail', function (req, res) {
  var query = require('url').parse(req.url, true).query;
  
  console.log(req.body)
  //console.log(query.sender + " " + query.title + " " + query.text);
  var config = {
    "domains": [
      "yandex.ru"
    ],
    "host": "smtp.yandex.ru",
    "port": 465,
    "secure": true,
    "auth": {
      "user": "me@doctorvape.com.ua",
      "pass": "qBm-uUD-Mvt-PN4"
    }
  }
  // create reusable transporter object using the default SMTP transport
  var transporter = mailler.createTransport(config);

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: "\"" + req.body.email + "\"" + '<me@doctorvape.com.ua>', // sender address
    to: 'me@doctorvape.com.ua', // list of receivers
    subject: req.body.title, // Subject line
    text: req.body.text + " \n contact me " + req.body.email, // plaintext body
    html: req.body.text + " <br> contact me " + req.body.email,// html body
  };
  var result;
   transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.error(error);
    }
    console.log('Message sent: ' + info.response);
  })

  res.json(req.body.title + " we will contact with you soon");
});


app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});