/**
 * @swagger
 * tags:
 *   - name: Materiali
 *     description: Operazioni relative alle localita
 */

import express from 'express';
import { getAll, getById, create, update, remove } from '../controllers/materialiController.js';

const router = express.Router();

/**
 * @swagger
 * /materiali/getAll:
 *   get:
 *     tags:
 *      - Materiali
 *     summary: Retrieves all materials
 *     responses:
 *       200:
 *         description: List of all the materials.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CODICE_MATERIALE:
 *                     type: integer
 *                   DESCRIZIONE_MATERIALE:
 *                     type: string
 *                   MARCA:
 *                     type: string
 *                   CODICE_FORNITORE:
 *                     type: integer
 *                   UNITA_MISURA:
 *                     type: string
 *                   PREZZO_UNITARIO:
 *                     type: number
 *                     format: double
 *                   DATA_INSERIMENTO:
 *                     type: string
 *                     format: date-time
 *                   DATA_ULTIMA_MODIFICA:
 *                     type: string
 *                     format: date-time
 */
router.get('/getAll', getAll);

/**
 * @swagger
 * /materiali/getById/{codice_materiale}:
 *   get:
 *     tags:
 *      - Materiali
 *     summary: Retrieves a material by ID
 *     parameters:
 *       - in: path
 *         name: codice_materiale
 *         required: true
 *         schema:
 *           type: integer
 *         description: Material ID
 *     responses:
 *       200:
 *         description: Details of the material.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CODICE_MATERIALE:
 *                   type: integer
 *                 DESCRIZIONE_MATERIALE:
 *                   type: string
 *                 MARCA:
 *                   type: string
 *                 CODICE_FORNITORE:
 *                   type: integer
 *                 UNITA_MISURA:
 *                   type: string
 *                 PREZZO_UNITARIO:
 *                   type: number
 *                   format: double
 *                 DATA_INSERIMENTO:
 *                   type: string
 *                   format: date-time
 *                 DATA_ULTIMA_MODIFICA:
 *                   type: string
 *                   format: date-time
 */
router.get('/getById/:codice_materiale', getById);

/**
 * @swagger
 * /materiali/create:
 *   post:
 *     tags:
 *      - Materiali
 *     summary: Creates a new material
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               custom_data:
 *                 type: object
 *                 description: Custom data for the material (e.g., description, brand, supplier code).
 *                 properties:
 *                   DESCRIZIONE_MATERIALE:
 *                     type: string
 *                     description: The description of the material (e.g., "Wooden Shelf").
 *                     example: "Wooden Shelf"
 *                   MARCA:
 *                     type: string
 *                     description: The brand of the material (e.g., "Ikea").
 *                     example: "Ikea"
 *                   CODICE_FORNITORE:
 *                     type: integer
 *                     description: The supplier code linked to the material.
 *                     example: 12345
 *                   UNITA_MISURA:
 *                     type: string
 *                     description: The unit of measurement for the material (e.g., "kg", "m").
 *                     example: "m"
 *                   PREZZO_UNITARIO:
 *                     type: number
 *                     format: decimal
 *                     description: The unit price of the material.
 *                     example: 15.99
 *             required:
 *               - custom_data
 *     responses:
 *       200:
 *         description: Material created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the created material.
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
 */
router.post('/create', create);

/**
 * @swagger
 * /materiali/update/{codice_materiale}:
 *   put:
 *     tags:
 *      - Materiali
 *     summary: Updates an existing material
 *     parameters:
 *       - name: codice_materiale
 *         in: path
 *         required: true
 *         description: The unique code of the material to be updated.
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
 *                 description: Custom data to update the material (e.g., description, brand, supplier code).
 *                 properties:
 *                   DESCRIZIONE_MATERIALE:
 *                     type: string
 *                     description: The description of the material.
 *                     example: "Updated Wooden Shelf"
 *                   MARCA:
 *                     type: string
 *                     description: The brand of the material.
 *                     example: "Ikea"
 *                   CODICE_FORNITORE:
 *                     type: integer
 *                     description: The supplier code for the material.
 *                     example: 12345
 *                   UNITA_MISURA:
 *                     type: string
 *                     description: The unit of measurement for the material.
 *                     example: "m"
 *                   PREZZO_UNITARIO:
 *                     type: number
 *                     format: decimal
 *                     description: The unit price of the material.
 *                     example: 16.99
 *             required:
 *               - custom_data
 *     responses:
 *       200:
 *         description: Material updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Material not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/update/:codice_materiale', update);

/**
 * @swagger
 * /materiali/remove/{codice_materiale}:
 *   delete:
 *     tags:
 *      - Materiali
 *     summary: Deletes an existing material
 *     parameters:
 *       - name: codice_materiale
 *         in: path
 *         required: true
 *         description: The unique code of the material to be deleted.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Material deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Material not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/remove/:codice_materiale', remove);

export default router;
