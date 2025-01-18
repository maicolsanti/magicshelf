/**
 * @swagger
 * tags:
 *   - name: Materiali
 *     description: Material operation management
 */

import express from 'express';
import { getAll, getById, create, update, remove } from '../controllers/materialiController.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * /materiali/getAll:
 *   get:
 *     tags:
 *      - Materiali
 *     summary: Retrieves all materials, including their images if available
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
 *                     description: The unique material code.
 *                     example: 1
 *                   DESCRIZIONE_MATERIALE:
 *                     type: string
 *                     description: The material description.
 *                     example: "Gocciole"
 *                   MARCA:
 *                     type: string
 *                     description: The material label.
 *                     example: "Pavesi"
 *                   CODICE_FORNITORE:
 *                     type: integer
 *                     description: The supplier unique code.
 *                     example: 2
 *                   UNITA_MISURA:
 *                     type: string
 *                     description: The unit of measurement.
 *                     example: "PZ"
 *                   PREZZO_UNITARIO:
 *                     type: number
 *                     format: double
 *                     description: The price of the material for one unit of measurement.
 *                     example: 10.0
 *                   DATA_INSERIMENTO:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the material was added.
 *                   DATA_ULTIMA_MODIFICA:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the material's information was last updated.
 *                   IMMAGINE:
 *                     type: string
 *                     description: The Base64 encoded image of the material, if available.
 *                     example: "iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAIAAAD7H..."
 *       401:
 *         description: The user is not logged in
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "This operation requires you to be logged in"
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
 * /materiali/getById/{codice_materiale}:
 *   get:
 *     tags:
 *      - Materiali
 *     summary: Retrieves a material by ID, including its image if available
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
 *                   description: The unique material code.
 *                   example: 1
 *                 DESCRIZIONE_MATERIALE:
 *                   type: string
 *                   description: The material description.
 *                   example: "Gocciole"
 *                 MARCA:
 *                   type: string
 *                   description: The material label.
 *                   example: "Pavesi"
 *                 CODICE_FORNITORE:
 *                   type: integer
 *                   description: The supplier unique code.
 *                   example: 2
 *                 UNITA_MISURA:
 *                   type: string
 *                   description: The unit of measurement.
 *                   example: "PZ"
 *                 PREZZO_UNITARIO:
 *                   type: number
 *                   format: double
 *                   description: The price of the material for one unit of measurement.
 *                   example: 10.0
 *                 DATA_INSERIMENTO:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the material was added.
 *                 DATA_ULTIMA_MODIFICA:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the material's information was last updated.
 *                 IMMAGINE:
 *                   type: string
 *                   description: The Base64 encoded image of the material, if available.
 *                   example: "iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAIAAAD7H..."
 *       401:
 *         description: The user is not logged in
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "This operation requires you to be logged in"
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
router.get('/getById/:codice_materiale', getById);

/**
 * @swagger
 * /materiali/create:
 *   post:
 *     tags:
 *       - Materiali
 *     summary: Creates a new material with optional image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               custom_data:
 *                 type: object
 *                 description: Custom data for the material in JSON format.
 *                 example: |
 *                   {
 *                     "DESCRIZIONE_MATERIALE": "Wooden Shelf",
 *                     "MARCA": "Ikea",
 *                     "CODICE_FORNITORE": 12345,
 *                     "UNITA_MISURA": "m",
 *                     "PREZZO_UNITARIO": 15.99
 *                   }
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional image file for the material.
 *     responses:
 *       200:
 *         description: Material successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Material successfully created"
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the created material.
 *                   example: 1
 *       400:
 *         description: Bad request, invalid data format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid custom_data format"
 *       401:
 *         description: The user is not logged in
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "This operation requires you to be logged in"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.post('/create', upload.single('image'), create);

/**
 * @swagger
 * /materiali/update/{codice_materiale}:
 *   put:
 *     tags:
 *      - Materiali
 *     summary: Updates an existing material, including its image
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               custom_data:
 *                 type: object
 *                 description: Custom data to update the material (in JSON format).
 *                 example: |
 *                   {
 *                     "DESCRIZIONE_MATERIALE": "Updated Wooden Shelf",
 *                     "MARCA": "Ikea",
 *                     "CODICE_FORNITORE": 12345,
 *                     "UNITA_MISURA": "m",
 *                     "PREZZO_UNITARIO": 16.99
 *                   }
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional updated image file for the material.
 *     responses:
 *       200:
 *         description: Material successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Material successfully updated"
 *       401:
 *         description: The user is not logged in
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "This operation requires you to be logged in"
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
router.put('/update/:codice_materiale', upload.single('image'), update);

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
 *       401:
 *         description: The user is not logged in
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "This operation requires you to be logged in"
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
