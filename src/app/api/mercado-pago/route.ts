import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

const accessToken = process.env.MP_ACCESS_TOKEN || "";
console.log("🔐 MP_ACCESS_TOKEN:", accessToken ? "Carregado" : "Undefined");

const mp = new MercadoPagoConfig({ accessToken });

export async function POST(req: Request) {
  try {
    if (!accessToken) {
      console.error("Token de acesso do Mercado Pago não está configurado.");
      return NextResponse.json(
        { error: "Configuração do servidor inválida" },
        { status: 500 }
      );
    }

    const body = await req.json();
    console.log("📦 Dados recebidos no backend:", body);

    const {
      token,
      items,
      transaction_amount,
      description,
      payment_method_id,
      email,
      installments,
      identificationType,
      identificationNumber,
    } = body;

    // Validação dos campos obrigatórios
    if (
      !token ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !transaction_amount ||
      !email ||
      !payment_method_id ||
      !installments ||
      !identificationType ||
      !identificationNumber
    ) {
      console.warn("Dados de pagamento ausentes ou inválidos:", body);
      return NextResponse.json(
        { error: "Dados de pagamento inválidos ou ausentes" },
        { status: 400 }
      );
    }

    // Arredondar valores para 2 casas decimais
    const roundedTransactionAmount = Number(Number(transaction_amount).toFixed(2));
    const roundedItems = items.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      picture_url: item.picture_url,
      unit_price: Number(Number(item.unit_price).toFixed(2)),
      quantity: Number(item.quantity),
      category_id: item.category_id,
    }));

    // Validar transaction_amount contra o total dos itens
    const calculatedTotal = roundedItems.reduce(
      (sum: number, item: any) => sum + item.unit_price * item.quantity,
      0
    );
    if (Math.abs(calculatedTotal - roundedTransactionAmount) > 0.01) {
      console.warn("O valor total não corresponde aos itens:", {
        calculatedTotal,
        transaction_amount: roundedTransactionAmount,
      });
      return NextResponse.json(
        { error: "O valor total não corresponde aos itens" },
        { status: 400 }
      );
    }

    // Verificar se o número de parcelas é válido (deve ser positivo e dentro do limite de parcelas)
    if (installments <= 0) {
      console.warn("Número de parcelas inválido:", installments);
      return NextResponse.json(
        { error: "Número de parcelas inválido" },
        { status: 400 }
      );
    }

    const paymentClient = new Payment(mp);
    const paymentData = {
      transaction_amount: roundedTransactionAmount,
      token,
      description: description || "Compra via WineStore",
      installments: Number(installments),
      payment_method_id,
      payer: {
        email,
        identification: {
          type: identificationType,
          number: identificationNumber,
        },
      },
      additional_info: {
        items: roundedItems,
      },
    };

    console.log("📤 Enviando para Mercado Pago:", paymentData);

    const payment = await paymentClient.create({ body: paymentData });

    if (payment.status === "approved") {
      console.log("✅ Pagamento aprovado:", payment.id);
      return NextResponse.json({ status: "approved", paymentId: payment.id });
    } else {
      console.warn("⚠️ Pagamento não aprovado:", payment);
      return NextResponse.json(
        { error: "Pagamento não aprovado", details: payment },
        { status: 400 }
      );
    }
  } catch (err: any) {
    if (err.cause) {
      console.error("❌ Erro Mercado Pago:", JSON.stringify(err.cause, null, 2));
    } else {
      console.error("❌ Erro inesperado:", err);
    }

    return NextResponse.json(
      { error: "Erro ao processar pagamento", details: err.cause || err.message },
      { status: 500 }
    );
  }
}