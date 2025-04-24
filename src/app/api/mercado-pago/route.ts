import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json({ error: "Access token não configurado" }, { status: 500 });
  }

  try {
    const paymentData = await req.json();

    if (!paymentData.token || !paymentData.transaction_amount || !paymentData.payer) {
      return NextResponse.json({ error: "Dados de pagamento incompletos" }, { status: 400 });
    }

    const idempotencyKey = uuidv4();
    console.log("📦 Dados recebidos para pagamento:", JSON.stringify(paymentData, null, 2));

    const response = await axios.post(
      "https://api.mercadopago.com/v1/payments",
      {
        transaction_amount: Number(paymentData.transaction_amount),
        token: paymentData.token,
        description: paymentData.description || "Compra no carrinho",
        installments: paymentData.installments,
        payment_method_id: paymentData.payment_method_id,
        issuer_id: paymentData.issuer_id,
        payer: {
          email: paymentData.payer.email,
          identification: {
            type: paymentData.payer.identification.type,
            number: paymentData.payer.identification.number,
          },
          first_name: paymentData.payer.first_name,
          last_name: paymentData.payer.last_name,
          // Endereço removido temporariamente para evitar erros
        },
        additional_info: {
          items: paymentData.items?.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            picture_url: item.picture_url,
            unit_price: Number(item.unit_price),
            quantity: item.quantity,
            category_id: item.category_id,
          })) || [],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Idempotency-Key": idempotencyKey,
          "Content-Type": "application/json",
        },
      }
    );

    const paymentResponse = response.data;

    if (paymentData.payment_method_id === "pix") {
      return NextResponse.json({
        status: "pending",
        qr_code_base64: paymentResponse.point_of_interaction?.transaction_data?.qr_code_base64,
      });
    }

    return NextResponse.json({
      status: paymentResponse.status,
      id: paymentResponse.id,
      date_approved: paymentResponse.date_approved,
      status_detail: paymentResponse.status_detail,
      payer_email: paymentResponse.payer.email,
    });
  } catch (error: any) {
    console.error("Erro ao processar pagamento:", error?.response?.data || error.message);
    return NextResponse.json({
      error: error?.response?.data || error.message || "Erro ao processar pagamento",
    }, { status: 500 });
  }
}