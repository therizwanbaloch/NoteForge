const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import JWT
const User = require("../models/user");

const router = express.Router();


const JWT_SECRET = "secretkeyfornoteforge6789&^%@!hshwi";


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });


    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User with this email does not exist",
      });
    }

    
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Wrong credentials",
      });
    }

    
    const token = jwt.sign(
      { id: user._id, name: user.name },
      JWT_SECRET,
      { expiresIn: "1d" } 
    );

    
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token, 
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});

module.exports = router;
