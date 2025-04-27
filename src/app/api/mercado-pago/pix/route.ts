import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';

// Tipo personalizado para corrigir a tipagem do payment.create
interface PaymentCreate {
  create: (body: { body: any }, requestOptions?: RequestOptions) => Promise<any>;
}

// Interface explícita para RequestOptions
interface RequestOptions {
  headers?: {
    [key: string]: string;
  };
}

// Verificação do MP_ACCESS_TOKEN
const mpAccessToken = process.env.MP_ACCESS_TOKEN;
console.log('MP_ACCESS_TOKEN loaded:', mpAccessToken ? 'Yes' : 'No');
if (mpAccessToken) {
  console.log(`MP_ACCESS_TOKEN starts with: ${mpAccessToken.substring(0, 5)}... ends with: ${mpAccessToken.substring(mpAccessToken.length - 5)}`);
  if (mpAccessToken.trim() !== mpAccessToken) {
    console.error('⚠️ MP_ACCESS_TOKEN contém espaços em branco no início ou fim!');
  }
} else {
  console.error('❌ MP_ACCESS_TOKEN não está definido. Verifique seu arquivo .env.local e reinicie o servidor.');
}

export async function POST(req: NextRequest) {
  if (!process.env.MP_ACCESS_TOKEN) {
    console.error('❌ Tentativa de executar API route sem MP_ACCESS_TOKEN configurado.');
    return NextResponse.json(
      { error: 'Erro de configuração do servidor: Access Token do Mercado Pago faltando.' },
      { status: 500 }
    );
  }

  console.log(
    `Initializing MercadoPagoConfig with accessToken: ${
      process.env.MP_ACCESS_TOKEN.substring(0, 5) + '...' + process.env.MP_ACCESS_TOKEN.substring(process.env.MP_ACCESS_TOKEN.length - 5)
    }`
  );

  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });
  console.log('MercadoPagoConfig client instance created:', client);

  const payment = new Payment(client) as unknown as PaymentCreate;
  console.log('Payment resource instance created:', payment);

  const idempotencyKey = uuidv4();
  console.log(`Generated X-Idempotency-Key: ${idempotencyKey}`);

  try {
    const body = await req.json();
    console.log('Backend received body for PIX payment:', body);

    // Validação dos campos essenciais
    if (
      !body.transaction_amount ||
      isNaN(Number(body.transaction_amount)) ||
      !body.payer?.email ||
      !body.payer?.first_name ||
      !body.payer?.last_name ||
      !body.payer?.identification?.type ||
      !body.payer?.identification?.number ||
      !body.items
    ) {
      console.error('Dados essenciais faltando ou inválidos no corpo da requisição PIX:', body);
      const missingFields = [];
      if (!body.transaction_amount || isNaN(Number(body.transaction_amount))) missingFields.push('transaction_amount');
      if (!body.payer?.email) missingFields.push('payer.email');
      if (!body.payer?.first_name) missingFields.push('payer.first_name');
      if (!body.payer?.last_name) missingFields.push('payer.last_name');
      if (!body.payer?.identification?.type) missingFields.push('payer.identification.type');
      if (!body.payer?.identification?.number) missingFields.push('payer.identification.number');
      if (!body.items) missingFields.push('items');
      return NextResponse.json(
        { error: 'Dados essenciais para o pagamento PIX faltando ou inválidos.', missing: missingFields },
        { status: 400 }
      );
    }

    const transactionAmount = Number(body.transaction_amount);
    console.log('Processed transaction_amount:', transactionAmount);

    const paymentData = {
      transaction_amount: transactionAmount,
      payment_method_id: 'pix',
      description: body.description || 'Pagamento via PIX',
      payer: {
        email: body.payer.email,
        first_name: body.payer.first_name,
        last_name: body.payer.last_name,
        identification: {
          type: body.payer.identification.type,
          number: body.payer.identification.number,
        },
      },
      additional_info: {
        items: body.items.map((item: any) => ({
          id: item.id?.toString(),
          title: item.title || item.name,
          description: item.description || item.title || item.name,
          picture_url: item.picture_url || item.src,
          unit_price: Number(item.unit_price),
          quantity: item.quantity,
          category_id: item.category_id || 'wines',
        })) || [],
      },
    };

    console.log('Payment data to be sent to Mercado Pago:', paymentData);

    const requestOptions: RequestOptions = {
      headers: {
        'X-Idempotency-Key': idempotencyKey,
      },
    };

    const response = await payment.create({ body: paymentData }, requestOptions);

    console.log('Mercado Pago PIX response:', response);

    if (response.status === 'pending' && response.point_of_interaction?.transaction_data?.qr_code_base64) {
      return NextResponse.json({
        status: response.status,
        qr_code_base64: response.point_of_interaction.transaction_data.qr_code_base64,
        qr_code: response.point_of_interaction.transaction_data.qr_code,
      });
    } else {
      console.error('Resposta inesperada do Mercado Pago PIX:', response);
      const errorMessage = response.status_detail || `Status inesperado: ${response.status}`;
      return NextResponse.json(
        { error: `Erro ao gerar QR Code para PIX: ${errorMessage}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Erro geral ao criar pagamento PIX:', error);
    if (error.cause && error.cause.length > 0) {
      console.error('Detalhes do erro do Mercado Pago:', error.cause);
    }
    return NextResponse.json(
      { error: 'Erro interno ao processar pagamento.', details: error.cause || error.message },
      { status: 500 }
    );
  }
}