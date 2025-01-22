/**
 * @swagger
 * tags:
 *   - name: MaterialiFornitori
 *     description: Supplier's material situation
 */

import express from 'express';
import { getAll, getById, getFiltered } from '../controllers/materiali-fornitoriController.js';

const router = express.Router();

/**
 * @swagger
 * /materiali-fornitori/getAll:
 *   get:
 *     tags:
 *      - MaterialiFornitori
 *     summary: Returns all suppliers and their respective materials
 *     responses:
 *       200:
 *         description: List of all suppliers and their materials.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CODICE_FORNITORE:
 *                     type: integer
 *                     description: The unique code of the supplier.
 *                     example: 1
 *                   NOME:
 *                     type: string
 *                     description: The supplier's first name.
 *                     example: "Mario"
 *                   COGNOME:
 *                     type: string
 *                     description: The supplier's last name.
 *                     example: "Rossi"
 *                   RAGIONE_SOCIALE:
 *                     type: string
 *                     description: The legal name of the supplier.
 *                     example: "Rossi S.p.A."
 *                   PARTITA_IVA:
 *                     type: string
 *                     description: The supplier's VAT number.
 *                     example: "12345678901"
 *                   CODICE_FISCALE:
 *                     type: string
 *                     description: The supplier's tax code.
 *                     example: "RSSMRA80A01H501Z"
 *                   CAP:
 *                     type: integer
 *                     description: The postal code of the supplier's location.
 *                     example: 40100
 *                   CODICE_ISTAT:
 *                     type: integer
 *                     description: The ISTAT code of the supplier's location.
 *                     example: 12345
 *                   INDIRIZZO:
 *                     type: string
 *                     description: The address of the supplier.
 *                     example: "Via Rossi 124"
 *                   PHONE_NUMBER:
 *                     type: integer
 *                     description: The supplier's phone number (if available).
 *                     example: 1234567890
 *                   CODICE_MATERIALE:
 *                     type: integer
 *                     description: The unique code of the material for that supplier.
 *                     example: 1
 *                   DESCRIZIONE_MATERIALE:
 *                     type: string
 *                     description: The description of the material provided by the supplier.
 *                     example: "Biscotti Gocciole"
 *                   MARCA:
 *                     type: string
 *                     description: The brand of the product sold.
 *                     example: "Pavesi"
 *                   UNITA_MISURA:
 *                     type: string
 *                     description: The unit of measurement for the product.
 *                     example: "PZ"
 *                   PREZZO_UNITARIO:
 *                     type: number
 *                     format: double
 *                     description: The cost per unit of the product.
 *                     example: 5.00
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
 * /materiali-fornitori/getById/{codice_fornitore}:
 *   get:
 *     tags:
 *      - MaterialiFornitori
 *     summary: Returns all materials for a specific supplier by their unique code
 *     parameters:
 *       - in: path
 *         name: codice_fornitore
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique code of the supplier
 *     responses:
 *       200:
 *         description: List of all materials for the specified supplier
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CODICE_FORNITORE:
 *                     type: integer
 *                     description: Unique code of the supplier
 *                     example: 1
 *                   NOME:
 *                     type: string
 *                     description: The supplier's first name
 *                     example: "Mario"
 *                   COGNOME:
 *                     type: string
 *                     description: The supplier's last name
 *                     example: "Rossi"
 *                   RAGIONE_SOCIALE:
 *                     type: string
 *                     description: The legal name of the supplier
 *                     example: "Rossi S.p.A."
 *                   PARTITA_IVA:
 *                     type: string
 *                     description: The supplier's VAT number
 *                     example: "12345678901"
 *                   CODICE_FISCALE:
 *                     type: string
 *                     description: The supplier's tax code
 *                     example: "RSSMRA80A01H501Z"
 *                   CAP:
 *                     type: integer
 *                     description: The postal code of the supplier's location
 *                     example: 40100
 *                   CODICE_ISTAT:
 *                     type: integer
 *                     description: The ISTAT code of the supplier's location
 *                     example: 12345
 *                   INDIRIZZO:
 *                     type: string
 *                     description: The address of the supplier
 *                     example: "Via Rossi 124"
 *                   PHONE_NUMBER:
 *                     type: integer
 *                     description: The supplier's phone number (if available)
 *                     example: 1234567890
 *                   CODICE_MATERIALE:
 *                     type: integer
 *                     description: Unique code of the material for the supplier
 *                     example: 1
 *                   DESCRIZIONE_MATERIALE:
 *                     type: string
 *                     description: Description of the material provided by the supplier
 *                     example: "Biscotti Gocciole"
 *                   MARCA:
 *                     type: string
 *                     description: Brand of the product sold
 *                     example: "Pavesi"
 *                   UNITA_MISURA:
 *                     type: string
 *                     description: Unit of measurement for the product
 *                     example: "PZ"
 *                   PREZZO_UNITARIO:
 *                     type: number
 *                     format: double
 *                     description: Cost per unit of the product
 *                     example: 5.00
 *       404:
 *         description: The supplier material is not found
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Supplier material not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.get('/getById/:codice_fornitore', getById);

/**
 * @swagger
 * /materiali-fornitori/getFiltered:
 *   post:
 *     tags:
 *       - MaterialiFornitori
 *     summary: Retrieve materials dynamically based on filters
 *     description: This endpoint allows the client to search for materials in the database using dynamic filters. Filters such as material description, brand, supplier, price range, and location-based criteria can be applied.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               DESCRIZIONE_MATERIALE:
 *                 type: string
 *                 description: The description of the material to search for (supports partial matches).
 *                 example: "Gocciole"
 *               MARCA:
 *                 type: string
 *                 description: The brand of the material.
 *                 example: "Pavesi"
 *               FORNITORE:
 *                 type: string
 *                 description: The supplier's name.
 *                 example: "Conad"
 *               PREZZO_UNITARIO:
 *                 type: array
 *                 items:
 *                   type: number
 *                   format: float
 *                 description: The price range for the material (min and max values).
 *                 example: [5, 10]
 *               ZONA_DI_RICERCA:
 *                 type: string
 *                 description: The search area. Options are 'Dentro il Comune' or 'Fuori dal Comune'.
 *                 example: "Fuori dal Comune"
 *               ZONA_DI_PARTENZA:
 *                 type: string
 *                 description: The starting zone for the search.
 *                 example: "Roma"
 *     responses:
 *       200:
 *         description: A list of materials matching the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CODICE_FORNITORE:
 *                     type: integer
 *                     description: Unique code of the supplier
 *                     example: 1
 *                   NOME:
 *                     type: string
 *                     description: The supplier's first name
 *                     example: "Mario"
 *                   COGNOME:
 *                     type: string
 *                     description: The supplier's last name
 *                     example: "Rossi"
 *                   RAGIONE_SOCIALE:
 *                     type: string
 *                     description: The legal name of the supplier
 *                     example: "Rossi S.p.A."
 *                   PARTITA_IVA:
 *                     type: string
 *                     description: The supplier's VAT number
 *                     example: "12345678901"
 *                   CODICE_FISCALE:
 *                     type: string
 *                     description: The supplier's tax code
 *                     example: "RSSMRA80A01H501Z"
 *                   CAP:
 *                     type: integer
 *                     description: The postal code of the supplier's location
 *                     example: 40100
 *                   CODICE_ISTAT:
 *                     type: integer
 *                     description: The ISTAT code of the supplier's location
 *                     example: 12345
 *                   INDIRIZZO:
 *                     type: string
 *                     description: The address of the supplier
 *                     example: "Via Rossi 124"
 *                   PHONE_NUMBER:
 *                     type: integer
 *                     description: The supplier's phone number (if available)
 *                     example: 1234567890
 *                   CODICE_MATERIALE:
 *                     type: integer
 *                     description: Unique code of the material for the supplier
 *                     example: 1
 *                   DESCRIZIONE_MATERIALE:
 *                     type: string
 *                     description: Description of the material provided by the supplier
 *                     example: "Biscotti Gocciole"
 *                   MARCA:
 *                     type: string
 *                     description: Brand of the product sold
 *                     example: "Pavesi"
 *                   UNITA_MISURA:
 *                     type: string
 *                     description: Unit of measurement for the product
 *                     example: "PZ"
 *                   PREZZO_UNITARIO:
 *                     type: number
 *                     format: double
 *                     description: Cost per unit of the product
 *                     example: 5.00
 *       400:
 *         description: Invalid request or missing filters.
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Invalid filters provided."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error."
 */
router.post('/getFiltered', getFiltered);

export default router;