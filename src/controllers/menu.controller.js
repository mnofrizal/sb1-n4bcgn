const menuService = require('../services/menu.service');

exports.getMenuByRole = async (req, res, next) => {
  try {
    const { role } = req.params;
    const menu = await menuService.getMenuByRole(role);
    res.json(menu);
  } catch (error) {
    next(error);
  }
};

exports.getMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userRole = req.user.role; // Assuming you have user information in the request
    const menuItem = await menuService.getMenuItemById(id, userRole);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found or access denied' });
    }
    res.json(menuItem);
  } catch (error) {
    next(error);
  }
};