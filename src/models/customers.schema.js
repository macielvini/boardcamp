import joi from "joi";

export const customerSchema = joi.object({
  name: joi.string().max(40).required(),
  phone: joi.number().required(),
  cpf: joi.number().required(),
  birthday: joi.date(),
});
