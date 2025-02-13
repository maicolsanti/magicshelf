/**
 * @swagger
 * tags:
 *   - name: Clienti
 *     description: Clients management operation
 */

import express from 'express';
import {
  update,
  remove,
} from '../controllers/clientiController.js';

const router = express.Router();

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
 *                   example: "Client successfully updated"
 *       401:
 *         description: The user is not logged in
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "This operation requires you to be logged in"
 *       403:
 *         description: The user has not the permission
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Insufficient permission"
 *       404:
 *         description: Client not found
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Client not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.put('/update/:codice_cliente', update);

/**
 * @swagger
 * /clienti/remove/{codice_cliente}:
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
 *                   example: "Client successfully deleted"
 *       401:
 *         description: The user is not logged in
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "This operation requires you to be logged in"
 *       403:
 *         description: The user has not the permission
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Insufficient permission"
 *       404:
 *         description: Client not found
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Client not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: "Internal server error"
 */
router.delete('/remove/:codice_cliente', remove);

export default router;
