const router = require('express').Router();
const { getUserById, getUser } = require('./../Controllers/user');

router.param('userId', getUserById);

router.get('/:userId', getUser);

module.exports = router;
