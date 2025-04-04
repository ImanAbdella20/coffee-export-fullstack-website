import admin from '../config/fireBaseAdmin.js';
import {User} from '../models/authModel.js'
import jwt from 'jsonwebtoken';


// Sign Up Function
export const signUp = async (req, res) => {
    const { username, email, uid } = req.body;
  
    try {
      if (!username || !email || !uid) {
        return res.status(400).json({ message: "All fields are required!" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
      }
  
      const user = new User({ 
          username, 
          email, 
          uid
       });
      await user.save();
      return res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      console.error("Error occurred while signing up:", error);
      return res.status(500).json({ message: "An error occurred" });
    }
  }

  // Login Function
export const login = async (req, res) => {
    const { email, idToken } = req.body;
    try {
  
      if(!idToken){
        throw new Error("ID token is missing");
      }
  
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const { uid } = decodedToken;
  
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ message: "User does not exist" });
      }
  
      // Generate a custome JWT
  
      const token = jwt.sign( { 
        user: 
        { 
          id: uid, 
          email 
        } 
      }, 
      process.env.SECRET_KEY, 
      { 
        expiresIn: '24h' 
      });
  
      return res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
      console.error("Error verifying ID token:", error);
      return res.status(500).json({ message: "Error verifying ID token" });
    }
  }

  export const getUsersData = async(req,res) =>{

    const userId = req.user._id; // Assume the user is authenticated and UID is passed from the middleware

    const user = await User.findOne({ uid: userId });
    if (!user) 
      return res.status(404).json({ error: 'User not found' });
  
    res.json({
      username: user.username,
      email: user.email,
    });
  }