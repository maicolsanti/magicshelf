import Joi from 'joi';

export const createMaterialeSchema = Joi.object({
  DESCRIZIONE_MATERIALE: Joi.string().max(200).optional(),
  MARCA: Joi.string().max(200).optional(),
  CODICE_FORNITORE: Joi.number().integer().required(),
  UNITA_MISURA: Joi.string().max(4).optional(),
  PREZZO_UNITARIO: Joi.number().precision(2).optional(),
});

export const updateMaterialeSchema = Joi.object({
  DESCRIZIONE_MATERIALE: Joi.string().max(200).optional(),
  MARCA: Joi.string().max(200).optional(),
  UNITA_MISURA: Joi.string().max(4).optional(),
  PREZZO_UNITARIO: Joi.number().precision(2).optional(),
});