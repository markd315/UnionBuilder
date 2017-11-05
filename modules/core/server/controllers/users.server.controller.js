/* Dependencies */
var mongoose = require('mongoose'), 
    User = require('../../../users/server/models/user.server.model.js');

/* Create a user */
exports.create = function(req, res) {

  /* Instantiate a User */
  var user = new User(req.body);

  /* Then save the user */
  user.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });
};

/* Show the current user */
exports.read = function(req, res) {
  /* send back the user as json from the request */
  res.json(req.user);
};

/* Update a user */
exports.update = function(req, res) {
  var user = req.user;

  /* Replace the item's properties with the new properties found in req.body */
  //TODO replace whatever attributes we will need from this request.
  user.name = req.body.name;
  user.code = req.body.code;
  user.address = req.body.address;

  /* Save the item */
  user.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });
};

/* Delete a user */
exports.delete = function(req, res) {
  var user = req.user;

  /* Remove the item */
  user.remove(function(err) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.end();
    }
  });
};

/* Retreive all the directory users, sorted alphabetically by user code */
exports.list = function(req, res) {
  //TODO find a new field to sort users by.
  User.find().sort('code').exec(function(err, users) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.json(users);
    }
  });
};

/* 
  Middleware: find a user by its ID, then pass it to the next request handler. 
  HINT: Find the user using a mongoose query, 
        bind it to the request object as the property 'user', 
        then finally call next
 */
exports.userByID = function(req, res, next, id) {
  User.findById(id).exec(function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.user = user;
      next();
    }
  });
};
