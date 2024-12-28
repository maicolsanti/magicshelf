import express from 'express';
import { getAll, getById, create, update, remove } from '../controllers/materialiController.js';

const router = express.Router();

router.get('/getAll', getAll);
router.get('/getById/:codice_materiale', getById);
router.post('/create', create);
router.put('/update/:codice_materiale', update);
router.delete('/remove/:codice_materiale', remove);

export default router;
