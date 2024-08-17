import z from 'zod';

const itemSchema = z.object({
  name: z.string(),
  quantity: z.number().positive(),
  price: z.number().positive(),
});

const addressSchema = z.object({
  street: z.string(),
  number: z.number().positive(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zipCode: z.string(),
  addressLine2: z.string().optional(),
});

const cardPaymentSchema = z.object({
  cardNumber: z.string().min(16).max(16),
  cardExpiration: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/),
  cardCVV: z.string().min(3).max(4),
  cardHolderName: z.string().min(1),
});

const clientDataSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  cpf: z.string(),
  paymentMethod: z.enum(['credit_card', 'boleto', 'pix']),
  cardData: z.union([cardPaymentSchema, z.undefined()]),
  address: addressSchema,
  items: z.array(itemSchema),
});

export { clientDataSchema };
