const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const models = require("./models");

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({
  extended: false
}))

app.get('/', function(req, res) {
  res.render("index");
})
app.get('/users', function(req, res) {
  models.User.findAll()
    .then(function(users) {
      res.render('users', {
        userskey: users
      })
    })
})
app.get('/new_user', function(req, res) {
  res.render('new_user')
})
app.get('/update', function(req, res) {
  res.render('update')
})

app.post('/create_user', function(req, res) {
  const userToCreate = models.User.build({
    name: req.body.name,
    email: req.body.email,
    bio: req.body.bio
  });
  userToCreate.save().then(function() {
    res.redirect('/users');
  })
})

app.post('/delete_user/:idOfTheUser', function(req, res) {
  console.log('the id is: ' + req.params.idOfTheUser);
  models.User.destroy({
    where: {
      id: req.params.idOfTheUser
    }
  })
  .then(function() {
    res.redirect('/users')
  });
});

app.post('/update', function(req, res) {
  models.User.update({
    where: {
      id: req.params.idOfTheUser
    }
    .then(function() {
      res.redirect('/users')
    })
  })
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
