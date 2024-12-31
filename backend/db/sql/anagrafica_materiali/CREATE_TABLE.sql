-- DDL di creazione della tabella contente le informazioni anagrafiche dei materiali per il fornitore
CREATE TABLE ANAGRAFICA_MATERIALI (
    CODICE_MATERIALE INT AUTO_INCREMENT PRIMARY KEY,
    DESCRIZIONE_MATERIALE VARCHAR(200) NOT NULL,
    MARCA VARCHAR(200) NULL,
    CODICE_FORNITORE INT NOT NULL,
    UNITA_MISURA VARCHAR(4) NOT NULL,
    PREZZO_UNITARIO DECIMAL(8,2) NOT NULL,
    DATA_INSERIMENTO TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DATA_ULTIMA_MODIFICA TIMESTAMP NULL,
    FOREIGN KEY (CODICE_FORNITORE) REFERENCES ANAGRAFICA_FORNITORI(CODICE_FORNITORE)
    ON DELETE CASCADE -- Se il fornitore viene cancellato anche i suoi materiali verranno eliminati automaticamente
    ON UPDATE CASCADE -- Se il fornitore cambia codice anche i suoi materiali cambieranno codice
);