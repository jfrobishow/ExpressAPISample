if (process.env.NODE_ENV !== 'production') {
  const result = require('dotenv').config();

  if(result.error){
  	throw result.error;
  }

}

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

let express = require("express");
let bodyParser = require("body-parser");

const CONNECTION_STRING = process.env.CONNECTION_STRING;
let mongoose   = require('mongoose');
mongoose.connect(CONNECTION_STRING); // connect to our database

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let apiRoutes = require('./routes/routes');

app.use('/api', apiRoutes);

let server = app.listen(PORT, HOST, function () {
	console.log("app running at: http://%s:%d", server.address().address, server.address().port);
});