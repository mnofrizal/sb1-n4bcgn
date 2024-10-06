const express = require('express');
const userRoutes = require('./user.routes');
const menuRoutes = require('./menu.routes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/menu', menuRoutes);

module.exports = router;