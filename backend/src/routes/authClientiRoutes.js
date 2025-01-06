/**
 * @swagger
 * tags:
 *   - name: AuthClienti
 *     description: Clients authentication
 */

import express from 'express';
import {
    registerCliente,
    loginCliente
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

export default router;