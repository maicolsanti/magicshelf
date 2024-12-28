import express from 'express';
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../controllers/fornitoriController.js';

const router = express.Router();

router.get('/getAll', getAll);
router.get('/getById/:codice_fornitore', getById);
router.post('/create', create);
router.put('/update/:codice_fornitore', update);
router.delete('/remove/:codice_fornitore', remove);

export default router;
