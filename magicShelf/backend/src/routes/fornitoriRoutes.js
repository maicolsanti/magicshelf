import express from 'express';
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../controllers/fornitoriController.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:codice_fornitore', getById);
router.post('/', create);
router.put('/:codice_fornitore', update);
router.delete('/:codice_fornitore', remove);

export default router;
