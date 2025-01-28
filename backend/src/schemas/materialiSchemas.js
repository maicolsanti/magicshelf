import Joi from 'joi';

export const materialeSchema = Joi.object({
  DESCRIZIONE_MATERIALE: Joi.string().max(200).required(),
  MARCA: Joi.string().max(200).optional(),
  CODICE_FORNITORE: Joi.number().integer().required(),
  UNITA_MISURA: Joi.string().max(4).required(),
  PREZZO_UNITARIO: Joi.number().precision(2).required(),
});