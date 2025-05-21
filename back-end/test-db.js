import pkg from '@prisma/client';
const { PrismaClient } = pkg;

import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.user.findMany({ take: 1 });
    console.log('Database connection successful');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
