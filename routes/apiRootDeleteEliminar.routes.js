import express from 'express';
import { deleteManejadorHandler } from '../controller/manejadorHandler.js'

const router = express.Router();

// '/' = /eliminar
router.delete('/:nombre', deleteManejadorHandler ) //http://localhost:3000/eliminar

export default router;

