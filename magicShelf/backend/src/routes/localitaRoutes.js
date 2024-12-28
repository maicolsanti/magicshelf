import express from 'express';
import { getAll, getById } from '../controllers/localitaController.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:codice_istat', getById);

export default router;
