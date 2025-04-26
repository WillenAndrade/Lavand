import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid'; // Importa a função v4 da biblioteca uuid
// @ts-ignore
// Ignora o erro de importação se o TypeScript não encontrar o módulo RequestOptions no caminho especificado.
import { RequestOptions } from 'mercadopago/dist/clients/common/RequestOptions'; // <-- @ts-ignore REAL APLICADO AQUI

// --- Verificação detalhada da variável de ambiente (Mantida fora para log inicial) ---
const mpAccessToken = process.env.MP_ACCESS_TOKEN;

// Loga se o token foi carregado e uma parte dele (sem expor o token completo)
console.log('MP_ACCESS_TOKEN loaded:', mpAccessToken ? 'Yes' : 'No');
if (mpAccessToken) {
    // Loga os primeiros 5 e os últimos 5 caracteres do token para ajudar a verificar
    console.log(`MP_ACCESS_TOKEN starts with: ${mpAccessToken.substring(0, 5)}... ends with: ${mpAccessToken.substring(mpAccessToken.length - 5)}`);
    // Adiciona um log para verificar se há espaços em branco no início ou fim
    if (mpAccessToken.trim() !== mpAccessToken) {
        console.error('⚠️ MP_ACCESS_TOKEN contém espaços em branco no início ou fim!');
    }
} else {
    console.error('❌ MP_ACCESS_TOKEN não está definido. Verifique seu arquivo .env.local e reinicie o servidor.');
    // Em um ambiente real, você pode querer retornar um erro 500 aqui ou falhar no startup
    // Esta parte do código será executada apenas uma vez quando a API route for carregada.
}
// --- Fim da verificação detalhada ---

// NÃO INICIALIZAMOS client e payment AQUI FORA NESTA VERSÃO


// Handler para requisições POST para criar um pagamento PIX
export async function POST(req: NextRequest) {
  // Verifica se o Access Token foi carregado na inicialização antes de prosseguir
  // Isso evita o erro "Cannot read properties of undefined" se o token estiver faltando
  if (!process.env.MP_ACCESS_TOKEN) {
       console.error('❌ Tentativa de executar API route sem MP_ACCESS_TOKEN configurado.');
       return NextResponse.json({ error: 'Erro de configuração do servidor: Access Token do Mercado Pago faltando.' }, { status: 500 });
  }

  // --- Inicializa o cliente e o recurso Payment DENTRO do handler ---
  // Isso garante que eles sejam criados a cada requisição com o valor atual do env var
  // --- Logando o valor que será passado para MercadoPagoConfig (mascarado) ---
  console.log(`Initializing MercadoPagoConfig with accessToken DENTRO do handler: ${process.env.MP_ACCESS_TOKEN ? process.env.MP_ACCESS_TOKEN.substring(0, 5) + '...' + process.env.MP_ACCESS_TOKEN.substring(process.env.MP_ACCESS_TOKEN.length - 5) : 'undefined'}`);
  // --- Fim do log ---
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!, // Usamos o env var diretamente aqui
  });

  // --- Logando a instância do cliente APÓS a criação ---
  console.log('MercadoPagoConfig client instance created:', client);
  // --- Fim do log ---


  const payment = new Payment(client);

  // --- Logando a instância do Payment APÓS a criação ---
  console.log('Payment resource instance created:', payment);
  // --- Fim do log ---

  // --- Fim da Inicialização Interna ---


  // Gera um UUID V4 único para esta requisição
  // Essencial para a idempotência: garante que a mesma requisição não seja processada mais de uma vez por engano
  const idempotencyKey = uuidv4();
  console.log(`Generated X-Idempotency-Key: ${idempotencyKey}`);

  try {
    // Lê o corpo da requisição JSON enviado pelo frontend
    const body = await req.json();

    // Logar o body recebido para debug (opcional, remova em produção)
    console.log('Backend received body for PIX payment:', body);

    // --- Validar campos essenciais recebidos do frontend ---
    // Verifica se os campos essenciais para criar um pagamento PIX estão presentes e não vazios
    if (
        !body.transaction_amount ||
        !body.payer?.email ||
        !body.payer?.first_name ||
        !body.payer?.last_name ||
        !body.payer?.identification?.type ||
        !body.payer?.identification?.number ||
        !body.items // Validar se items foi enviado pelo frontend para incluir em additional_info
    ) {
        console.error('Dados essenciais faltando ou vazios no corpo da requisição PIX:', body);
        // Adicionado detalhes para ajudar a identificar qual campo está faltando na resposta de erro
        const missingFields = [];
        if (!body.transaction_amount) missingFields.push('transaction_amount');
        if (!body.payer?.email) missingFields.push('payer.email');
        if (!body.payer?.first_name) missingFields.push('payer.first_name');
        if (!body.payer?.last_name) missingFields.push('payer.last_name');
        if (!body.payer?.identification?.type) missingFields.push('payer.identification.type');
        if (!body.payer?.identification?.number) missingFields.push('payer.identification.number');
        if (!body.items) missingFields.push('items'); // Adicionado validação para items
        return NextResponse.json({ error: 'Dados essenciais para o pagamento PIX faltando.', missing: missingFields }, { status: 400 });
    }

    // --- Criação do pagamento PIX usando o SDK do Mercado Pago ---

    // Cria as opções da requisição, incluindo o header X-Idempotency-Key
    // @ts-ignore
    // Ignora o erro de tipo para a definição de requestOptions, se o TypeScript reclamar da estrutura do objeto.
    const requestOptions: RequestOptions = { // <-- @ts-ignore REAL APLICADO AQUI
        headers: {
            'X-Idempotency-Key': idempotencyKey, // Inclui a chave de idempotência gerada
        },
    };

    // --- CONTORNO PARA O ERRO DE TIPAGEM DO TYPESCRIPT (se necessário) ---
    // Se o TypeScript reclamar que payment.create espera 1 argumento, use este contorno.
    // Explicitamente informa ao TypeScript que payment.create pode receber 2 argumentos.
    // O tipo 'any' é usado aqui para simplificar o contorno da tipagem.
    // const createPayment = payment.create as (body: any, requestOptions: RequestOptions) => Promise<any>; // Removido o casting

    // Chama o método create do SDK para criar o pagamento na API do Mercado Pago
    const response = await payment.create({ // <-- CHAMADA DIRETA AGORA
      body: {
        transaction_amount: Number(body.transaction_amount), // Converte para número, garantindo o tipo correto
        payment_method_id: 'pix', // Define o método de pagamento como PIX
        description: body.description || 'Pagamento via PIX', // Descrição do pagamento, com fallback
        payer: {
          email: body.payer.email, // E-mail do pagador (já validado acima)
          first_name: body.payer.first_name, // Nome do pagador (já validado acima)
          last_name: body.payer.last_name,         // Sobrenome do pagador (já validado acima)
          identification: { // <-- Objeto identification com tipo e número
              type: body.payer.identification.type, // Tipo de documento (já validado acima)
              number: body.payer.identification.number, // Número do documento (já validado acima)
          }
          // Você pode adicionar mais dados do pagador se necessário (telefone, endereço, etc.)
          // Ex: address: { street_name: '...', street_number: '...', zip_code: '...' }
        },
        // --- ADICIONANDO additional_info COM ITEMS ---
        additional_info: {
            items: body.items.map((item: any) => ({
                id: item.id?.toString(), // Convert id to string, handle potential undefined
                title: item.title || item.name, // Use item.title or item.name
                description: item.description || item.title || item.name, // Use description, title, or name
                picture_url: item.picture_url || item.src, // Use picture_url or src
                unit_price: Number(item.unit_price)?.toFixed(2), // Ensure unit_price is number before toFixed
                quantity: item.quantity,
                category_id: item.category_id || "wines", // Use a valid category_id or fallback
                // REMOVIDO: currency_id: item.currency_id || "BRL", // <-- Removido conforme erro da API
            })) || [], // Garante que items seja um array mesmo se body.items for null/undefined
        },
        // --- FIM additional_info ---
        // Você pode adicionar outros campos aqui, como metadata, notification_url, etc.
        // Ex: external_reference: 'ID_DO_SEU_PEDIDO',
        // Ex: notification_url: 'URL_DO_SEU_WEBHOOK', // Importante para receber atualizações de status
      },
    }, requestOptions); // <-- Passa as opções da requisição, incluindo o header de idempotência

    // Logar a resposta completa do Mercado Pago (opcional, remova em produção)
    console.log('Mercado Pago PIX response:', response);

    // --- Tratamento da resposta do Mercado Pago ---
    // Para PIX, o status inicial esperado é 'pending' e a resposta contém os dados do QR Code
    if (response.status === 'pending' && response.point_of_interaction?.transaction_data?.qr_code_base64) {
         // Retorna os dados relevantes para o frontend
         return NextResponse.json({
             status: response.status, // Status do pagamento (esperado: 'pending')
             qr_code_base64: response.point_of_interaction.transaction_data.qr_code_base64, // QR Code em base64 para exibir a imagem
             qr_code: response.point_of_interaction.transaction_data.qr_code, // String do QR Code (código copia e cola)
             // Inclua outros campos úteis se necessário, como o ID do pagamento gerado pelo MP:
             // id: response.id,
         });
    } else {
        // Se a API do MP retornou um status diferente de 'pending' ou sem os dados do QR code, algo inesperado ocorreu
         console.error('Resposta inesperada do Mercado Pago PIX:', response);
         // Retorna uma mensagem de erro mais descritiva se possível
         const errorMessage = response.status_detail || `Status inesperado: ${response.status}`;
         return NextResponse.json({ error: `Erro ao gerar QR Code para PIX: ${errorMessage}` }, { status: 500 });
    }


  } catch (error: any) {
    // --- Tratamento de erros na chamada da API ou outras exceções ---
    console.error('Erro geral ao criar pagamento PIX:', error);

    // Tenta extrair detalhes do erro da API do Mercado Pago, se disponíveis
    if (error.cause && error.cause.length > 0) {
        console.error('Detalhes do erro do Mercado Pago:', error.cause);
        // Opcional: Retornar um erro mais específico para o frontend baseado nos detalhes do MP
        // Ex: const mpErrorMessage = error.cause[0].description || 'Erro desconhecido do Mercado Pago';
        // return NextResponse.json({ error: `Erro do Mercado Pago: ${mpErrorMessage}` }, { status: 500 });
    }

    // Retorna uma resposta de erro genérica para o frontend
    return NextResponse.json({ error: 'Erro interno ao processar pagamento.' }, { status: 500 });
  }
}
