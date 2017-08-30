const models = require("./models");

function createUser() {
  const user = models.User.build({
    name: 'Sara Harless',
    email: 'sara.e.harless@gmail.com',
    bio: 'designer developer'
  });

  user.save().then(function (newUser) {
    console.log(newUser.dataValues);
  })
}
createUser();

function listUsers() {
  models.User.findAll().then(function(users) {
    users.forEach(function(user) {
      console.log(user.dataValues);
    })
  })
}
listUsers();
