/**
 * @swagger
 * tags:
 *   - name: Situazione Materiali
 *     description: Material situation operation management
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
 *     summary: Retrieve all material situations
 *     description: Fetches all material situations from the database, including the current quantity and last modification date.
 *     responses:
 *       200:
 *         description: List of all material situations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CODICE_MATERIALE:
 *                     type: integer
 *                     description: Unique code of the material
 *                     example: 1
 *                   QUANTITA:
 *                     type: number
 *                     format: decimal
 *                     description: Current quantity of the material
 *                     example: 150.75
 *                   DATA_ULTIMA_MODIFICA:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time of the last modification
 *                     example: "2025-01-02T14:35:00Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.get('/getAll', getAll);

/**
 * @swagger
 * /situazione-materiali/getById/{codice_materiale}:
 *   get:
 *     tags:
 *       - Situazione Materiali
 *     summary: Retrieve the situation of a specific material
 *     description: Fetches the situation of a material by its unique ID, including its current quantity and the last modification date.
 *     parameters:
 *       - in: path
 *         name: codice_materiale
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique code of the material
 *     responses:
 *       200:
 *         description: Details of the material's situation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CODICE_MATERIALE:
 *                   type: integer
 *                   description: Unique code of the material
 *                   example: 1
 *                 QUANTITA:
 *                   type: number
 *                   format: decimal
 *                   description: Current quantity of the material
 *                   example: 150.75
 *                 DATA_ULTIMA_MODIFICA:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time of the last modification
 *                   example: "2025-01-02T14:35:00Z"
 *       404:
 *         description: Material situation not found
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Material situation not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.get('/getById/:codice_materiale', getById);

/**
 * @swagger
 * /situazione-materiali/create:
 *   post:
 *     tags:
 *       - Situazione Materiali
 *     summary: Create a new material situation
 *     description: Adds a new material situation to the database with the provided custom data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               custom_data:
 *                 type: object
 *                 description: Custom data for the material situation to be created
 *                 example:
 *                   CODICE_MATERIALE: 1
 *                   QUANTITA: 200.50
 *                   DATA_ULTIMA_MODIFICA: "2025-01-02T14:00:00Z"
 *     responses:
 *       200:
 *         description: Material situation successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Material situation successfully created"
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the newly created material situation
 *                   example: 123
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.post('/create', create);

/**
 * @swagger
 * /situazione-materiali/update/{codice_materiale}:
 *   put:
 *     tags:
 *       - Situazione Materiali
 *     summary: Update an existing material situation
 *     description: Updates the details of a material situation in the database using the provided material code and custom data.
 *     parameters:
 *       - in: path
 *         name: codice_materiale
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the material situation to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               custom_data:
 *                 type: object
 *                 description: Updated data for the material situation
 *                 example:
 *                   QUANTITA: 150.75
 *                   DATA_ULTIMA_MODIFICA: "2025-01-02T16:00:00Z"
 *     responses:
 *       200:
 *         description: Material situation successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Material situation successfully updated"
 *       404:
 *         description: Material not found
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Material not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.put('/update/:codice_materiale', update);

/**
 * @swagger
 * /situazione-materiali/remove/{codice_materiale}:
 *   delete:
 *     tags:
 *       - Situazione Materiali
 *     summary: Delete a material situation
 *     description: Deletes a material situation from the database based on the provided material code.
 *     parameters:
 *       - in: path
 *         name: codice_materiale
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the material situation to be deleted
 *     responses:
 *       200:
 *         description: Material situation successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Material situation successfully deleted"
 *       404:
 *         description: Material not found
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Material not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.delete('/remove/:codice_materiale', remove);

export default router;
