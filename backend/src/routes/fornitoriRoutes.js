/**
 * @swagger
 * tags:
 *   - name: Fornitori
 *     description: Operazioni relative ai fornitori
 */

import express from 'express';
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../controllers/fornitoriController.js';

const router = express.Router();

/**
 * @swagger
 * /fornitori/getAll:
 *   get:
 *     tags:
 *      - Fornitori
 *     summary: Retrieves all suppliers
 *     responses:
 *       200:
 *         description: List of all suppliers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CODICE_FORNITORE:
 *                     type: integer
 *                     description: The unique supplier code.
 *                     example: 1
 *                   NOME:
 *                     type: string
 *                     description: The first name of the supplier.
 *                     example: "Mario"
 *                   COGNOME:
 *                     type: string
 *                     description: The last name of the supplier.
 *                     example: "Rossi"
 *                   RAGIONE_SOCIALE:
 *                     type: string
 *                     description: The business name of the supplier.
 *                     example: "Rossi S.p.A."
 *                   PARTITA_IVA:
 *                     type: string
 *                     description: The VAT number of the supplier.
 *                     example: "12345678901"
 *                   CODICE_FISCALE:
 *                     type: string
 *                     description: The tax code of the supplier (if available).
 *                     example: "RSSMRA80A01H501Z"
 *                   CAP:
 *                     type: integer
 *                     description: The postal code of the supplier's location.
 *                     example: 40100
 *                   CODICE_ISTAT:
 *                     type: integer
 *                     description: The ISTAT code of the locality.
 *                     example: 12345
 *                   INDIRIZZO:
 *                     type: string
 *                     description: L'indirizzo del fornitore
 *                     example: "Via Rossi 124"
 *                   PHONE_NUMBER:
 *                     type: integer
 *                     description: The supplier's phone number (if available).
 *                     example: 1234567890
 *                   DATA_INSERIMENTO:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the supplier was added.
 *                     example: "2024-12-29T12:34:56Z"
 *                   DATA_ULTIMA_MODIFICA:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the supplier's information was last updated.
 *                     example: "2024-12-29T12:34:56Z"
 */
router.get('/getAll', getAll);

/**
 * @swagger
 * /fornitori/getById/{codice_fornitore}:
 *   get:
 *     tags:
 *      - Fornitori
 *     summary: Retrieves a supplier by its supplier code
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
 *         description: Supplier found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CODICE_FORNITORE:
 *                   type: integer
 *                   description: The unique supplier code.
 *                   example: 1
 *                 NOME:
 *                   type: string
 *                   description: The first name of the supplier.
 *                   example: "Mario"
 *                 COGNOME:
 *                   type: string
 *                   description: The last name of the supplier.
 *                   example: "Rossi"
 *                 RAGIONE_SOCIALE:
 *                   type: string
 *                   description: The business name of the supplier.
 *                   example: "Rossi S.p.A."
 *                 PARTITA_IVA:
 *                   type: string
 *                   description: The VAT number of the supplier.
 *                   example: "12345678901"
 *                 CODICE_FISCALE:
 *                   type: string
 *                   description: The tax code of the supplier (if available).
 *                   example: "RSSMRA80A01H501Z"
 *                 CAP:
 *                   type: integer
 *                   description: The postal code of the supplier's location.
 *                   example: 40100
 *                 CODICE_ISTAT:
 *                   type: integer
 *                   description: The ISTAT code of the locality.
 *                   example: 12345
 *                 INDIRIZZO:
 *                   type: string
 *                   description: L'indirizzo del fornitore
 *                   example: "Via Rossi 124"
 *                 PHONE_NUMBER:
 *                   type: integer
 *                   description: The supplier's phone number (if available).
 *                   example: 1234567890
 *                 DATA_INSERIMENTO:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the supplier was added.
 *                   example: "2024-12-29T12:34:56Z"
 *                 DATA_ULTIMA_MODIFICA:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the supplier's information was last updated.
 *                   example: "2024-12-29T12:34:56Z"
 *       404:
 *         description: Supplier not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Supplier not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/getById/:codice_fornitore', getById);

/**
 * @swagger
 * /fornitori/create:
 *   post:
 *     tags:
 *      - Fornitori
 *     summary: Creates a new supplier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               custom_data:
 *                 type: object
 *                 description: Custom data for the supplier creation.
 *                 properties:
 *                   NOME:
 *                     type: string
 *                     description: The first name of the supplier.
 *                     example: "Giuseppe"
 *                   COGNOME:
 *                     type: string
 *                     description: The last name of the supplier.
 *                     example: "Bianchi"
 *                   RAGIONE_SOCIALE:
 *                     type: string
 *                     description: The business name of the supplier.
 *                     example: "Bianchi S.r.l."
 *                   PARTITA_IVA:
 *                     type: string
 *                     description: The VAT number of the supplier.
 *                     example: "12345678901"
 *                   CODICE_FISCALE:
 *                     type: string
 *                     description: The tax code of the supplier (if available).
 *                     example: "BNCGPP75A01H501Z"
 *                   CAP:
 *                     type: integer
 *                     description: The postal code of the supplier's location.
 *                     example: 50100
 *                   CODICE_ISTAT:
 *                     type: integer
 *                     description: The ISTAT code of the locality.
 *                     example: 23456
 *                   INDIRIZZO:
 *                     type: string
 *                     description: L'indirizzo del fornitore
 *                     example: "Via Rossi 124"
 *                   PHONE_NUMBER:
 *                     type: integer
 *                     description: The supplier's phone number (if available).
 *                     example: 987654321
 *     responses:
 *       200:
 *         description: Supplier created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Supplier created successfully"
 *                 id:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post('/create', create);

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
 *                   example: "Supplier updated successfully"
 *       404:
 *         description: Supplier not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Supplier not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.put('/update/:codice_fornitore', update);

/**
 * @swagger
 * /fornitori/delete/{codice_fornitore}:
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
 *                   example: "Supplier deleted successfully"
 *       404:
 *         description: Supplier not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Supplier not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.delete('/remove/:codice_fornitore', remove);

export default router;
