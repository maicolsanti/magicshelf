/**
 * @swagger
 * tags:
 *   - name: Auth Fornitori
 *     description: Suppliers Authentication
 */

import express from 'express';
import {
    registerFornitore,
    loginFornitore
} from '../controllers/authFornitoriController.js';

const router = express.Router();

/**
 * @swagger
 * /auth/fornitori/register:
 *   post:
 *     tags:
 *      - Auth Fornitori
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
 *               EMAIL:
 *                 type: string
 *                 description: The supplier's email
 *                 example: "giulia.rossi@example.com"
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
 *      - Auth Fornitori
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
 *                 example: "SNTMCL02M28C573I"
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

export default router;