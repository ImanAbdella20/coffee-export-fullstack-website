import asyncHandler from 'express-async-handler';
import admin from '../config/fireBaseAdmin.js'; 

export const validateFirebaseToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const idToken = authHeader.split(" ")[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = { _id: decodedToken.uid}
      console.log("Decoded JWT payload:", req.user); // Log decoded token
      next();
    } catch (error) {
      console.error("Firebase ID token validation failed:", error);
      return res.status(401).json({ message: "User is not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "User is not authorized, no token" });
  }
});
