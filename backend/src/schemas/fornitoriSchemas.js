import Joi from 'joi';

export const updateSchema = Joi.object({
    NOME: Joi.string().max(40).optional(),
    COGNOME: Joi.string().max(40).optional(),
    RAGIONE_SOCIALE: Joi.string().max(200).optional(),
    PARTITA_IVA: Joi.string().max(16).optional(),
    EMAIL: Joi.string().email().max(320).optional(),
    CODICE_FISCALE: Joi.string().max(16).optional(),
    CAP: Joi.number().integer().optional(),
    CODICE_ISTAT: Joi.number().integer().optional(),
    INDIRIZZO: Joi.string().max(200).optional(),
    PHONE_NUMBER: Joi.number().integer().max(9999999999).optional(),
  });