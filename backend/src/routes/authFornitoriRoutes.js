/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Operazioni relative all'autenticazione dei clienti
 */

import express from 'express';
import {
    registerFornitore,
    loginFornitore,
    logoutFornitore,
    getProfileFornitore
} from '../controllers/authFornitoriController.js';

const router = express.Router();

/**
 * @swagger
 * /auth/fornitori/register:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Registra un nuovo fornitore
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NOME:
 *                 type: string
 *                 description: Il nome del fornitore
 *                 example: "Giulia"
 *               COGNOME:
 *                 type: string
 *                 description: Il cognome del fornitore
 *                 example: "Rossi"
 *               RAGIONE_SOCIALE:
 *                 type: string
 *                 description: La ragione sociale del fornitore
 *                 example: "Panificio Rossi SRL"
 *               PARTITA_IVA:
 *                 type: string
 *                 description: La partita IVA del fornitore
 *                 example: IT01020304056
 *               CODICE_FISCALE:
 *                 type: string
 *                 description: Il codice fiscale del fornitore
 *                 example: PNSMSC02M28C573I
 *               CAP:
 *                 type: integer
 *                 description: Il codice postale della località del fornitore
 *                 example: 30100
 *               CODICE_ISTAT:
 *                 type: integer
 *                 description: Il codice ISTAT della località del cliente
 *                 example: 23456
 *               PHONE_NUMBER:
 *                 type: integer
 *                 description: Il numero di telefono del cliente (se disponibile)
 *                 example: 987654321
 *               PASSWORD_HASH:
 *                 type: string
 *                 description: La password del cliente
 *                 example: "TavoloBlu1!"
 *     responses:
 *       200:
 *         description: La registrazione del fornitore è avvenuta correttamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registrazione avvenuta con successo"
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: La mail con cui ci si sta cercando di registrarsi è già utilizzata
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Email già in uso"
 *       401:
 *         description: L'operazione di registrazione può avvenire solo dopo aver eseguito il logout
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Questa operazione richiede il logout"
 *       500:
 *         description: Errore interno del server
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Errore interno del server"
 */
router.post('/register', registerFornitore);

/**
 * @swagger
 * /auth/fornitori/login:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Login di un fornitore
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CODICE_FISCALE:
 *                 type: string
 *                 description: L'indirizzo email del fornitore
 *                 example: "giulia.rossi@example.com"
 *               PASSWORD_HASH:
 *                 type: string
 *                 description: La password del fornitore
 *                 example: "TavoloBlu1!"
 *     responses:
 *       200:
 *         description: La login del fornitore è avvenuta con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login avvenuto con successo"
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: L'utente che sta cercando di fare la login non è ancora registrato
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Utente non registrato"
 *       401:
 *         description: L'operazione di login può avvenire solo dopo aver eseguita il logout
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Questa operazione richiede il logout"
 *       500:
 *         description: Errore interno del server
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Errore interno del server"
 */
router.post('/login', loginFornitore);

/**
 * @swagger
 * /auth/fornitori/logout:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Logout di un fornitore
 *     description: Logout di un fornitore utilizzando l'access token salvato nel browser
 *     responses:
 *       200:
 *         description: Logout del fornitore avvenuto con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout avvenuto con successo"
 *       401:
 *         description: L'operazione di login può avvenire solo dopo aver eseguita il logout
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Questa operazione richiede il logout"
 *       500:
 *         description: Errore interno del server
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Errore interno del server"
 */
router.post('/logout', logoutFornitore);

/**
 * @swagger
 * /auth/fornitori/getProfile:
 *   get:
 *     tags:
 *      - Auth
 *     summary: Ritorna il profilo corrente del fornitore
 *     responses:
 *       200:
 *         description: Dati del fornitore correntemente loggato
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CODICE_FORNITORE:
 *                     type: integer
 *                     description: Il codice fornitore univoco
 *                     example: 1
 *                   NOME:
 *                     type: string
 *                     description: Il nome del fornitore
 *                     example: "Luca"
 *                   COGNOME:
 *                     type: string
 *                     description: Il cognome del fornitore
 *                     example: "Verdi"
 *                   RAGIONE_SOCIALE:
 *                     type: string
 *                     description: La ragione sociale del fornitore
 *                     example: "Panificio Verdi SRL"
 *                   PARTITA_IVA:
 *                     type: string
 *                     description: La partita IVA del fornitore
 *                     example: IT01020304056
 *                   CODICE_FISCALE:
 *                     type: string
 *                     description: Il codice fiscale del fornitore
 *                     example: LVSMSE02M28C573I
 *                   CAP:
 *                     type: integer
 *                     description: Il codice postale del fornitore
 *                     example: 20100
 *                   CODICE_ISTAT:
 *                     type: integer
 *                     description: Il codice ISTAT del fornitore
 *                     example: 12345
 *                   PHONE_NUMBER:
 *                     type: integer
 *                     description: Il numero di telefono del fornitore (se disponibile)
 *                     example: 1234567890
 *                   DATA_INSERIMENTO:
 *                     type: string
 *                     format: date-time
 *                     description: Data e ora dell'inserimento del fornitore
 *                     example: "2024-12-29T12:34:56Z"
 *                   DATA_ULTIMA_MODIFICA:
 *                     type: string
 *                     format: date-time
 *                     description: Data e ora dell'ultima modifica al fornitore
 *                     example: "2024-12-29T12:34:56Z"
 */
router.get('/getProfile', getProfileFornitore);

export default router;