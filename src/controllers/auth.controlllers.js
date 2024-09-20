import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookies } from "../utils/generateToken.js";

async function Sighup(req, res) {
  console.log("hello");
  try {
    const { name, email, password } = req.body;
    const existingEmail = await User.findOne({ email });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (existingEmail) {
      return res.status(400).json({ error: "Email already registered" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be greater than 6 character" });
    }
    // HASH PASSWORD //
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    if (newUser) {
      generateTokenAndSetCookies(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function Login(req,res) {
  try {
    const { userName, password } = req.body;
    const findUser = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      findUser?.password || ""
    );
    if (!isPasswordCorrect || !findUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateTokenAndSetCookies(findUser._id, res);
    res.status(201).json({
      _id: findUser._id,
      name: findUser.name,
      email: findUser.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

function Logout() {
  console.log("Logout");
}

export { Sighup, Login, Logout };
