import express from 'express';
import { getAll, getById, create, update, deleteById } from '../controllers/situazione-materialiController.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:codice_materiale', getById);
router.post('/', create);
router.put('/:codice_materiale', update);
router.delete('/:codice_materiale', deleteById);

export default router;
