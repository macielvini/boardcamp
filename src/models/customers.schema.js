import joi from "joi";

export const customerSchema = joi.object({
  name: joi.string().max(40).required(),
  phone: joi.string().min(10).max(11).regex(/^\d+$/),
  cpf: joi.string().length(11).regex(/^\d+$/),
  birthday: joi.date(),
});
