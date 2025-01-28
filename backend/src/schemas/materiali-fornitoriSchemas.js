import Joi from 'joi';

export const getFilteredSchema = Joi.object({
  DESCRIZIONE_MATERIALE: Joi.string().required(),
  MARCA: Joi.string().required(),
  FORNITORE: Joi.string().required(),
  PREZZO_UNITARIO: Joi.array().items(Joi.number().required()).length(2).required(),
  ZONA_DI_RICERCA: Joi.string().valid('Fuori dal Comune', 'Dentro al Comune').required(),
  ZONA_DI_PARTENZA: Joi.string().required(),
});