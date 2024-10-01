import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookies } from "../utils/generateToken.js";
import { oauth2client } from "../utils/googleLogin.js";
import fetch from "node-fetch";



function Logout(req, res) {
  res.clearCookie('token'); // Assumes the token is stored in cookies
  res.status(200).json({ message: "Logout successful" });
}

async function GoogleAuth(req, res) {
  try {
    const { code } = req.query;
    console.log("Authorization code:", code);

    // Exchange the authorization code for an access token
    const { tokens } = await oauth2client.getToken(code);
    oauth2client.setCredentials(tokens);

    console.log("Tokens received:", tokens);

    // Fetch the user's profile information from Google
    const userRes = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
    );

    if (!userRes.ok) {
      throw new Error("Failed to fetch user info from Google");
    }

    const userInfo = await userRes.json();
    console.log("Google User Info:", userInfo);

    const { name, email } = userInfo;
    console.log("User Details:", { name, email });

    // Check if the user already exists in your database
    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user if it doesn't exist
      user = new User({
        name,
        email,
        provider: "google", // Consider adding a provider field
      });
      await user.save();
      
      // New user created, log them in
      generateTokenAndSetCookies(user._id, res);
      return res.status(201).json({...user,success:true});
    }

    // If user exists, log them in
    generateTokenAndSetCookies(user._id, res);
    return res.status(200).json({...user,success:true});
    
  } catch (error) {
    console.log("Error during Google authentication:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export {  Logout, GoogleAuth };
