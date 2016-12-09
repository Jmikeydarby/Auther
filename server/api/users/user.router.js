'use strict';

var router = require('express').Router();

var HttpError = require('../../utils/HttpError');
var User = require('./user.model');
var Story = require('../stories/story.model');

router.param('id', function (req, res, next, id) {
  User.findById(id)
  .then(function (user) {
    if (!user) throw HttpError(404);
    req.requestedUser = user;
    next();
  })
  .catch(next);
});

router.post('/signup', function(req, res, next){
  User.findOrCreate({where: req.body})
      .then(function(user, created){
        if(created === false){
          res.sendStatus(403);
        }else{
          req.session.user = user;
          res.sendStatus(201).redirect('/');
        }
      }).catch((err) => {
        res.status(403)
        next();
      })
});

router.post('/login', function(req, res, next){
  User.findOne({where: req.body})
      .then(function(foundUser){
        if(foundUser === undefined){
          res.sendStatus(401);
        }else{
          req.session.user = foundUser;
          res.sendStatus(204);
        }
      }).catch(next)
})

router.get('/', function (req, res, next) {
  User.findAll({})
  .then(function (users) {
    res.json(users);
  })
  .catch(next);
});

router.post('/', function (req, res, next) {
  User.create(req.body)
  .then(function (user) {
    res.status(201).json(user);
  })
  .catch(next);
});

router.get('/:id', function (req, res, next) {
  req.requestedUser.reload({include: [Story]})
  .then(function (requestedUser) {
    res.json(requestedUser);
  })
  .catch(next);
});

router.put('/:id', function (req, res, next) {
  req.requestedUser.update(req.body)
  .then(function (user) {
    res.json(user);
  })
  .catch(next);
});

router.delete('/:id', function (req, res, next) {
  req.requestedUser.destroy()
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
});

module.exports = router;
