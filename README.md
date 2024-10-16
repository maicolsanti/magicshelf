# Info Generali

## Nome
## magicshelf

## Cos'è e cosa fa?
## WebApp multipiattaforma.
## Applicazione che permette all’utente di cercare prodotti di determinate marche/qualità/fascia di prezzo (ricerca specifica), in una zona.

## Funzionalità base
### Utente
- ricerca prodotti per specifica
### Fornitore
- caricare prodotti
- modificare prodotti
- eliminare prodotti
### Amministratori (noi)
- gestione generale
- validazione fornitore

## Nice to have / sviluppi futuri
### geolocalizzazione
### profilazione utente secondo le proprie ricerche
### ricerche salvate nei preferiti
### integrazione inserimento prodotti con gestionali dei fornitori
### ordine online

## Tecnologie e framework

# DB
## PostgreSQL

# Backend
## node.js
## Framework --> Express

# Frontend
## vue.js
## Framework --> Bootstrap

# UI
## Figma: https://www.figma.com/design/pjcUQrq626WMbDmfjUXumD/WireFrame?node-id=39-2418&t=sH2ZWa4eZoo2SCGZ-1

# Divisione dei compiti
## Trello: https://trello.com/b/1nIffKwB/progetto-ingengieria-dei-sistemi-web

# Schema ER
## Lucidchart: https://lucid.app/lucidchart/10a3d649-a701-4159-8f2c-538e73909bad/edit?beaconFlowId=7530B553D8FFDA80&page=0_0&invitationId=inv_f3e6d1b6-1420-433c-b1c6-3388ada606b7#

# Endpoint

## Endpoint per l'entità Cliente
### GET /clienti: Restituisce un elenco di tutti i clienti.
### GET /clienti/{codice_cliente}: Restituisce i dettagli di un cliente specifico, identificato dall'ID.
### POST /clienti: Crea un nuovo cliente.
### PUT /clienti/{codice_cliente}: Aggiorna le informazioni di un cliente esistente.
### DELETE /clienti/{codice_cliente}: Elimina un cliente.

## Endpoint per l'entità Fornitore
### GET /fornitori: Restituisce un elenco di tutti i fornitori.
### GET /fornitori/{codice_fornitore}: Restituisce i dettagli di un fornitore specifico.
### POST /fornitori: Crea un nuovo fornitore.
### PUT /fornitori/{codice_fornitore}: Aggiorna le informazioni di un fornitore esistente.
### DELETE /fornitori/{codice_fornitore}: Elimina un fornitore.

## Endpoint per l'entità Materiale
### GET /materiali: Restituisce un elenco di tutti i materiali.
### GET /materiali/{codice_materiale}: Restituisce i dettagli di un materiale specifico.
### POST /materiali: Crea un nuovo materiale.
### PUT /materiali/{codice_materiale}: Aggiorna le informazioni di un materiale esistente.
### DELETE /materiali/{codice_materiale}: Elimina un materiale.

## Endpoint per l'entità Situazione Fornitori
### GET /situazioni-fornitori: Restituisce un elenco di tutte le situazioni dei fornitori (quantità di materiali forniti).
### GET /situazioni-fornitori/{codice_fornitore}/{codice_materiale}: Restituisce la situazione di un fornitore specifico per un materiale specifico.
### POST /situazioni-fornitori: Crea una nuova situazione fornitore (aggiunge una nuova quantità di un materiale fornito da un fornitore).
### PUT /situazioni-fornitori/{id_fornitore}/{id_materiale}: Aggiorna la quantità di un materiale fornito da un fornitore.
### DELETE /situazioni-fornitori/{id_fornitore}/{id_materiale}: Elimina la situazione di un fornitore per un materiale specifico.

## Endpoint per l'entità Località
### GET /localita: Restituisce un elenco di tutte le località.
### GET /localita/{codice_istat}: Restituisce i dettagli di una località specifica, identificata dal CAP.
### POST /localita: Crea una nuova località.
### PUT /localita/{codice_istat}: Aggiorna le informazioni di una località esistente.
### DELETE /localita/{codice_istat}: Elimina una località.