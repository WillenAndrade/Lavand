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
  }
  
  interface Window {
    MercadoPago: new (publicKey: string) => MercadoPago;
  }