import pool from '../config/db.js';

// Get supplier's material by supplier code
export const getFornitoreMaterialiById = async (codice_fornitore) => {
    // Execute a query to fetch the supplier material by supplier code
    const [rows] = await pool.promise().execute(
        'SELECT * FROM MATERIALI_FORNITORI WHERE CODICE_FORNITORE = ?',
        [codice_fornitore]
    );

    // Convert image BLOB to Base64 string for each row
    const materiali = rows.map((row) => {
        if (row.IMMAGINE) {
        row.IMMAGINE = row.IMMAGINE.toString('base64'); // Convert BLOB to Base64
        }
        return row;
    });

    // Return the materials if found, otherwise return null
    return materiali.length > 0 ? materiali : null;
};

export const getFilteredFornitoreMateriali = async (filters) => {
    let sql = 'SELECT * FROM MATERIALI_FORNITORI WHERE 1=1'; // Base query
    const params = [];

    if (filters.DESCRIZIONE_MATERIALE) {
        sql += ' AND DESCRIZIONE_MATERIALE LIKE ?';
        params.push(`%${filters.DESCRIZIONE_MATERIALE}%`);
    }
    if (filters.MARCA) {
        sql += ' AND MARCA LIKE ?';
        params.push(`%${filters.MARCA}%`);
    }
    if (filters.FORNITORE) {
        sql += ' AND RAGIONE_SOCIALE LIKE ?';
        params.push(`%${filters.FORNITORE}%`);
    }
    if (filters.PREZZO_UNITARIO && Array.isArray(filters.PREZZO_UNITARIO)) {
        sql += ' AND PREZZO_UNITARIO BETWEEN ? AND ?';
        params.push(filters.PREZZO_UNITARIO[0], filters.PREZZO_UNITARIO[1]);
    }
    if (filters.ZONA_DI_RICERCA === 'Dentro al Comune') {
        sql += ' AND CAP = ?';
        params.push(filters.ZONA_DI_PARTENZA);
    } else if (filters.ZONA_DI_RICERCA === 'Fuori dal Comune') {
        sql += ' AND CAP != ? AND DENOMINAZIONE_REGIONE = ?';
        params.push(filters.ZONA_DI_PARTENZA, filters.DENOMINAZIONE_REGIONE);
    }

    // Verify if there are not sanitized parameters
    const sanitizedParams = params.map((param) => (param === undefined ? null : param));

    // Execute the query with sanitized parameters
    const [rows] = await pool.promise().execute(sql, sanitizedParams);

    // Convert image BLOB to Base64 string for each row
    const materiali = rows.map((row) => {
        if (row.IMMAGINE) {
        row.IMMAGINE = row.IMMAGINE.toString('base64'); // Convert BLOB to Base64
        }
        return row;
    });

    return materiali;
};