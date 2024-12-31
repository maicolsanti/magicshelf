import bcrypt from 'bcrypt';
import { getUser, setUser, unsetUser } from "../utils/auth.js";
import { getFornitoreByEmail, insertFornitore } from "../models/authFornitoriModel.js";

export const registerFornitore = async (req, res) => {
    try {
        const checklogout = getUser(req, res);
        if(checklogout) {
            res.status(401).send('Questa operazione richiede il logout');
            return;
        }

        const codice_fiscale = req.body.CODICE_FISCALE;
        const rows = await getFornitoreByEmail(codice_fiscale);
        if(rows && rows.length > 0) {
            res.status(400).send('Codice fiscale già in uso');
            return;
        }

        const password = req.body.PASSWORD_HASH;
        const passwordHash = await bcrypt.hash(password, 10);
        req.body.PASSWORD_HASH = passwordHash;

        const result = await insertFornitore(req.body);
        if(!(result.affectedRows > 0)) {
            throw new Error('Errore durante l\'inserimento dei dati all\'interno del database');
        }
        const id = result.insertId;

        const users = await getFornitoreByEmail(email);
        const userData = users[0];
        setUser(req, res, userData);

        res.json({message: 'Registrazione avvenuta con successo', id});
    } catch (error) {
        console.log('Errore durante la registrazione del fornitore:', error);
        res.status(500).send('Errore interno del server');
    }
}

export const loginFornitore = async (req, res) => {
    try {
        const checklogout = getUser(req, res);
        if(checklogout) {
            res.status(401).send('Questa operazione richiede il logout');
            return;
        }

        const codice_fiscale = req.body.CODICE_FISCALE;
        const users = await getFornitoreByEmail(codice_fiscale);
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
        console.log('Errore durante la login del fornitore:', error);
        res.status(500).send('Errore interno del server');
    }
}

export const logoutFornitore = async (req, res) => {
    try {
        const user = getUser(req, res);
        if(!user) {
            res.status(401).send('Questa operazione richiede il login');
            return;
        }

        unsetUser(req, res);
        res.json({message: 'Logout avvenuto con successo'});
    } catch (error) {
        console.log('Errore durante la logout del fornitore:', error);
        res.status(500).send('Errore interno del server');
    }
}

export const getProfileFornitore = async (req, res) => {
    const user = getUser(req, res);
    res.json(user);
}