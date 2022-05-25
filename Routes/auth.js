const Router = require('express').Router();
const { login, logout, regisgter } = require('./../Controllers/auth');
const { check } = require('express-validator');

Router.post(
  '/login',
  [
    check('email', 'invild email').isEmail(),
    check('password', 'password should be atleast 3 char').isLength({ min: 3 }),
  ],
  login
);
Router.post(
  '/register',
  [
    check('name', 'name should be more than 3 char').isLength({ min: 3 }),
    check('email', 'email id requried').isEmail(),
    check('password', 'password requried').isLength({ min: 1 }),
  ],
  regisgter
);

Router.post('/logout', logout);

module.exports = Router;
