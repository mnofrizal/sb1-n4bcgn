const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const rbacMiddleware = (requiredRole) => async (req, res, next) => {
  const userId = req.user.id; // Assuming you have user information in the request
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (user && user.role === requiredRole) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};

module.exports = rbacMiddleware;