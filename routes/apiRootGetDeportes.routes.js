import express from 'express';
import { getManejadorHandler } from '../controller/manejadorHandler.js'

const router = express.Router();

// '/' = /deportes
router.get('/', getManejadorHandler ) //http://localhost:3000/deportes

export default router;

