/**
 * @swagger
 * tags:
 *   - name: AuthFornitori
 *     description: Suppliers Authentication
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
 *      - AuthFornitori
 *     summary: Register a new supplier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NOME:
 *                 type: string
 *                 description: The supplier's first name
 *                 example: "Giulia"
 *               COGNOME:
 *                 type: string
 *                 description: The supplier's last name
 *                 example: "Rossi"
 *               RAGIONE_SOCIALE:
 *                 type: string
 *                 description: The legal name of the supplier
 *                 example: "Panificio Rossi SRL"
 *               PARTITA_IVA:
 *                 type: string
 *                 description: The supplier's VAT number
 *                 example: IT01020304056
 *               CODICE_FISCALE:
 *                 type: string
 *                 description: The supplier's tax code
 *                 example: PNSMSC02M28C573I
 *               CAP:
 *                 type: integer
 *                 description: The postal code of the supplier's location
 *                 example: 30100
 *               CODICE_ISTAT:
 *                 type: integer
 *                 description: The ISTAT code of the supplier's location
 *                 example: 23456
 *               INDIRIZZO:
 *                 type: string
 *                 description: The address of the supplier's location
 *                 example: "Via Rossi 123"
 *               PHONE_NUMBER:
 *                 type: integer
 *                 description: The supplier's phone number (if available)
 *                 example: 987654321
 *               PASSWORD_HASH:
 *                 type: string
 *                 description: The supplier's password
 *                 example: "TavoloBlu1!"
 *     responses:
 *       200:
 *         description: The supplier registration was successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Supplier registration successful"
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: The "codice fiscale" being used for registration is already in use
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: 'The provided "codice fiscale" is already in use'
 *       401:
 *         description: Registration can only occur after logging out
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "You must log out before registering a new account"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.post('/register', registerFornitore);

/**
 * @swagger
 * /auth/fornitori/login:
 *   post:
 *     tags:
 *      - AuthFornitori
 *     summary: Supplier login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CODICE_FISCALE:
 *                 type: string
 *                 description: The supplier's tax code
 *                 example: "giulia.rossi@example.com"
 *               PASSWORD_HASH:
 *                 type: string
 *                 description: The supplier's password
 *                 example: "TavoloBlu1!"
 *     responses:
 *       200:
 *         description: Supplier login was successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: The supplier trying to log in is not registered yet
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Supplier not registered"
 *       403:
 *         description: The inserted login credentials are invalid
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Incorrect credentials"
 *       401:
 *         description: Login can only occur after logging out
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "You must log out before logging in again"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.post('/login', loginFornitore);

/**
 * @swagger
 * /auth/fornitori/logout:
 *   post:
 *     tags:
 *      - AuthFornitori
 *     summary: Supplier logout
 *     description: Supplier logout using the access token saved in the browser
 *     responses:
 *       200:
 *         description: Supplier logout was successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successful"
 *       401:
 *         description: Login can only occur after logging out
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "You must be logged in to log out"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.post('/logout', logoutFornitore);

/**
 * @swagger
 * /auth/fornitori/getProfile:
 *   get:
 *     tags:
 *      - AuthFornitori
 *     summary: Returns the current supplier profile
 *     responses:
 *       200:
 *         description: Data of the currently logged-in supplier
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CODICE_FORNITORE:
 *                     type: integer
 *                     description: The unique supplier code
 *                     example: 1
 *                   NOME:
 *                     type: string
 *                     description: The supplier's first name
 *                     example: "Luca"
 *                   COGNOME:
 *                     type: string
 *                     description: The supplier's last name
 *                     example: "Verdi"
 *                   RAGIONE_SOCIALE:
 *                     type: string
 *                     description: The supplier's business name
 *                     example: "Panificio Verdi SRL"
 *                   PARTITA_IVA:
 *                     type: string
 *                     description: The supplier's VAT number
 *                     example: IT01020304056
 *                   CODICE_FISCALE:
 *                     type: string
 *                     description: The supplier's tax code
 *                     example: LVSMSE02M28C573I
 *                   CAP:
 *                     type: integer
 *                     description: The supplier's postal code
 *                     example: 20100
 *                   CODICE_ISTAT:
 *                     type: integer
 *                     description: The supplier's ISTAT code
 *                     example: 12345
 *                   INDIRIZZO:
 *                     type: string
 *                     description: The adress of the supplier's location
 *                     example: "Via Rossi 123"
 *                   PHONE_NUMBER:
 *                     type: integer
 *                     description: The supplier's phone number (if available)
 *                     example: 1234567890
 *                   DATA_INSERIMENTO:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time the supplier was added
 *                     example: "2024-12-29T12:34:56Z"
 *                   DATA_ULTIMA_MODIFICA:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time of the last update to the supplier
 *                     example: "2024-12-29T12:34:56Z"
 *       401:
 *         description: The login operation can only be performed after logging out
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "You must be logged in to view your profile"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.get('/getProfile', getProfileFornitore);

export default router;