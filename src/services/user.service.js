const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllUsers = async () => {
  return prisma.user.findMany();
};

exports.getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
};

exports.createUser = async (userData) => {
  return prisma.user.create({
    data: userData,
  });
};

exports.updateUser = async (id, userData) => {
  return prisma.user.update({
    where: { id: parseInt(id) },
    data: userData,
  });
};

exports.deleteUser = async (id) => {
  await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  return true;
};