# MagicShelf backend

## Installazione

Explain how to setup the project locally.

### Prerequisites

- Node.js (Version 20.18.0 or higher)
- NPM
- Database setup (XAMPP Mysql)

### Instruction

- Navigate to the backend directory:

```sh
cd backend
```

- Install dependencies:

```sh
npm install
```

- Configure the .env file:

```makefile
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=secret
DB_NAME=magic_shelf
JWT_SECRET=supersecretkey
PORT=3000
```

- Start the application:

```sh
npm start
```

- Test the application at:

```text
http://localhost:3000
```

## Project Structure

```text
/backend
  |-- /db
  |     |-- /sql           # Database DDL query
  |-- /src
  |     |-- /config        # Configuration file
  |     |-- /routes        # API route definitions
  |     |-- /controllers   # Route handlers
  |     |-- /models        # Database models
  |     |-- /middleware    # Custom middleware
  |     |-- /utils         # Utilities and helpers
  |     |-- app.js         # Start point
  |     |-- swagger.js     # Swagger docs configuration
  |-- .gitignore           # Ignored files from git
  |-- .env                 # DB and auth sensitive info
  |-- package.json         # Dependency configuration
  |-- package-lock.json    # Dependency tree
  |-- README.md
```

## API Reference

### Clients Management Endpoints

**GET `/api/fornitori/getAll`**
Retrieve all clients.

- **Description**: Returns a list of all clients in the `ANAGRAFICA_CLIENTI` table.
- **Request**:
  - Method: `GET`
  - Headers: None
- **Response**:
  - **200 OK**: Array of clients.

    ```json
    [
      {
        "CODICE_CLIENTE": 1,
        "NOME": "Maicol",
        "COGNOME": "Santi",
        "CAP": 47521,
        "CODICE_ISTAT": 1,
        "EMAIL": "maicol.santi@studio.unibo.it",
        "PASSWORD_HASH": "abcdefghijklmnopqrs",
        "PASSWORD_SALT": "abcd",
        "PHONE_NUMBER": 3899474698,
        "DATA_INSERIMENTO": "2024-12-29T16:01:50",
        "DATA_ULTIMA_MODIFICA": null,
        "DATA_CANCELLAZIONE": null
      }
    ]
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**GET `/api/fornitori/getById/:codice_fornitore`**
Retrieve a client by ID.

- **Description**: Returns the details of a specific client.
- **Request**:
  - Method: `GET`
  - Parameters:
    - `codice_cliente` (required): The ID of the client.
- **Response**:
  - **200 OK**: Client details.

    ```json
    {
        "CODICE_CLIENTE": 1,
        "NOME": "Maicol",
        "COGNOME": "Santi",
        "CAP": 47521,
        "CODICE_ISTAT": 1,
        "EMAIL": "maicol.santi@studio.unibo.it",
        "PASSWORD_HASH": "abcdefghijklmnopqrs",
        "PASSWORD_SALT": "abcd",
        "PHONE_NUMBER": 3899474698,
        "DATA_INSERIMENTO": "2024-12-29T16:01:50",
        "DATA_ULTIMA_MODIFICA": null,
        "DATA_CANCELLAZIONE": null
    }
    ```

  - **404 Not Found**:

    ```text
    Cliente non trovato
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**POST `/api/fornitori/create`**
Create a new client.

- **Description**: Adds a new client to the `ANAGRAFICA_CLIENTI` table.
- **Request**:
  - Method: `POST`
  - Headers:
    - `Content-Type: application/json`
  - Body:

    ```json
    {
      "custom_data": {
        "NOME": "Maicol",
        "COGNOME": "Santi",
        "CAP": 47521,
        "CODICE_ISTAT": 1,
        "EMAIL": "maicol.santi@studio.unibo.it",
        "PASSWORD_HASH": "abcdefghijklmnopqrs",
        "PASSWORD_SALT": "abcd",
        "PHONE_NUMBER": 3899474698
      }
    }
    ```

- **Response**:
  - **200 OK**:

    ```json
    {
        "message": "Cliente creato con successo",
        "id": 1
    }
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**PUT `/api/fornitori/update/:codice_fornitore`**
Update an existing client.

- **Description**: Updates the details of a client in the `ANAGRAFICA_CLIENTI` table.
- **Request**:
  - Method: `PUT`
  - Parameters:
    - `codice_cliente` (required): The ID of the client to update.
  - Headers:
    - `Content-Type: application/json`
  - Body:

    ```json
    {
      "custom_data": {
        "NOME": "Maicol Updated",
        "COGNOME": "Santi Updated"
      }
    }
    ```

- **Response**:
  - **200 OK**:

    ```json
    {
        "message": "Cliente aggiornato correttamente"
    }
    ```

  - **404 Not Found**:

    ```text
    Cliente non trovato
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**DELETE `/api/fornitori/remove/:codice_fornitore`**
Delete a client.

- **Description**: Removes a client from the `ANAGRAFICA_CLIENTI` table.
- **Request**:
  - Method: `DELETE`
  - Parameters:
    - `codice_cliente` (required): The ID of the client to delete.
- **Response**:
  - **200 OK**:

    ```json
    {
        "message": "Cliente eliminato correttamente"
    }
    ```

  - **404 Not Found**:

    ```text
    Cliente non trovato
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

Delete a client.
Description: Delete a specific client from the database.
Request:

- Method: DELETE
- Headers: None
- Parameters: codice_cliente (required) --> The ID of the client.

Response:

- 200 OK

### Suppliers Management Endpoints

**GET `/api/fornitori/getAll`**
Retrieve all suppliers.

- **Description**: Returns a list of all suppliers in the `ANAGRAFICA_FORNITORI` table.
- **Request**:
  - Method: `GET`
  - Headers: None
- **Response**:
  - **200 OK**: Array of suppliers.

    ```json
    [
      {
        "CODICE_FORNITORE": 1,
        "NOME": "Mario",
        "COGNOME": "Rossi",
        "RAGIONE_SOCIALE": "Mario Rossi SRL",
        "PARTITA_IVA": "12345678901",
        "CODICE_FISCALE": null,
        "CAP": 40100,
        "CODICE_ISTAT": 12345,
        "PHONE_NUMBER": 1234567890,
        "DATA_INSERIMENTO": "2024-12-28T12:34:56",
        "DATA_ULTIMA_MODIFICA": "2024-12-29T14:12:00"
      }
    ]
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**GET `/api/fornitori/getById/:codice_fornitore`**
Retrieve a supplier by ID.

- **Description**: Returns the details of a specific supplier.
- **Request**:
  - Method: `GET`
  - Parameters:
    - `codice_fornitore` (required): The ID of the supplier.
- **Response**:
  - **200 OK**: Supplier details.

    ```json
    {
      "CODICE_FORNITORE": 1,
      "NOME": "Mario",
      "COGNOME": "Rossi",
      "RAGIONE_SOCIALE": "Mario Rossi SRL",
      "PARTITA_IVA": "12345678901",
      "CODICE_FISCALE": null,
      "CAP": 40100,
      "CODICE_ISTAT": 12345,
      "PHONE_NUMBER": 1234567890,
      "DATA_INSERIMENTO": "2024-12-28T12:34:56",
      "DATA_ULTIMA_MODIFICA": "2024-12-29T14:12:00"
    }
    ```

  - **404 Not Found**:

    ```text
    Fornitore non trovato
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**POST `/api/fornitori/create`**
Create a new supplier.

- **Description**: Adds a new supplier to the `ANAGRAFICA_FORNITORI` table.
- **Request**:
  - Method: `POST`
  - Headers:
    - `Content-Type: application/json`
  - Body:

    ```json
    {
      "custom_data": {
        "NOME": "Mario",
        "COGNOME": "Rossi",
        "RAGIONE_SOCIALE": "Mario Rossi SRL",
        "PARTITA_IVA": "12345678901",
        "CAP": 40100,
        "CODICE_ISTAT": 12345,
        "PASSWORD_HASH": "hashed_password",
        "PASSWORD_SALT": "salt_value",
        "PHONE_NUMBER": 1234567890
      }
    }
    ```

- **Response**:
  - **200 OK**:

    ```json
    {
        "message": "Fornitore creato con successo",
        "id": 1
    }
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**PUT `/api/fornitori/update/:codice_fornitore`**
Update an existing supplier.

- **Description**: Updates the details of a supplier in the `ANAGRAFICA_FORNITORI` table.
- **Request**:
  - Method: `PUT`
  - Parameters:
    - `codice_fornitore` (required): The ID of the supplier to update.
  - Headers:
    - `Content-Type: application/json`
  - Body:

    ```json
    {
      "custom_data": {
        "NOME": "Mario Updated",
        "COGNOME": "Rossi Updated",
        "RAGIONE_SOCIALE": "Mario Rossi SRL Updated"
      }
    }
    ```

- **Response**:
  - **200 OK**:

    ```json
    {
        "message": "Fornitore aggiornato correttamente"
    }
    ```

  - **404 Not Found**:

    ```text
    Fornitore non trovato
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**DELETE `/api/fornitori/remove/:codice_fornitore`**
Delete a supplier.

- **Description**: Removes a supplier from the `ANAGRAFICA_FORNITORI` table.
- **Request**:
  - Method: `DELETE`
  - Parameters:
    - `codice_fornitore` (required): The ID of the supplier to delete.
- **Response**:
  - **200 OK**:

    ```json
    {
        "message": "Fornitore eliminato correttamente"
    }
    ```

  - **404 Not Found**:

    ```text
    Fornitore non trovato
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

### Location Endpoints

**GET `/api/localita/getAll`**
Retrieve all locations.

- **Description**: Returns a list of all locations in the `LOCALITA` table.
- **Request**:
  - Method: `GET`
  - Headers: None
- **Response**:
  - **200 OK**: Array of locations.

    ```json
    [
      {
        "CODICE_ISTAT": 1,
        "CAP": 40121,
        "PROVINCIA": "Bologna",
        "REGIONE": "Emilia-Romagna",
        "LOCALITA": "Bologna"
      },
      {
        "CODICE_ISTAT": 2,
        "CAP": 50123,
        "PROVINCIA": "Firenze",
        "REGIONE": "Toscana",
        "LOCALITA": "Firenze"
      }
    ]
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**GET `/api/localita/getById/:codice_istat`**
Retrieve a location by ID.

- **Description**: Returns the details of a specific location.
- **Request**:
  - Method: `GET`
  - Parameters:
    - `codice_istat` (required): The ID of the location.
- **Response**:
  - **200 OK**: location details.

    ```json
    {
        "CODICE_ISTAT": 1,
        "CAP": 40121,
        "PROVINCIA": "Bologna",
        "REGIONE": "Emilia-Romagna",
        "LOCALITA": "Bologna"
    }
    ```

  - **404 Not Found**:

    ```text
    Localita non trovata
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

### Materials Management Endpoints

**GET `/api/materiali/getAll`**
Retrieve all materials.

- **Description**: Returns a list of all materials in the `ANAGRAFICA_MATERIALI` table.
- **Request**:
  - Method: `GET`
  - Headers: None
- **Response**:
  - **200 OK**: Array of materials.

    ```json
    [
      {
        "CODICE_MATERIALE": 1,
        "DESCRIZIONE_MATERIALE": "Steel Rod",
        "MARCA": "Acme",
        "CODICE_FORNITORE": 5,
        "UNITA_MISURA": "pcs",
        "PREZZO_UNITARIO": 20.50,
        "DATA_INSERIMENTO": "2024-01-01T10:00:00",
        "DATA_ULTIMA_MODIFICA": null
      }
    ]
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**GET `/api/materiali/getById/:codice_materiale`**
Retrieve a material by ID.

- **Description**: Returns the details of a specific material.
- **Request**:
  - Method: `GET`
  - Parameters:
    - `codice_materiale` (required): The ID of the material.
- **Response**:
  - **200 OK**: Material details.

    ```json
    {
        "CODICE_MATERIALE": 1,
        "DESCRIZIONE_MATERIALE": "Steel Rod",
        "MARCA": "Acme",
        "CODICE_FORNITORE": 5,
        "UNITA_MISURA": "pcs",
        "PREZZO_UNITARIO": 20.50,
        "DATA_INSERIMENTO": "2024-01-01T10:00:00",
        "DATA_ULTIMA_MODIFICA": null
    }
    ```

  - **404 Not Found**:

    ```text
    Materiale non trovato
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**POST `/api/materiali/create`**
Create a new material.

- **Description**: Adds a new material to the `ANAGRAFICA_MATERIALI` table.
- **Request**:
  - Method: `POST`
  - Headers:
    - `Content-Type: application/json`
  - Body:

    ```json
    {
      "custom_data": {
        "DESCRIZIONE_MATERIALE": "Steel Rod",
        "MARCA": "Acme",
        "CODICE_FORNITORE": 5,
        "UNITA_MISURA": "pcs",
        "PREZZO_UNITARIO": 20.50
      }
    }
    ```

- **Response**:
  - **200 OK**:

    ```json
    {
        "message": "Materiale creato con successo",
        "id": 1
    }
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**PUT `/api/materiali/update/:codice_materiale`**
Update an existing material.

- **Description**: Updates the details of a material in the `ANAGRAFICA_MATERIALI` table.
- **Request**:
  - Method: `PUT`
  - Parameters:
    - `codice_materiale` (required): The ID of the material to update.
  - Headers:
    - `Content-Type: application/json`
  - Body:

    ```json
    {
      "custom_data": {
        "DESCRIZIONE_MATERIALE": "Updated Steel Rod",
        "PREZZO_UNITARIO": 22.00
      }
    }
    ```

- **Response**:
  - **200 OK**:

    ```json
    {
        "message": "Materiale aggiornato correttamente"
    }
    ```

  - **404 Not Found**:

    ```text
    Materiale non trovato
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**DELETE `/api/materiali/remove/:codice_materiale`**
Delete a material.

- **Description**: Removes a material from the `ANAGRAFICA_MATERIALI` table.
- **Request**:
  - Method: `DELETE`
  - Parameters:
    - `codice_materiale` (required): The ID of the material to delete.
- **Response**:
  - **200 OK**:

    ```json
    {
        "message": "Materiale eliminato correttamente"
    }
    ```

  - **404 Not Found**:

    ```text
    Materiale non trovato
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

### Materials Situation Management Endpoints

**GET `/api/situazione-materiali/getAll`**
Retrieve all materials situations.

- **Description**: Returns a list of all materials situations in the `SITUAZIONE_MATERIALI` table.
- **Request**:
  - Method: `GET`
  - Headers: None
- **Response**:
  - **200 OK**: Array of materials situations.

    ```json
    [
        {
            "CODICE_MATERIALE": 1,
            "QUANTITA": 100.50,
            "DATA_ULTIMA_MODIFICA": "2024-01-01T12:00:00Z"
        },
        {
            "CODICE_MATERIALE": 2,
            "QUANTITA": 200.00,
            "DATA_ULTIMA_MODIFICA": "2024-01-02T12:00:00Z"
        }
    ]
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**GET `/api/situazione-materiali/getById/:codice_materiale`**
Retrieve a material situation by ID.

- **Description**: Returns the details of a specific material situation.
- **Request**:
  - Method: `GET`
  - Parameters:
    - `codice_materiale` (required): The ID of the material.
- **Response**:
  - **200 OK**: Material situation details.

    ```json
    {
        "CODICE_MATERIALE": 1,
        "QUANTITA": 100.50,
        "DATA_ULTIMA_MODIFICA": "2024-01-01T12:00:00Z"
    }
    ```

  - **404 Not Found**:

    ```text
    Materiale non trovato
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**POST `/api/situazione-materiali/create`**
Create a new material situation.

- **Description**: Adds a new material situation to the `SITUAZIONE_MATERIALI` table.
- **Request**:
  - Method: `POST`
  - Headers:
    - `Content-Type: application/json`
  - Body:

    ```json
    {
      "custom_data": {
        "CODICE_MATERIALE": 1,
        "QUANTITA": 50.75,
        "DATA_ULTIMA_MODIFICA": "2024-01-03T10:00:00Z"
      }
    }
    ```

- **Response**:
  - **200 OK**:

    ```json
    {
        "message": "Situazione del materiale creata con successo",
        "id": 123
    }
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**PUT `/api/situazione-materiali/update/:codice_materiale`**
Update an existing material situation.

- **Description**: Updates the details of a material situation in the `SITUAZIONE_MATERIALI` table.
- **Request**:
  - Method: `PUT`
  - Parameters:
    - `codice_materiale` (required): The ID of the material to update.
  - Headers:
    - `Content-Type: application/json`
  - Body:

    ```json
    {
      "custom_data": {
        "DESCRIZIONE_MATERIALE": "Updated Steel Rod",
        "PREZZO_UNITARIO": 22.00
      }
    }
    ```

- **Response**:
  - **200 OK**:

    ```json
    {
        "message": "Situazione del materiale aggiornata correttamente"
    }
    ```

  - **404 Not Found**:

    ```text
    Materiale non trovato
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```

---

**DELETE `/api/situazione-materiali/remove/:codice_materiale`**
Delete a material situation.

- **Description**: Removes a material situation from the `SITUAZIONI_MATERIALI` table.
- **Request**:
  - Method: `DELETE`
  - Parameters:
    - `codice_materiale` (required): The ID of the material to delete.
- **Response**:
  - **200 OK**:

    ```json
    {
        "message": "Situazione del materiale eliminata correttamente"
    }
    ```

  - **404 Not Found**:

    ```json
    {
        "message": "Materiale non trovato"
    }
    ```

  - **500 Internal Server Error**:

    ```text
    Errore interno del server
    ```
