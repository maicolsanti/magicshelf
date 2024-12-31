/**
 * @swagger
 * tags:
 *   - name: Localita
 *     description: Get locality endpoints
 */

import express from 'express';
import { getAll, getById, getByCap, getByCapDenominazione } from '../controllers/localitaController.js';

const router = express.Router();

/**
 * @swagger
 * /localita/getAll:
 *   get:
 *     tags:
 *      - Localita
 *     summary: Retrieves all localities
 *     responses:
 *       200:
 *         description: List of all localities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CODICE_ISTAT:
 *                     type: integer
 *                     description: The unique ISTAT code of the locality.
 *                     example: 12345
 *                   CAP:
 *                     type: integer
 *                     description: The postal code of the locality.
 *                     example: 40100
 *                   PROVINCIA:
 *                     type: string
 *                     description: The province of the locality.
 *                     example: "Bologna"
 *                   REGIONE:
 *                     type: string
 *                     description: The region of the locality.
 *                     example: "Emilia-Romagna"
 *                   LOCALITA:
 *                     type: string
 *                     description: The name of the locality (e.g., city or town).
 *                     example: "Bologna"
 */
router.get('/getAll', getAll);

/**
 * @swagger
 * /localita/getById/{codice_istat}:
 *   get:
 *     tags:
 *      - Localita
 *     summary: Retrieves a locality by its ISTAT code
 *     parameters:
 *       - name: codice_istat
 *         in: path
 *         required: true
 *         description: The unique ISTAT code of the locality.
 *         schema:
 *           type: integer
 *           example: 12345
 *     responses:
 *       200:
 *         description: Locality found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CODICE_ISTAT:
 *                   type: integer
 *                   description: The unique ISTAT code of the locality.
 *                   example: 12345
 *                 CAP:
 *                   type: integer
 *                   description: The postal code of the locality.
 *                   example: 40100
 *                 PROVINCIA:
 *                   type: string
 *                   description: The province of the locality.
 *                   example: "Bologna"
 *                 REGIONE:
 *                   type: string
 *                   description: The region of the locality.
 *                   example: "Emilia-Romagna"
 *                 LOCALITA:
 *                   type: string
 *                   description: The name of the locality (e.g., city or town).
 *                   example: "Bologna"
 *       404:
 *         description: Locality not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Locality not found"
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
router.get('/getById/:codice_istat', getById);

/**
 * @swagger
 * /localita/getByCap/{cap}:
 *   get:
 *     tags:
 *      - Localita
 *     summary: Retrieves a locality by its CAP code
 *     parameters:
 *       - name: cap
 *         in: path
 *         required: true
 *         description: The CAP code of the locality.
 *         schema:
 *           type: integer
 *           example: 12345
 *     responses:
 *       200:
 *         description: Locality found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CODICE_ISTAT:
 *                   type: integer
 *                   description: The unique ISTAT code of the locality.
 *                   example: 12345
 *                 CAP:
 *                   type: integer
 *                   description: The postal code of the locality.
 *                   example: 40100
 *                 PROVINCIA:
 *                   type: string
 *                   description: The province of the locality.
 *                   example: "Bologna"
 *                 REGIONE:
 *                   type: string
 *                   description: The region of the locality.
 *                   example: "Emilia-Romagna"
 *                 LOCALITA:
 *                   type: string
 *                   description: The name of the locality (e.g., city or town).
 *                   example: "Bologna"
 *       404:
 *         description: Locality not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Locality not found"
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
router.get('/getByCap/:cap', getByCap);

/**
 * @swagger
 * /localita/getByCapDenominazione/{cap}/{denominazione}:
 *   get:
 *     tags:
 *      - Localita
 *     summary: Retrieves a locality by its CAP code
 *     parameters:
 *       - name: cap
 *         in: path
 *         required: true
 *         description: The CAP code of the locality.
 *         schema:
 *           type: integer
 *           example: 12345
 *       - name: denominazione
 *         in: path
 *         required: true
 *         description: La denominazione della località
 *         schema:
 *           type: string
 *           example: "Cesena"
 *     responses:
 *       200:
 *         description: Locality found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CODICE_ISTAT:
 *                   type: integer
 *                   description: The unique ISTAT code of the locality.
 *                   example: 12345
 *                 CAP:
 *                   type: integer
 *                   description: The postal code of the locality.
 *                   example: 40100
 *                 PROVINCIA:
 *                   type: string
 *                   description: The province of the locality.
 *                   example: "Bologna"
 *                 REGIONE:
 *                   type: string
 *                   description: The region of the locality.
 *                   example: "Emilia-Romagna"
 *                 LOCALITA:
 *                   type: string
 *                   description: The name of the locality (e.g., city or town).
 *                   example: "Bologna"
 *       404:
 *         description: Locality not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Locality not found"
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
router.get('/getByCapDenominazione/:cap/:denominazione', getByCapDenominazione);

export default router;