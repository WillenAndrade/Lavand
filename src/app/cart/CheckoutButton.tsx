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
  const [cardPaymentMethod, setCardPaymentMethod] = useState(false)
  const [pixPaymentMethod, setPixPaymentMethod] = useState(false)

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

  useEffect(()=> {
    console.log("PublicAPI:", process.env.NEXT_PUBLIC_MP_PUBLIC_KEY);
  },[])

  useEffect(()=> {
    console.log("MP_ACCESS_TOKEN:", process.env.MP_ACCESS_TOKEN);
  },[])

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { cardNumber, expirationDate, securityCode, cardholderName, docNumber, email } =
      formData;
    if (
      !cardNumber ||
      !expirationDate ||
      !securityCode ||
      !cardholderName ||
      !docNumber ||
      !email
    ) {
      return "Todos os campos são obrigatórios.";
    }
    if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
      return "Data de validade deve estar no formato MM/AA.";
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return "E-mail inválido.";
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

      const cardToken = await mpInstance.createCardToken({

        cardNumber: formData.cardNumber.replace(/\s/g, ""),
        cardholderName: formData.cardholderName,
        expirationMonth: formData.expirationDate.split("/")[0],
        expirationYear: `20${formData.expirationDate.split("/")[1]}`,
        securityCode: formData.securityCode,
        identificationType: formData.docType,
        identificationNumber: formData.docNumber,
      });

      // Enviar dados do pagamento ao backend
      const paymentData = {
        token: cardToken.id,
        items: cart.getItems().map((item) => ({
          title: item.name,
          unit_price: item.price,
          quantity: item.quantity,
        })),
        amount: cart.getTotal(),
        description: "Compra no carrinho",
        payment_method_id: "visa", // Pode ser dinâmico
        email: formData.email,
        installments: parseInt(formData.installments.toString()),
        identificationType: formData.docType,
        identificationNumber: formData.docNumber,
      };

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
    } catch (err) {
      console.error("Erro ao processar pagamento:", err);
      setError("Erro ao processar o pagamento. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

        useEffect(()=> {
         if(pixPaymentMethod) {
          setPixPaymentMethod(false)
         }
        }
      ,[cardPaymentMethod])

      useEffect(()=> {
        if(cardPaymentMethod) {
          setCardPaymentMethod(false)
         }
      }
      ,[pixPaymentMethod])

  return (
    <div className={
      cardPaymentMethod || pixPaymentMethod
        ?  `${styles['choose-payment-method']} ${styles.active}`
        : styles['choose-payment-method']
    }>
                 
                  {!cardPaymentMethod ? <div className={styles["card-icon-div"]} onClick={() => setCardPaymentMethod(true)}><span className={styles["card-span"]}>Cartão</span></div> :  <div className={styles["checkout-button-div"]}>

            <form onSubmit={handleSubmit} className={styles["payment-form"]}>
              <div className={styles["exit-btn"]} onClick={() => setCardPaymentMethod(false)}>x</div>
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
                <label htmlFor="expirationDate">Data de Validade (MM/AA)</label>
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
            <Script  src="https://sdk.mercadopago.com/js/v2"  strategy="lazyOnload"   onLoad={() => {
                 const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
                 if (publicKey) {
                 setMpInstance(new window.MercadoPago(publicKey));
                 }
              }}
            />
            </div>}
    </div>
  );
};

export default CheckoutButton;

//  {!pixPaymentMethod ? <div className={styles["pix-icon-div"]} onClick={() => setPixPaymentMethod(true)}></div>: <div className={styles["checkout-pix-div"]}></div>}