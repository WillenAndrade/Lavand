export {};

interface MercadoPagoOptions {
  locale?: string;
}

interface CardForm {
  getCardFormData: () => {
    paymentMethodId: string;
    issuerId: string;
    cardholderEmail: string;
    amount: string;
    token: string;
    installments: string;
    identificationNumber: string;
    identificationType: string;
  };
}

interface MercadoPagoInstance {
  cardForm: (options: {
    amount: string;
    iframe?: boolean;
    form: {
      id: string;
      cardNumber: { id: string; placeholder: string };
      expirationDate: { id: string; placeholder: string };
      securityCode: { id: string; placeholder: string };
      cardholderName: { id: string; placeholder: string };
      issuer: { id: string; placeholder: string };
      installments: { id: string; placeholder: string };
      identificationType: { id: string; placeholder: string };
      identificationNumber: { id: string; placeholder: string };
      cardholderEmail: { id: string; placeholder: string };
    };
    callbacks: {
      onFormMounted: (error?: any) => void;
      onSubmit: (event: Event) => void;
      onFetching?: (resource: string) => () => void;
    };
  }) => CardForm;
  bricks: () => {
    create: (brick: string, container: string, config: any) => void;
  };
}

declare global {
  interface Window {
    MercadoPago: new (
      publicKey: string,
      options?: MercadoPagoOptions
    ) => MercadoPagoInstance;
  }
}