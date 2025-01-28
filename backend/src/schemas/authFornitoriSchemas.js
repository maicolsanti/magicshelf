import Joi from 'joi';

export const registerSchema = Joi.object({
  NOME: Joi.string().max(40).required(),
  COGNOME: Joi.string().max(40).required(),
  RAGIONE_SOCIALE: Joi.string().max(200).required(),
  PARTITA_IVA: Joi.string().max(16).required(),
  EMAIL: Joi.string().email().max(320).required(),
  CODICE_FISCALE: Joi.string().max(16).required(),
  CAP: Joi.number().integer().required(),
  CODICE_ISTAT: Joi.number().integer().required(),
  INDIRIZZO: Joi.string().max(200).required(),
  PASSWORD_HASH: Joi.string().min(8).max(256).required(),
  PHONE_NUMBER: Joi.number().integer().max(9999999999).optional(),
});

export const loginSchema = Joi.object({
    CODICE_FISCALE: Joi.string().max(16).required(),
    PASSWORD_HASH: Joi.string().min(8).max(256).required(),
});