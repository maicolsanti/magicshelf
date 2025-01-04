import pool from '../config/db.js';

// Get all suppliers' materials
export const getAllFornitoriMateriali = async () => {
    // Execute a query to fetch all supplier materials from the database
    const [rows] = await pool.promise().query('SELECT * FROM MATERIALI_FORNITORI');
    return rows;
};

// Get supplier's material by supplier code
export const getFornitoreMaterialiById = async (codice_fornitore) => {
    // Execute a query to fetch the supplier material by supplier code
    const [rows] = await pool.promise().execute(
        'SELECT * FROM MATERIALI_FORNITORI WHERE CODICE_FORNITORE = ?',
        [codice_fornitore]
    );
    // Return the material if found, otherwise return null
    return rows.length > 0 ? rows[0] : null;
};

export const getFilteredFornitoreMateriali = async (filters) => {
    console.log(filters);
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
    if (filters.ZONA_DI_RICERCA === 'Dentro il Comune') {
        sql += ' AND DENOMINAZIONE_LOCALITA = ?';
        params.push(filters.ZONA_DI_PARTENZA);
    } else if (filters.ZONA_DI_RICERCA === 'Fuori dal Comune') {
        sql += ' AND DENOMINAZIONE_LOCALITA != ? AND DENOMINAZIONE_REGIONE = ?';
        params.push(filters.ZONA_DI_PARTENZA, filters.DENOMINAZIONE_REGIONE);
    }

    console.log(sql);
    console.log(params);

    // Verify if there are not sanitized parameters
    const sanitizedParams = params.map((param) => (param === undefined ? null : param));

    // Execute the query with sanitized parameters
    const [rows] = await pool.promise().execute(sql, sanitizedParams);

    return rows;
    // Execute the query
    // return new Promise((resolve, reject) => {
    //     pool.query(sql, params, (error, results) => {
    //         if (error) {
    //             return reject(error);
    //         }
    //         resolve(results);
    //     });
    // });
};