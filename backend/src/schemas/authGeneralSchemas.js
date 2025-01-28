import Joi from 'joi';

export const changePasswordSchema = Joi.object({
    OLD_PASSWORD: Joi.string().min(8).max(256).required(),
    NEW_PASSWORD: Joi.string().min(8).max(256).required(),
});