const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({
  extended: false
}))


// const models = require("./models");

// function createUser() {
//   const user = models.User.build({
//     name: 'Sara Harless',
//     email: 'sara.e.harless@gmail.com',
//     bio: 'designer developer'
//   });
//
//   user.save().then(function (newUser) {
//     console.log(newUser.dataValues);
//   })
// }
// createUser();
//
// function listUsers() {
//   models.User.findAll().then(function(users) {
//     users.forEach(function(user) {
//       console.log(user.dataValues);
//     })
//   })
// }
// listUsers();

app.get('/', function(req,res) {
  res.render("index");
})

app.listen(3000, function() {
  console.log('you did it, or something');
})

process.on('SIGINT', function() {
  console.log("\nshutting down");
  const index = require('./models/index')
  index.sequelize.close()

 // give it a second
  setTimeout(function() {
    console.log('process exit');
    process.exit(0);
  }, 1000)
});
