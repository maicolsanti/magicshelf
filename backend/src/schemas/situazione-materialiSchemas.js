import Joi from 'joi';

export const createSituazioneMaterialiSchema = Joi.object({
    CODICE_MATERIALE: Joi.number().integer().required(),
    QUANTITA: Joi.number().precision(2).required(),
});

export const updateSituazioneMaterialiSchema = Joi.object({
  QUANTITA: Joi.number().precision(2).required(),
});