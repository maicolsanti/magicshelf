import express from 'express';
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../controllers/clientiController.js';

const router = express.Router();

router.get('/getAll', getAll);
router.get('/getById/:codice_cliente', getById);
router.post('/create', create);
router.put('/update/:codice_cliente', update);
router.delete('/remove/:codice_cliente', remove);

export default router;
