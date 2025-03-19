import express from 'express';
import { addSpecialEdition, getSpecialEdition } from '../controller/specialEditionController.js';

const specialEditionRoute = express.Router();

specialEditionRoute.post('/add' , addSpecialEdition )
specialEditionRoute.get('/' , getSpecialEdition)

export default specialEditionRoute;