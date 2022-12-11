import joi from "joi";

export const customerSchema = joi.object({
  name: joi.string().max(40).required(),
  phone: joi.string().min(10).max(11).regex(/^\d+$/).required(),
  cpf: joi.string().length(11).regex(/^\d+$/).required(),
  birthday: joi
    .string()
    .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    .message({
      "string.pattern.base": "birthday must match the pattern YYYY-MM-DD",
    })
    .required(),
});
