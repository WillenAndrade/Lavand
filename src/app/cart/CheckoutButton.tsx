"use client";

import { useCart } from "./CartContext";
import Script from "next/script";
import styles from "./CheckoutButton.module.css";
import { useEffect, useState } from "react";

interface CardFormData {
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  cardholderName: string;
  docType: string;
  docNumber: string;
  email: string;
  installments: number;
}

const CheckoutButton = () => {
  const { cart } = useCart();
  const [mpInstance, setMpInstance] = useState<MercadoPago | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardPaymentMethod, setCardPaymentMethod] = useState(false);
  const [pixPaymentMethod, setPixPaymentMethod] = useState(false);
  const [formData, setFormData] = useState<CardFormData>({
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    cardholderName: "",
    docType: "CPF",
    docNumber: "",
    email: "",
    installments: 1,
  });

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
    if (publicKey && window.MercadoPago) {
      setMpInstance(new window.MercadoPago(publicKey));
    } else {
      console.error("Chave pública do Mercado Pago ou SDK não carregado.");
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "expirationDate") {
      // Máscara para o campo de data (MM/AA)
      const formattedValue = value
        .replace(/\D/g, "") // Remove todos os caracteres não numéricos
        .slice(0, 4) // Limita a entrada a 4 caracteres (MM/AA)
        .replace(/(\d{2})(\d{2})/, "$1/$2"); // Adiciona a barra separadora

      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const { cardNumber, expirationDate, securityCode, cardholderName, docNumber, email } = formData;
    if (!cardNumber || !expirationDate || !securityCode || !cardholderName || !docNumber || !email) {
      return "Todos os campos são obrigatórios.";
    }
    if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
      return "Data de validade deve estar no formato MM/AA.";
    }
    const [month] = expirationDate.split("/");
    if (parseInt(month) < 1 || parseInt(month) > 12) {
      return "Mês de validade inválido.";
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return "E-mail inválido.";
    }
    if (formData.docType === "CPF" && !/^\d{11}$/.test(docNumber.replace(/[^\d]/g, ""))) {
      return "CPF inválido.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mpInstance) {
      setError("Mercado Pago SDK não carregado.");
      return;
    }

    const formError = validateForm();
    if (formError) {
      setError(formError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [expirationMonth, expYearSuffix] = formData.expirationDate.split("/");
      const expirationYear = `20${expYearSuffix}`;
      const formattedExpirationMonth = parseInt(expirationMonth).toString();

      const cardToken = await mpInstance.createCardToken({
        cardNumber: formData.cardNumber.replace(/\s/g, ""),
        cardholderName: formData.cardholderName,
        expirationMonth: formattedExpirationMonth,
        expirationYear,
        securityCode: formData.securityCode,
        identificationType: formData.docType,
        identificationNumber: formData.docNumber.replace(/[^\d]/g, ""),
      });

      console.log("🪙 Token gerado:", cardToken);

      const paymentData = {
        token: cardToken.id,
        items: cart.getItems().map((item) => ({
          id: item.id.toString(), // Converte para string para compatibilidade
          title: item.name,
          description: item.name, // Usa item.name como description
          picture_url: item.src, // Usa item.src como picture_url
          unit_price: Number(item.price.toFixed(2)),
          quantity: item.quantity,
          category_id: "wines",
        })),
        transaction_amount: Number(cart.getTotal().toFixed(2)),
        description: "Compra no carrinho",
        payment_method_id: "visa",
        email: formData.email,
        installments: Number(formData.installments),
        identificationType: formData.docType,
        identificationNumber: formData.docNumber.replace(/[^\d]/g, ""),
      };

      console.log("📤 Enviando paymentData:", paymentData);

      const res = await fetch("/api/mercado-pago", {
        method: "POST",
        body: JSON.stringify(paymentData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.status === "approved") {
        alert("Pagamento aprovado! Redirecionando...");
        window.location.href = "/success";
      } else {
        setError(data.error || "Erro ao processar o pagamento.");
      }
    } catch (err: any) {
      console.error("Erro ao processar pagamento:", err);
      setError(err.message || "Erro ao processar o pagamento. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pixPaymentMethod) setCardPaymentMethod(false);
  }, [pixPaymentMethod]);

  useEffect(() => {
    if (cardPaymentMethod) setPixPaymentMethod(false);
  }, [cardPaymentMethod]);

  return (
    <div
      className={
        cardPaymentMethod || pixPaymentMethod
          ? `${styles["choose-payment-method"]} ${styles.active}`
          : styles["choose-payment-method"]
      }
    >
      {!cardPaymentMethod ? (
        <div className={styles["card-icon-div"]} onClick={() => setCardPaymentMethod(true)}>
          <span className={styles["card-span"]}>Cartão</span>
        </div>
      ) : (
        <div className={styles["checkout-button-div"]}>
          <form onSubmit={handleSubmit} className={styles["payment-form"]}>
            <div className={styles["exit-btn"]} onClick={() => setCardPaymentMethod(false)}>
              x
            </div>
            <h3 className={styles["payment-details"]}>Detalhes do Pagamento</h3>

            <div className={styles["form-group"]}>
              <label htmlFor="cardNumber">Número do Cartão</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
                maxLength={19}
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="expirationDate">Validade (MM/AA)</label>
              <input
                type="text"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                placeholder="MM/AA"
                required
                maxLength={5}
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="securityCode">CVV</label>
              <input
                type="text"
                id="securityCode"
                name="securityCode"
                value={formData.securityCode}
                onChange={handleInputChange}
                placeholder="123"
                required
                maxLength={4}
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="cardholderName">Nome no Cartão</label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleInputChange}
                placeholder="Nome Completo"
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="docType">Tipo de Documento</label>
              <select
                id="docType"
                name="docType"
                value={formData.docType}
                onChange={handleInputChange}
                required
              >
                <option value="CPF">CPF</option>
                <option value="CNPJ">CNPJ</option>
              </select>
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="docNumber">Número do Documento</label>
              <input
                type="text"
                id="docNumber"
                name="docNumber"
                value={formData.docNumber}
                onChange={handleInputChange}
                placeholder="123.456.789-00"
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu.email@exemplo.com"
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="installments">Parcelas</label>
              <select
                id="installments"
                name="installments"
                value={formData.installments}
                onChange={handleInputChange}
                required
              >
                <option value={1}>1x (à vista)</option>
                <option value={2}>2x</option>
                <option value={3}>3x</option>
              </select>
            </div>

            {error && <p className={styles["error-message"]}>{error}</p>}

            <div className={styles["checkout-button-div"]}>
              <button
                type="submit"
                className={styles["checkout-button"]}
                disabled={isLoading || !mpInstance}
              >
                {isLoading ? "Processando..." : "Pagar"}
              </button>
            </div>
          </form>

          <Script
            src="https://sdk.mercadopago.com/js/v2"
            strategy="beforeInteractive"
          />
        </div>
      )}
    </div>
  );
};

export default CheckoutButton;