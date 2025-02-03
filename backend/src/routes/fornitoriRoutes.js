/**
 * @swagger
 * tags:
 *   - name: Fornitori
 *     description: Suppliers management operation
 */

import express from 'express';
import {
  update,
  remove,
} from '../controllers/fornitoriController.js';

const router = express.Router();

/**
 * @swagger
 * /fornitori/update/{codice_fornitore}:
 *   put:
 *     tags:
 *      - Fornitori
 *     summary: Updates a supplier by its supplier code
 *     parameters:
 *       - name: codice_fornitore
 *         in: path
 *         required: true
 *         description: The unique supplier code.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               custom_data:
 *                 type: object
 *                 description: Custom data to update the supplier.
 *                 properties:
 *                   NOME:
 *                     type: string
 *                     example: "Giovanni"
 *                   COGNOME:
 *                     type: string
 *                     example: "Verdi"
 *                   RAGIONE_SOCIALE:
 *                     type: string
 *                     example: "Verdi S.p.A."
 *                   PARTITA_IVA:
 *                     type: string
 *                     example: "23456789012"
 *                   CODICE_FISCALE:
 *                     type: string
 *                     example: "VRDGVN80A01H501X"
 *                   CAP:
 *                     type: integer
 *                     example: 40200
 *                   CODICE_ISTAT:
 *                     type: integer
 *                     example: 12345
 *                   INDIRIZZO:
 *                     type: string
 *                     description: L'indirizzo del fornitore
 *                     example: "Via Rossi 124"
 *                   PHONE_NUMBER:
 *                     type: integer
 *                     example: 1122334455
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Supplier successfully updated"
 *       401:
 *         description: The user is not logged in
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "This operation requires you to be logged in"
 *       403:
 *         description: The user has not the permission
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Insufficient permission"
 *       404:
 *         description: Supplier not found
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Supplier not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.put('/update/:codice_fornitore', update);

/**
 * @swagger
 * /fornitori/remove/{codice_fornitore}:
 *   delete:
 *     tags:
 *      - Fornitori
 *     summary: Deletes a supplier by its supplier code
 *     parameters:
 *       - name: codice_fornitore
 *         in: path
 *         required: true
 *         description: The unique supplier code.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Supplier successfully removed"
 *       401:
 *         description: The user is not logged in
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "This operation requires you to be logged in"
 *       403:
 *         description: The user has not the permission
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Insufficient permission"
 *       404:
 *         description: Supplier not found
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Supplier not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.delete('/remove/:codice_fornitore', remove);

export default router;
