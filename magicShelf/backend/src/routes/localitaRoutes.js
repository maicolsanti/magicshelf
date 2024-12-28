import express from 'express';
import { getAll, getById } from '../controllers/localitaController.js';

const router = express.Router();

router.get('/getAll', getAll);
router.get('/getById/:codice_istat', getById);

export default router;
