/**
 * @swagger
 * tags:
 *   - name: MaterialiFornitori
 *     description: Situazione dei fornitori incrociata con i relativi materiali
 */

import express from 'express';
import { getAll, getById } from '../controllers/materiali-fornitoriController.js';

const router = express.Router();

/**
 * @swagger
 * /materiali-fornitori/getAll:
 *   get:
 *     tags:
 *      - MaterialiFornitori
 *     summary: Ritorna tutti i fornitori e i relativi materiali presenti
 *     responses:
 *       200:
 *         description: Lista di tutti i fornitori e i loro materiali
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CODICE_FORNITORE:
 *                     type: integer
 *                     description: Il codice univoco del fornitore
 *                     example: 1
 *                   NOME:
 *                     type: string
 *                     description: Il nome del fornitore
 *                     example: "Mario"
 *                   COGNOME:
 *                     type: string
 *                     description: Il cognome del fornitore
 *                     example: "Rossi"
 *                   RAGIONE_SOCIALE:
 *                     type: string
 *                     description: La regione sociale del fornitore
 *                     example: "Rossi S.p.A."
 *                   PARTITA_IVA:
 *                     type: string
 *                     description: La partita IVA del fornitore
 *                     example: "12345678901"
 *                   CODICE_FISCALE:
 *                     type: string
 *                     description: Il codice fiscale del fornitore
 *                     example: "RSSMRA80A01H501Z"
 *                   CAP:
 *                     type: integer
 *                     description: Il codice postale della località del fornitore
 *                     example: 40100
 *                   CODICE_ISTAT:
 *                     type: integer
 *                     description: Il codice ISTAT della località del fornitore
 *                     example: 12345
 *                   INDIRIZZO:
 *                     type: string
 *                     description: L'indirizzo del fornitore
 *                     example: "Via Rossi 124"
 *                   PHONE_NUMBER:
 *                     type: integer
 *                     description: Il numero di telefono del fornitore (se disponibile)
 *                     example: 1234567890
 *                   CODICE_MATERIALE:
 *                     type: integer
 *                     description: Il codice univoco del materiale per quel fornitore
 *                     example: 1
 *                   DESCRIZIONE_MATERIALE:
 *                     type: string
 *                     description: La descrizione del materiale immessa dal fornitore
 *                     example: "Biscotti Gocciole"
 *                   MARCA:
 *                     type: string
 *                     description: La marca del prodotto venduta
 *                     example: "Pavesi"
 *                   UNITA_MISURA:
 *                     type: string
 *                     description: L'unità di misura di unità di prodotto
 *                     example: "PZ"
 *                   PREZZO_UNITARIO:
 *                     type: number
 *                     format: double
 *                     description: Il costo di una unità di prodotto
 *                     example: 5.00
 */
router.get('/getAll', getAll);

/**
 * @swagger
 * /materiali-fornitori/getById/{codice_fornitore}:
 *   get:
 *     tags:
 *      - MaterialiFornitori
 *     summary: Ritorna tutti i fornitori e i relativi materiali presenti
 *     parameters:
 *       - in: path
 *         name: codice_fornitore
 *         required: true
 *         schema:
 *           type: integer
 *         description: Codice univoco del fornitore
 *     responses:
 *       200:
 *         description: Lista di tutti i fornitori e i loro materiali
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CODICE_FORNITORE:
 *                     type: integer
 *                     description: Il codice univoco del fornitore
 *                     example: 1
 *                   NOME:
 *                     type: string
 *                     description: Il nome del fornitore
 *                     example: "Mario"
 *                   COGNOME:
 *                     type: string
 *                     description: Il cognome del fornitore
 *                     example: "Rossi"
 *                   RAGIONE_SOCIALE:
 *                     type: string
 *                     description: La regione sociale del fornitore
 *                     example: "Rossi S.p.A."
 *                   PARTITA_IVA:
 *                     type: string
 *                     description: La partita IVA del fornitore
 *                     example: "12345678901"
 *                   CODICE_FISCALE:
 *                     type: string
 *                     description: Il codice fiscale del fornitore
 *                     example: "RSSMRA80A01H501Z"
 *                   CAP:
 *                     type: integer
 *                     description: Il codice postale della località del fornitore
 *                     example: 40100
 *                   CODICE_ISTAT:
 *                     type: integer
 *                     description: Il codice ISTAT della località del fornitore
 *                     example: 12345
 *                   INDIRIZZO:
 *                     type: string
 *                     description: L'indirizzo del fornitore
 *                     example: "Via Rossi 124"
 *                   PHONE_NUMBER:
 *                     type: integer
 *                     description: Il numero di telefono del fornitore (se disponibile)
 *                     example: 1234567890
 *                   CODICE_MATERIALE:
 *                     type: integer
 *                     description: Il codice univoco del materiale per quel fornitore
 *                     example: 1
 *                   DESCRIZIONE_MATERIALE:
 *                     type: string
 *                     description: La descrizione del materiale immessa dal fornitore
 *                     example: "Biscotti Gocciole"
 *                   MARCA:
 *                     type: string
 *                     description: La marca del prodotto venduta
 *                     example: "Pavesi"
 *                   UNITA_MISURA:
 *                     type: string
 *                     description: L'unità di misura di unità di prodotto
 *                     example: "PZ"
 *                   PREZZO_UNITARIO:
 *                     type: number
 *                     format: double
 *                     description: Il costo di una unità di prodotto
 *                     example: 5.00
 */
router.get('/getById/:codice_fornitore', getById);

export default router;