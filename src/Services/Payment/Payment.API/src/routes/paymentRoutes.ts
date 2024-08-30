import express, { Request, Response } from 'express';
import {
  PaymentProcessResponse,
  TransactionDetails,
} from 'responses/paymentProcessResponse';
import { generateTransactionNumber, getCurrentDate } from '../utils/dateUtils';
import { clientDataSchema } from '../validations/ClientDataSchema';

let paymentBehavior = 'approved';

const successMessage =
  'Payment successful: Your transaction has been completed.';

export const paymentRouter = express.Router();

const paymentErrorMessages: string[] = [
  'Payment declined: Insufficient funds.',
  'Payment declined: Invalid card number.',
  'Payment declined: Expired card.',
  'Payment declined: Card type not supported.',
  'Payment declined: Card blocked by issuer.',
  'Payment declined: Transaction limit exceeded.',
  'Payment declined: Network error, please try again.',
  'Payment declined: Currency not supported.',
  'Payment declined: Unauthorized transaction.',
  'Payment declined: Cardholder name incorrect.',
  'Payment declined: Bank authorization failure.',
  'Payment declined: Duplicate transaction detected.',
  'Payment declined: Invalid transaction amount.',
  'Payment declined: Technical error, please try again later.',
  'Payment declined: Service unavailable, please try again later.',
];

paymentRouter.post('/process', (req: Request, res: Response) => {
  const parseResult = clientDataSchema.safeParse(req.body);

  if (!parseResult.success)
    return res.status(404).json({ error: parseResult.error.errors });
  const response: PaymentProcessResponse = {
    transactionDate: getCurrentDate(),
    trasanctionNumber: generateTransactionNumber(),
    transactionDetails: returnCheckedTransactionDetails(paymentBehavior),
  };

  res.json(response);
});

paymentRouter.post('/set-state', (req: Request, res: Response) => {
  const { behavior } = req.body;
  if (behavior === 'approved' || behavior === 'denied') {
    paymentBehavior = behavior;
    res.json({ message: `Payment behavior set to ${behavior}` });
  } else {
    res
      .status(400)
      .json({ error: 'Invalid behavior. Must be "approved" or "denied".' });
  }
});

const returnCheckedTransactionDetails = (state: string): TransactionDetails => {
  if (state === 'approved') {
    return { transactionState: state, description: successMessage };
  } else {
    const randomIndex = Math.floor(Math.random() * paymentErrorMessages.length);
    return {
      transactionState: state,
      description: paymentErrorMessages[randomIndex],
      errorCode: randomIndex,
    };
  }
};
