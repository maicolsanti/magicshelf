import Joi from 'joi';

export const situazioneMaterialiSchema = Joi.object({
    CODICE_MATERIALE: Joi.number().integer().required(),
    QUANTITA: Joi.number().precision(2).required(),
  });