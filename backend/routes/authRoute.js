import express from 'express';
import { getUsersData, login, signUp } from '../controller/authController.js';
import { validateFirebaseToken } from '../middleware/authMiddleware.js';
const authRoute = express.Router();


authRoute.post('/signup', signUp);
authRoute.post('/login', login);
authRoute.get('/data', validateFirebaseToken , getUsersData);

export default authRoute;
