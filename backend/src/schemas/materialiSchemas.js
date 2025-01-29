import Joi from 'joi';

export const materialeSchema = Joi.object({
  DESCRIZIONE_MATERIALE: Joi.string().max(200).optional(),
  MARCA: Joi.string().max(200).optional(),
  UNITA_MISURA: Joi.string().max(4).optional(),
  PREZZO_UNITARIO: Joi.number().precision(2).optional(),
});