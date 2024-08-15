export interface PaymentProcessResponse {
  trasanctionNumber: string;
  transactionDate: string;
  transactionDetails: TransactionDetails;
}

export interface TransactionDetails {
  errorCode?: number;
  transactionState: string;
  description: string;
}
