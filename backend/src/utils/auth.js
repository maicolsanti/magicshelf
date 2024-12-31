import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Definizione del segreto per il JWT e del nome del cookie
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = "magicshelf-access-token";

export const setUser = (req, res, user) => {
    // Crea l'access token con JWT
    const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1 day" });
    // Imposta l'access token come cookie
    res.cookie(COOKIE_NAME, accessToken, {
        maxAge: 86400000, // 1 giorno in millisecondi
        httpOnly: true,
        sameSite: true,
    });
};

export const getUser = (req, res) => {
    // Ottiene il cookie dell'access token
    const accessToken = req.cookies[COOKIE_NAME];
    // Restituisce i dati dell'utente contenuti nell'access token, oppure null se il token è mancante o invalido
    if (!accessToken) return null;
    try {
        const user = jwt.verify(accessToken, JWT_SECRET);
        return user;
    } catch {
        return null;
    }
};

export const unsetUser = (req, res) => {
    // Cancella il cookie dell'access token
    res.clearCookie(COOKIE_NAME);
};