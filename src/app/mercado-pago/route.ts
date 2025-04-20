import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "",
});

export async function POST(req: Request) {
  try {
    // Validar token de acesso
    if (!process.env.MP_ACCESS_TOKEN) {
      console.error("Token de acesso do Mercado Pago não configurado.");
      return NextResponse.json(
        { error: "Configuração do servidor inválida" },
        { status: 500 }
      );
    }

    // Validar corpo da requisição
    const body = await req.json();
    const {
      token,
      items,
      amount,
      description,
      payment_method_id,
      email,
      installments,
      identificationType,
      identificationNumber,
    } = body;

    if (
      !token ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !amount ||
      !email ||
      !payment_method_id ||
      !identificationType ||
      !identificationNumber
    ) {
      return NextResponse.json(
        { error: "Dados de pagamento inválidos ou ausentes" },
        { status: 400 }
      );
    }

    // Criar pagamento com Checkout Transparente
    const paymentClient = new Payment(client);
    const paymentData = {
      transaction_amount: parseFloat(amount),
      token,
      description,
      installments: parseInt(installments),
      payment_method_id,
      payer: {
        email,
        identification: {
          type: identificationType,
          number: identificationNumber,
        },
      },
    };

    const payment = await paymentClient.create({ body: paymentData });

    if (payment.status === "approved") {
      return NextResponse.json({ status: "approved", paymentId: payment.id });
    } else {
      return NextResponse.json(
        { error: "Pagamento não aprovado", details: payment },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("Erro ao processar pagamento:", err);
    return NextResponse.json(
      { error: "Erro ao processar pagamento" },
      { status: 500 }
    );
  }
}