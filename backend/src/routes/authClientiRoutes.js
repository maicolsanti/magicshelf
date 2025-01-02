/**
 * @swagger
 * tags:
 *   - name: AuthClienti
 *     description: Clients authentication
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
 *      - AuthClienti
 *     summary: Register a new client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NOME:
 *                 type: string
 *                 description: The client's first name
 *                 example: "Giulia"
 *               COGNOME:
 *                 type: string
 *                 description: The client's last name
 *                 example: "Rossi"
 *               CAP:
 *                 type: integer
 *                 description: The postal code of the client's location
 *                 example: 30100
 *               CODICE_ISTAT:
 *                 type: integer
 *                 description: The ISTAT code of the client's location
 *                 example: 23456
 *               EMAIL:
 *                 type: string
 *                 description: The client's email address
 *                 example: "giulia.rossi@example.com"
 *               PHONE_NUMBER:
 *                 type: integer
 *                 description: The client's phone number (if available)
 *                 example: 987654321
 *               PASSWORD_HASH:
 *                 type: string
 *                 description: The client's password
 *                 example: "TavoloBlu1!"
 *     responses:
 *       200:
 *         description: The client has been successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client registration successful"
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: The email used for registration is already in use
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "This email address is already in use"
 *       401:
 *         description: Registration can only be done after logging out
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "This operation requires you to log out first"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.post('/register', registerCliente);

/**
 * @swagger
 * /auth/clienti/login:
 *   post:
 *     tags:
 *      - AuthClienti
 *     summary: Client login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EMAIL:
 *                 type: string
 *                 description: The client's email address
 *                 example: "giulia.rossi@example.com"
 *               PASSWORD_HASH:
 *                 type: string
 *                 description: The client's password
 *                 example: "TavoloBlu1!"
 *     responses:
 *       200:
 *         description: The client's login was successful
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
 *         description: The user trying to log in is not registered
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "User not registered"
 *       403:
 *         description: The inserted login credentials are invalid
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Invalid credentials"
 *       401:
 *         description: The login operation can only be performed after logging out
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "This operation requires you to log out first"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.post('/login', loginCliente);

/**
 * @swagger
 * /auth/clienti/logout:
 *   post:
 *     tags:
 *      - AuthClienti
 *     summary: Client logout
 *     description: Client logout using the access token saved in the browser
 *     responses:
 *       200:
 *         description: The client's logout was successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successful"
 *       401:
 *         description: The login operation can only be performed after logging out
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
router.post('/logout', logoutCliente);

/**
 * @swagger
 * /auth/clienti/getProfile:
 *   get:
 *     tags:
 *      - AuthClienti
 *     summary: Returns the current client profile
 *     responses:
 *       200:
 *         description: Data of the currently logged-in client
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CODICE_CLIENTE:
 *                     type: integer
 *                     description: The unique client code
 *                     example: 1
 *                   NOME:
 *                     type: string
 *                     description: The client's first name
 *                     example: "Luca"
 *                   COGNOME:
 *                     type: string
 *                     description: The client's last name
 *                     example: "Verdi"
 *                   CAP:
 *                     type: integer
 *                     description: The client's postal code
 *                     example: 20100
 *                   CODICE_ISTAT:
 *                     type: integer
 *                     description: The client's ISTAT code
 *                     example: 12345
 *                   EMAIL:
 *                     type: string
 *                     description: The client's email address
 *                     example: "luca.verdi@example.com"
 *                   PHONE_NUMBER:
 *                     type: integer
 *                     description: The client's phone number (if available)
 *                     example: 1234567890
 *                   DATA_INSERIMENTO:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the client was added
 *                     example: "2024-12-29T12:34:56Z"
 *                   DATA_ULTIMA_MODIFICA:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time of the last modification to the client
 *                     example: "2024-12-29T12:34:56Z"
 *       401:
 *         description: The login operation can only be performed after logging out
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "You must be logged in to access your profile"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.get('/getProfile', getProfileCliente);

export default router;