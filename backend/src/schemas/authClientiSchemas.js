import Joi from 'joi';

export const registerSchema = Joi.object({
  NOME: Joi.string().max(40).required(),
  COGNOME: Joi.string().max(40).required(),
  CAP: Joi.number().required(),
  CODICE_ISTAT: Joi.number().required(),
  EMAIL: Joi.string().email().max(320).required(),
  PASSWORD_HASH: Joi.string().min(8).max(256).required(),
  PHONE_NUMBER: Joi.number().integer().max(9999999999).optional(),
});

export const loginSchema = Joi.object({
  EMAIL: Joi.string().email().max(320).required(),
  PASSWORD_HASH: Joi.string().min(8).max(256).required(),
});