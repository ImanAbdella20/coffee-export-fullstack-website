import express from 'express';
import { addContact } from '../controller/contactController.js';

const contactRoute = express.Router();

contactRoute.post('/message', addContact)

export default contactRoute;