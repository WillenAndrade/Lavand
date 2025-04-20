"use client";

import { useEffect } from "react";

declare global {
    interface Window {
      MercadoPago: any;
    }
  }

export const MercadoPagoBrick = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => {
      const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, {
        locale: "pt-BR",
      });

      mp.bricks().create("payment", "paymentBrick_container", {
        initialization: {
          amount: 100, // Valor do carrinho
        },
        customization: {
          paymentMethods: {
            ticket: "all",
            bankTransfer: "all",
            creditCard: "all",
          },
        },
        callbacks: {
          onReady: () => console.log("Brick pronto"),
          onSubmit: async ({ formData }: any) => {
            const res = await fetch("/api/mercado-pago", {
              method: "POST",
              body: JSON.stringify({
                transaction_amount: formData.transaction_amount,
                payment_method_id: formData.payment_method_id,
                description: "Compra na Lavand WineStore",
                payer: {
                  email: formData.payer.email,
                },
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });

            const data = await res.json();
            if (data.id) {
              alert("Pagamento criado com sucesso! ID: " + data.id);
            }
          },
        },
      });
    };

    document.body.appendChild(script);
  }, []);

  return <div id="paymentBrick_container" style={{ marginTop: "20px" }}></div>;
};