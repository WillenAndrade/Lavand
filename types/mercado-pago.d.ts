interface MercadoPagoOptions {
  locale?: string;
}

interface MercadoPago {
  createCardToken(card: {
    cardNumber: string;
    cardholderName: string;
    expirationMonth: string;
    expirationYear: string;
    securityCode: string;
    identificationType: string;
    identificationNumber: string;
  }): Promise<{ id: string }>;
  getPaymentMethods(params: { bin: string }): Promise<{ results: { id: string }[] }>;
  getInstallments(params: {
    amount: number;
    paymentMethodId: string;
  }): Promise<any>;
  bricks: () => {
    create: (
      brick: string,
      container: string,
      config: any 
    ) => void;
  };
}

interface Window {
  MercadoPago: new (
    publicKey: string,
    options?: MercadoPagoOptions
  ) => MercadoPago;
}