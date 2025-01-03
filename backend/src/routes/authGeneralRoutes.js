/**
 * @swagger
 * tags:
 *   - name: AuthGeneral
 *     description: Suppliers general authentication
 */

import express from 'express';
import { getProfile, logout } from '../controllers/authGeneralController.js';

const router = express.Router();

/**
 * @swagger
 * /auth/general/getProfile:
 *   get:
 *     tags:
 *       - AuthGeneral
 *     summary: Returns the current user profile based on their role
 *     description: This endpoint returns the profile of the currently logged-in user, either as a supplier (Fornitore) or a client (Cliente), based on the user's role.
 *     responses:
 *       200:
 *         description: Data of the currently logged-in user (either a supplier or a client, depending on the role)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               oneOf:
 *                 - $ref: '#/components/schemas/SupplierProfile'
 *                 - $ref: '#/components/schemas/ClientProfile'
 *         examples:
 *           supplier:
 *             value:
 *               CODICE_FORNITORE: 1
 *               NOME: "Luca"
 *               COGNOME: "Verdi"
 *               RAGIONE_SOCIALE: "Panificio Verdi SRL"
 *               PARTITA_IVA: "IT01020304056"
 *               CODICE_FISCALE: "LVSMSE02M28C573I"
 *               CAP: 20100
 *               CODICE_ISTAT: 12345
 *               INDIRIZZO: "Via Rossi 123"
 *               PHONE_NUMBER: 1234567890
 *               DATA_INSERIMENTO: "2024-12-29T12:34:56Z"
 *               DATA_ULTIMA_MODIFICA: "2024-12-29T12:34:56Z"
 *           client:
 *             value:
 *               CODICE_CLIENTE: 1
 *               NOME: "Luca"
 *               COGNOME: "Verdi"
 *               CAP: 20100
 *               CODICE_ISTAT: 12345
 *               EMAIL: "luca.verdi@example.com"
 *               PHONE_NUMBER: 1234567890
 *               DATA_INSERIMENTO: "2024-12-29T12:34:56Z"
 *               DATA_ULTIMA_MODIFICA: "2024-12-29T12:34:56Z"
 *       401:
 *         description: Unauthorized, user needs to log in to view their profile
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
 * components:
 *   schemas:
 *     SupplierProfile:
 *       type: object
 *       properties:
 *         CODICE_FORNITORE:
 *           type: integer
 *         NOME:
 *           type: string
 *         COGNOME:
 *           type: string
 *         RAGIONE_SOCIALE:
 *           type: string
 *         PARTITA_IVA:
 *           type: string
 *         CODICE_FISCALE:
 *           type: string
 *         CAP:
 *           type: integer
 *         CODICE_ISTAT:
 *           type: integer
 *         INDIRIZZO:
 *           type: string
 *         PHONE_NUMBER:
 *           type: integer
 *         DATA_INSERIMENTO:
 *           type: string
 *           format: date-time
 *         DATA_ULTIMA_MODIFICA:
 *           type: string
 *           format: date-time
 *     ClientProfile:
 *       type: object
 *       properties:
 *         CODICE_CLIENTE:
 *           type: integer
 *         NOME:
 *           type: string
 *         COGNOME:
 *           type: string
 *         CAP:
 *           type: integer
 *         CODICE_ISTAT:
 *           type: integer
 *         EMAIL:
 *           type: string
 *         PHONE_NUMBER:
 *           type: integer
 *         DATA_INSERIMENTO:
 *           type: string
 *           format: date-time
 *         DATA_ULTIMA_MODIFICA:
 *           type: string
 *           format: date-time
 */
router.get('/getProfile', getProfile);

/**
 * @swagger
 * /auth/general/logout:
 *   post:
 *     tags:
 *      - AuthGeneral
 *     summary: logout
 *     description: logout using the access token saved in the browser
 *     responses:
 *       200:
 *         description: logout was successful
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
router.post('/logout', logout);

export default router;