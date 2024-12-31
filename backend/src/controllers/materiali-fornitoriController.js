import { getAllFornitoriMateriali, getFornitoreMaterialiById } from '../models/materiali-fornitoriModel.js';

export const getAll = async (req, res) => {
    try {
        const fornitori_materiali = await getAllFornitoriMateriali();
        res.json(fornitori_materiali);
    } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);
        res.status(500).send('Errore interno del server');
    }
};

export const getById = async (req, res) => {
    const { codice_fornitore } = req.params;
    try {
        const fornitore_materiali = await getFornitoreMaterialiById(codice_fornitore);
        if (!fornitore_materiali) {
            return res.status(404).json({ message: 'Fornitore non trovato' });
        }
        res.json(fornitore_materiali);
    } catch (error) {
        console.error('Errore durante il recupero del fornitore:', error);
        res.status(500).send('Errore interno del server');
    }
};