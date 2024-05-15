import express from 'express';
import { postManejadorHandler} from '../controller/manejadorHandler.js'

const router = express.Router();

// '/' = /agregar
router.post('/', postManejadorHandler) //http://localhost:3000/agregar

export default router;

