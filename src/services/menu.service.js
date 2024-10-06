const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getMenuByRole = async (role) => {
  const menuItems = await prisma.menuItem.findMany({
    where: {
      roles: {
        has: role.toUpperCase()
      }
    },
    orderBy: {
      id: 'asc'
    }
  });

  return buildMenuTree(menuItems);
};

exports.getMenuItemById = async (id, userRole) => {
  const menuItem = await prisma.menuItem.findFirst({
    where: {
      id: parseInt(id),
      roles: {
        has: userRole.toUpperCase()
      }
    }
  });

  return menuItem;
};

function buildMenuTree(items, parentId = null) {
  const result = [];

  for (const item of items) {
    if (item.parentId === parentId) {
      const newItem = { ...item };
      const children = buildMenuTree(items, item.id);
      if (children.length > 0) {
        newItem.children = children;
      }
      result.push(newItem);
    }
  }

  return result;
}