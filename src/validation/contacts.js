import Joi from 'joi';
import { typeList } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ 'any.required': `Name is required` }),
  phoneNumber: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({ 'any.required': `Phone Number is required` }),
  email: Joi.string()
    .email()
    .required()
    .messages({ 'any.required': `Email is required` }),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string()
    .valid(...typeList)
    .required()
    .messages({ 'any.required': `Contact type is required` }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  phoneNumber: Joi.string(),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList),
});
