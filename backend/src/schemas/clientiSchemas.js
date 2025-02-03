import Joi from 'joi';

export const updateSchema = Joi.object({
    NOME: Joi.string().max(40).optional(),
    COGNOME: Joi.string().max(40).optional(),
    CAP: Joi.number().optional(),
    CODICE_ISTAT: Joi.number().optional(),
    EMAIL: Joi.string().email().max(320).optional(),
    PHONE_NUMBER: Joi.number().integer().max(9999999999).optional(),
  });