declare global {
    interface MercadoPagoOptions {
      locale?: string;
    }
  
    interface MercadoPago {
      bricks: () => {
        create: (
          brick: string,
          container: string,
          config: any // Substitua por tipos específicos, se disponíveis
        ) => void;
      };
    }
  
    interface Window {
      MercadoPago: new (
        publicKey: string,
        options?: MercadoPagoOptions
      ) => MercadoPago;
    }
  }
  
  export {};