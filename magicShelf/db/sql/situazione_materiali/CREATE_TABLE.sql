-- DDL di creazione della tabella contenente la situazione dei materiali
CREATE TABLE SITUAZIONE_MATERIALI (
    CODICE_MATERIALE INT NOT NULL,
    QUANTITA DECIMAL(8,2) NOT NULL,
    DATA_ULTIMA_MODIFICA TIMESTAMP NOT NULL,
    FOREIGN KEY (CODICE_MATERIALE) REFERENCES ANAGRAFICA_MATERIALI(CODICE_MATERIALE)
    ON DELETE CASCADE -- Se il materiale viene cancellato allora anche la sua situazione viene eliminata
    ON UPDATE CASCADE -- Se il codice materiale viene aggiornato allora anche la sua situazione verrà aggiornata
);