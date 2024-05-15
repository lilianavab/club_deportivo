import express from 'express';
import { putManejadorHandler } from '../controller/manejadorHandler.js'

const router = express.Router();

// '/' = /editar
router.put('/', putManejadorHandler ) //http://localhost:3000/editar

export default router;

