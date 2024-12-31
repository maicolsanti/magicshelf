/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Operazioni relative all'autenticazione
 */

import express from 'express';
import {
    registerCliente,
    loginCliente,
    logoutCliente,
    getProfileCliente
} from '../controllers/authClientiController.js';

const router = express.Router();

/**
 * @swagger
 * /auth/clienti/register:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Registra un nuovo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NOME:
 *                 type: string
 *                 description: Il nome del cliente
 *                 example: "Giulia"
 *               COGNOME:
 *                 type: string
 *                 description: Il cognome del cliente
 *                 example: "Rossi"
 *               CAP:
 *                 type: integer
 *                 description: Il codice postale della località del cliente
 *                 example: 30100
 *               CODICE_ISTAT:
 *                 type: integer
 *                 description: Il codice ISTAT della località del cliente
 *                 example: 23456
 *               EMAIL:
 *                 type: string
 *                 description: Indirizzo email del cliente
 *                 example: "giulia.rossi@example.com"
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
 *         description: La registrazione del cliente è avvenuta correttamente
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
router.post('/register', registerCliente);

/**
 * @swagger
 * /auth/clienti/login:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Login di un cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EMAIL:
 *                 type: string
 *                 description: L'indirizzo email del cliente
 *                 example: "giulia.rossi@example.com"
 *               PASSWORD_HASH:
 *                 type: string
 *                 description: La password del cliente
 *                 example: "TavoloBlu1!"
 *     responses:
 *       200:
 *         description: La login del cliente è avvenuta con successo
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
router.post('/login', loginCliente);

/**
 * @swagger
 * /auth/clienti/logout:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Logout di un cliente
 *     description: Logout di un cliente utilizzando l'access token salvato nel browser
 *     responses:
 *       200:
 *         description: Logout del cliente avvenuto con successo
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
router.post('/logout', logoutCliente);

/**
 * @swagger
 * /auth/clienti/getProfile:
 *   get:
 *     tags:
 *      - Auth
 *     summary: Ritorna il profilo corrente del cliente
 *     responses:
 *       200:
 *         description: Dati del cliente correntemente loggato
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CODICE_CLIENTE:
 *                     type: integer
 *                     description: Il codice cliente univoco
 *                     example: 1
 *                   NOME:
 *                     type: string
 *                     description: Il nome del cliente
 *                     example: "Luca"
 *                   COGNOME:
 *                     type: string
 *                     description: Il cognome del cliente
 *                     example: "Verdi"
 *                   CAP:
 *                     type: integer
 *                     description: Il codice postale del cliente
 *                     example: 20100
 *                   CODICE_ISTAT:
 *                     type: integer
 *                     description: Il codice ISTAT del cliente
 *                     example: 12345
 *                   EMAIL:
 *                     type: string
 *                     description: L'indirizzo email del cliente
 *                     example: "luca.verdi@example.com"
 *                   PHONE_NUMBER:
 *                     type: integer
 *                     description: Il numero di telefono del cliente (se disponibile)
 *                     example: 1234567890
 *                   DATA_INSERIMENTO:
 *                     type: string
 *                     format: date-time
 *                     description: Data e ora dell'inserimento del cliente
 *                     example: "2024-12-29T12:34:56Z"
 *                   DATA_ULTIMA_MODIFICA:
 *                     type: string
 *                     format: date-time
 *                     description: Data e ora dell'ultima modifica al cliente
 *                     example: "2024-12-29T12:34:56Z"
 */
router.get('/getProfile', getProfileCliente);

export default router;