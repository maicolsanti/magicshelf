import express from 'express';
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../controllers/clientiController.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:codice_cliente', getById);
router.post('/', create);
router.put('/:codice_cliente', update);
router.delete('/:codice_cliente', remove);

export default router;
