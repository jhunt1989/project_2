require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

var mysql = require("mysql");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Liam0515!",
  database: "login"
});

// Middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

function isAuthenticated(req, res, next) {
  if (req.session.loggedin) {
    return next();
  }
  res.redirect('/');
}

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

app.post('/auth', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query(
      'SELECT * FROM accounts WHERE username = ? AND password = ?',
      [username, password],
      function(error, results, fields) {
        if (results.length > 0) {
          // save keys on the session object to access throughout your routes
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect('/view');
        } else {
          response.send('Incorrect Username and/or Password!');
        }
        response.end();
      }
    );
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});

// just an extra route to to test request session data
app.get('/anotherTest', isAuthenticated, function(request, response) {
  response.send('Another example, ' + request.session.username + '!');
});

// This can be attached to a logout button anywhere in your views with an onclick listener
app.get('/logout', (req, res) => {
  req.session.destroy(function() {
    res.redirect('/');
  });
});


// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync({force: false}).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
