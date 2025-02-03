import Joi from 'joi';

export const getFilteredSchema = Joi.object({
  DESCRIZIONE_MATERIALE: Joi.string().optional(),
  MARCA: Joi.string().optional(),
  FORNITORE: Joi.string().optional(),
  PREZZO_UNITARIO: Joi.array().items(Joi.number().required()).length(2).optional(),
  ZONA_DI_RICERCA: Joi.string().valid('Fuori dal Comune', 'Dentro al Comune').required(),
  ZONA_DI_PARTENZA: Joi.string().required(),
});