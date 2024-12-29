/**
 * @swagger
 * tags:
 *   - name: Situazione Materiali
 *     description: Operazioni relative alla gestione delle situazioni dei materiali
 */

import express from 'express';
import { getAll, getById, create, update, remove } from '../controllers/situazione-materialiController.js';

const router = express.Router();

/**
 * @swagger
 * /situazione-materiali/getAll:
 *   get:
 *     tags:
 *       - Situazione Materiali
 *     summary: Recupera tutte le situazioni dei materiali
 *     responses:
 *       200:
 *         description: Lista di tutte le situazioni dei materiali
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CODICE_MATERIALE:
 *                     type: integer
 *                   QUANTITA:
 *                     type: number
 *                     format: decimal
 *                   DATA_ULTIMA_MODIFICA:
 *                     type: string
 *                     format: date-time
 */
router.get('/getAll', getAll);

/**
 * @swagger
 * /situazione-materiali/getById/{codice_materiale}:
 *   get:
 *     tags:
 *       - Situazione Materiali
 *     summary: Recupera la situazione di un materiale specifico
 *     parameters:
 *       - in: path
 *         name: codice_materiale
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli della situazione del materiale
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CODICE_MATERIALE:
 *                   type: integer
 *                 QUANTITA:
 *                   type: number
 *                   format: decimal
 *                 DATA_ULTIMA_MODIFICA:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Materiale non trovato
 */
router.get('/getById/:codice_materiale', getById);

/**
 * @swagger
 * /situazione-materiali/create:
 *   post:
 *     tags:
 *       - Situazione Materiali
 *     summary: Crea una nuova situazione del materiale
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               custom_data:
 *                 type: object
 *                 properties:
 *                   CODICE_MATERIALE:
 *                     type: integer
 *                   QUANTITA:
 *                     type: number
 *                     format: decimal
 *     responses:
 *       200:
 *         description: Situazione del materiale creata con successo
 */
router.post('/create', create);

/**
 * @swagger
 * /situazione-materiali/update/{codice_materiale}:
 *   put:
 *     tags:
 *       - Situazione Materiali
 *     summary: Aggiorna la situazione di un materiale esistente
 *     parameters:
 *       - in: path
 *         name: codice_materiale
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               custom_data:
 *                 type: object
 *                 properties:
 *                   QUANTITA:
 *                     type: number
 *                     format: decimal
 *     responses:
 *       200:
 *         description: Situazione del materiale aggiornata correttamente
 *       404:
 *         description: Materiale non trovato
 */
router.put('/update/:codice_materiale', update);

/**
 * @swagger
 * /situazione-materiali/remove/{codice_materiale}:
 *   delete:
 *     tags:
 *       - Situazione Materiali
 *     summary: Elimina la situazione di un materiale specifico
 *     parameters:
 *       - in: path
 *         name: codice_materiale
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Situazione del materiale eliminata correttamente
 *       404:
 *         description: Materiale non trovato
 */
router.delete('/remove/:codice_materiale', remove);

export default router;
