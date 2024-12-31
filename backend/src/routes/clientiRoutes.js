/**
 * @swagger
 * tags:
 *   - name: Clienti
 *     description: Operazioni relative ai clienti
 */

import express from 'express';
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../controllers/clientiController.js';

const router = express.Router();

/**
 * @swagger
 * /clienti/getAll:
 *   get:
 *     tags:
 *      - Clienti
 *     summary: Retrieves all clients
 *     responses:
 *       200:
 *         description: List of all clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CODICE_CLIENTE:
 *                     type: integer
 *                     description: The unique client code.
 *                     example: 1
 *                   NOME:
 *                     type: string
 *                     description: The first name of the client.
 *                     example: "Luca"
 *                   COGNOME:
 *                     type: string
 *                     description: The last name of the client.
 *                     example: "Verdi"
 *                   CAP:
 *                     type: integer
 *                     description: The postal code of the client's location.
 *                     example: 20100
 *                   CODICE_ISTAT:
 *                     type: integer
 *                     description: The ISTAT code of the locality.
 *                     example: 12345
 *                   EMAIL:
 *                     type: string
 *                     description: The email address of the client.
 *                     example: "luca.verdi@example.com"
 *                   PHONE_NUMBER:
 *                     type: integer
 *                     description: The client's phone number (if available).
 *                     example: 1234567890
 *                   DATA_INSERIMENTO:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the client was added.
 *                     example: "2024-12-29T12:34:56Z"
 *                   DATA_ULTIMA_MODIFICA:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the client's information was last updated.
 *                     example: "2024-12-29T12:34:56Z"
 */
router.get('/getAll', getAll);

/**
 * @swagger
 * /clienti/getById/{codice_cliente}:
 *   get:
 *     tags:
 *      - Clienti
 *     summary: Retrieves a client by its client code
 *     parameters:
 *       - name: codice_cliente
 *         in: path
 *         required: true
 *         description: The unique client code.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Client found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CODICE_CLIENTE:
 *                   type: integer
 *                   description: The unique client code.
 *                   example: 1
 *                 NOME:
 *                   type: string
 *                   description: The first name of the client.
 *                   example: "Luca"
 *                 COGNOME:
 *                   type: string
 *                   description: The last name of the client.
 *                   example: "Verdi"
 *                 CAP:
 *                   type: integer
 *                   description: The postal code of the client's location.
 *                   example: 20100
 *                 CODICE_ISTAT:
 *                   type: integer
 *                   description: The ISTAT code of the locality.
 *                   example: 12345
 *                 EMAIL:
 *                   type: string
 *                   description: The email address of the client.
 *                   example: "luca.verdi@example.com"
 *                 PHONE_NUMBER:
 *                   type: integer
 *                   description: The client's phone number (if available).
 *                   example: 1234567890
 *                 DATA_INSERIMENTO:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the client was added.
 *                   example: "2024-12-29T12:34:56Z"
 *                 DATA_ULTIMA_MODIFICA:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the client's information was last updated.
 *                   example: "2024-12-29T12:34:56Z"
 *       404:
 *         description: Client not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/getById/:codice_cliente', getById);

/**
 * @swagger
 * /clienti/create:
 *   post:
 *     tags:
 *      - Clienti
 *     summary: Creates a new client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               custom_data:
 *                 type: object
 *                 description: Custom data for the client creation.
 *                 properties:
 *                   NOME:
 *                     type: string
 *                     description: The first name of the client.
 *                     example: "Giulia"
 *                   COGNOME:
 *                     type: string
 *                     description: The last name of the client.
 *                     example: "Rossi"
 *                   CAP:
 *                     type: integer
 *                     description: The postal code of the client's location.
 *                     example: 30100
 *                   CODICE_ISTAT:
 *                     type: integer
 *                     description: The ISTAT code of the locality.
 *                     example: 23456
 *                   EMAIL:
 *                     type: string
 *                     description: The email address of the client.
 *                     example: "giulia.rossi@example.com"
 *                   PHONE_NUMBER:
 *                     type: integer
 *                     description: The client's phone number (if available).
 *                     example: 987654321
 *     responses:
 *       200:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client created successfully"
 *                 id:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post('/create', create);

/**
 * @swagger
 * /clienti/update/{codice_cliente}:
 *   put:
 *     tags:
 *      - Clienti
 *     summary: Updates a client by its client code
 *     parameters:
 *       - name: codice_cliente
 *         in: path
 *         required: true
 *         description: The unique client code.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               custom_data:
 *                 type: object
 *                 description: Custom data to update the client.
 *                 properties:
 *                   NOME:
 *                     type: string
 *                     example: "Simona"
 *                   COGNOME:
 *                     type: string
 *                     example: "Bianchi"
 *                   CAP:
 *                     type: integer
 *                     example: 20200
 *                   CODICE_ISTAT:
 *                     type: integer
 *                     example: 34567
 *                   EMAIL:
 *                     type: string
 *                     example: "simona.bianchi@example.com"
 *                   PHONE_NUMBER:
 *                     type: integer
 *                     example: 1122334455
 *     responses:
 *       200:
 *         description: Client updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client updated successfully"
 *       404:
 *         description: Client not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.put('/update/:codice_cliente', update);

/**
 * @swagger
 * /clienti/delete/{codice_cliente}:
 *   delete:
 *     tags:
 *      - Clienti
 *     summary: Deletes a client by its client code
 *     parameters:
 *       - name: codice_cliente
 *         in: path
 *         required: true
 *         description: The unique client code.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client deleted successfully"
 *       404:
 *         description: Client not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.delete('/remove/:codice_cliente', remove);

export default router;
