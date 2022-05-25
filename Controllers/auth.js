require('dotenv').config();
const { validationResult } = require('express-validator');
const { expressjwt } = require('express-jwt');
const jwt = require('jsonwebtoken');

const User = require('./../Models/user');

exports.login = (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array()[0].msg,
    });
  }

  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'user with that email does not exist',
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'email and password do not match',
      });
    }

    //generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    //put token in cookie
    res.cookie('token', token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

exports.regisgter = (req, res) => {
  const error = validationResult(req);
  const user = new User(req.body);

  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array()[0].msg,
    });
  }

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: 'unable to save user in database',
      });
    }
    res.json(user);
  });
};

exports.logout = (req, res) => {
  res.json({
    message: 'logged out',
  });
};

//middleware
exports.isSignedIn = expressjwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
  algorithms: ['HS256'],
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!checker) {
    return res.status(403).json({
      error: 'ACCESS DENIED',
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 'user') {
    return res.status(403).json({
      error: 'Not a admin',
    });
  }
  next();
};
