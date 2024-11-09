-- DDL di creazione della tabella contenente la situazione dei materiali
CREATE SITUAZIONE_MATERIALI (
    CODICE_MATERIALE INT NOT NULL,
    QUANTITA DECIMAL(8,2) NOT NULL,
    DATA_ULTIMA_MODIFICA DATETIME NOT NULL,
    FOREIGN KEY CODICE_FORNITORE REFERENCES ANAGRAFICA_MATERIALE(CODICE_MATERIALE)
    ON DELETE CASCADE -- Se il materiale viene cancellato allora anche la sua situazione viene eliminata
    ON UPDATE CASCADE -- Se il codice materiale viene aggiornato allora anche la sua situazione verrà aggiornata
)