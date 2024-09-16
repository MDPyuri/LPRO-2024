const express = require("express");
const router = express.Router();

const { registerSchema, loginSchema } = require("../schemas/auth");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");
const { authenticateToken } = require("../middlewares/auth");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password } = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    // Remove password before sending response
    delete newUser.password;

    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;