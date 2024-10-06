const express = require('express');
const menuController = require('../controllers/menu.controller');
const rbacMiddleware = require('../middleware/rbac.middleware');

const router = express.Router();

router.get('/:role', rbacMiddleware('ADMINISTRATOR'), menuController.getMenuByRole);
router.get('/item/:id', rbacMiddleware('USER'), menuController.getMenuItem);

module.exports = router;