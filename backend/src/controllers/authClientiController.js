import bcrypt from 'bcrypt';
import { getUser, setUser, unsetUser } from "../utils/auth.js";
import { getClienteByEmail, insertCliente } from "../models/authClientiModel.js";

export const registerCliente = async (req, res) => {
    try {
        const checklogout = getUser(req, res);
        if(checklogout) {
            res.status(401).send('Questa operazione richiede il logout');
            return;
        }

        const email = req.body.EMAIL;
        const rows = await getClienteByEmail(email);
        if(rows && rows.length > 0) {
            res.status(400).send('Email già in uso');
            return;
        }

        const password = req.body.PASSWORD_HASH;
        const passwordHash = await bcrypt.hash(password, 10);
        req.body.PASSWORD_HASH = passwordHash;

        const result = await insertCliente(req.body);
        if(!(result.affectedRows > 0)) {
            throw new Error('Errore durante l\'inserimento dei dati all\'interno del database');
        }
        const id = result.insertId;

        const users = await getClienteByEmail(email);
        const userData = users[0];
        setUser(req, res, userData);

        res.json({message: 'Registrazione avvenuta con successo', id});
    } catch (error) {
        console.log('Errore durante la registrazione del cliente:', error);
        res.status(500).send('Errore interno del server');
    }
}

export const loginCliente = async (req, res) => {
    try {
        const checklogout = getUser(req, res);
        if(checklogout) {
            res.status(401).send('Questa operazione richiede il logout');
            return;
        }

        const email = req.body.EMAIL;
        const users = await getClienteByEmail(email);
        if (!users.length > 0) {
            res.status(400).send('Utente non registrato');
            return;
        }

        const user = users[0];
        const password = req.body.PASSWORD_HASH;
        const correctPassword = await bcrypt.compare(password, user.PASSWORD_HASH)
        if (!correctPassword) {
            res.status(400).send('Credenziali errate');
            return;
        }
        delete user.PASSWORD_HASH; // Eliminiamo la password dalla risposta in quanto sarebbe in chiaro

        setUser(req, res, user);

        res.json({message: 'Login avvenuto con successo'});
    } catch (error) {
        console.log('Errore durante la login del cliente:', error);
        res.status(500).send('Errore interno del server');
    }
}

export const logoutCliente = async (req, res) => {
    try {
        const user = getUser(req, res);
        if(!user) {
            res.status(401).send('Questa operazione richiede il login');
            return;
        }

        unsetUser(req, res);
        res.json({message: 'Logout avvenuto con successo'});
    } catch (error) {
        console.log('Errore durante la logout del cliente:', error);
        res.status(500).send('Errore interno del server');
    }
}

export const getProfileCliente = async (req, res) => {
    const user = getUser(req, res);
    res.json(user);
}