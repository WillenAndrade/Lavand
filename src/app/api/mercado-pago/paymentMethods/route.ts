import { mercadopago } from "@/lib/mercadoPago";

export async function getPaymentMethods() {
  try {
    const response = await mercadopago.payment_methods.list(); // Obtém todos os métodos de pagamento
    return response;
  } catch (error) {
    console.error("Erro ao obter métodos de pagamento:", error);
    throw error;
  }
}