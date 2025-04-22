"use client";

import { useEffect, useState } from "react";
import { useCart } from "../cart/CartContext" // Acesso ao contexto do carrinho

export const MercadoPagoBrick = () => {
  const { cart } = useCart(); // Obtendo o carrinho do contexto
  const [amount, setAmount] = useState<number>(0);

  // Atualizando o valor total do carrinho
  useEffect(() => {
    const totalAmount = cart.getTotal(); // Obtenha o total calculado pelo método getTotal()
    setAmount(totalAmount);
  }, [cart]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => {
      const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, {
        locale: "pt-BR",
      });

      mp.bricks().create("payment", "paymentBrick_container", {
        initialization: {
          amount, // Usando o valor do carrinho
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
            // Coletando os dados do formulário enviado pelo Brick
            const res = await fetch("/api/mercado-pago", {
              method: "POST",
              body: JSON.stringify({
                token: formData.token,
                items: cart.getItems(), // Passando os itens do carrinho
                transaction_amount: formData.transaction_amount,
                description: "Compra na WineStore",
                payment_method_id: formData.payment_method_id,
                email: formData.payer.email,
                installments: formData.installments,
                identificationType: formData.payer.identification.type,
                identificationNumber: formData.payer.identification.number,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });

            const data = await res.json();
            if (data.status === "approved") {
              alert("Pagamento aprovado com sucesso! ID: " + data.paymentId);
            } else {
              alert("Falha ao processar pagamento: " + data.error);
            }
          },
        },
      });
    };

    document.body.appendChild(script);
  }, [amount, cart]);

  return <div id="paymentBrick_container" style={{ marginTop: "20px" }}></div>;
};