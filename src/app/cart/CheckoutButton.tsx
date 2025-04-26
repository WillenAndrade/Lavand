"use client";
import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import Script from "next/script";
import styles from "./CheckoutButton.module.css";

interface MercadoPagoInstance {
  cardForm: (options: {
    amount: string;
    iframe?: boolean;
    form: {
      id: string;
      cardNumber: { id: string; placeholder: string };
      expirationDate: { id: string; placeholder: string };
      securityCode: { id: string; placeholder: string };
      cardholderName: { id: string; placeholder: string };
      issuer: { id: string; placeholder: string };
      installments: { id: string; placeholder: string };
      identificationType: { id: string; placeholder: string };
      identificationNumber: { id: string; placeholder: string };
      cardholderEmail: { id: string; placeholder: string };
    };
    callbacks: {
      onFormMounted: (error?: any) => void;
      onSubmit: (event: Event) => void;
      onFetching?: (resource: string) => () => void;
    };
  }) => {
    getCardFormData: () => {
      paymentMethodId: string;
      issuerId: string;
      cardholderEmail: string;
      amount: string;
      token: string;
      installments: string;
      identificationNumber: string;
      identificationType: string;
    };
  };
  bricks: () => {
    create: (brick: string, container: string, config: any) => void;
  };
}

interface CardFormData {
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  cardholderName: string;
  docType: string;
  docNumber: string;
  email: string;
  installments: number;
  streetName: string;
  streetNumber: string;
  zipCode: string;
  issuer: string;

    firstName?: string; 
    lastName?: string; 
}


const CheckoutButton = () => {
  const { cart, clearCart } = useCart();
  const [mpInstance, setMpInstance] = useState<MercadoPagoInstance | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardPaymentMethod, setCardPaymentMethod] = useState(false);
  const [pixPaymentMethod, setPixPaymentMethod] = useState(false);
  const [pixQRCode, setPixQRCode] = useState<string | null>(null);

  const [formData, setFormData] = useState<CardFormData>({
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    cardholderName: '',
    docType: 'CPF',
    docNumber: '',
    email: '',
    streetName: '',
    streetNumber: '',
    zipCode: '',
    installments: 1,
    issuer: '',
    firstName: '', 
    lastName: '',  
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.MercadoPago && mpInstance === null) {
      const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
      if (!publicKey) {
        console.error("❌ NEXT_PUBLIC_MP_PUBLIC_KEY não está definida.");
        setError("Erro de configuração: Chave pública não encontrada.");
        return;
      }
      setMpInstance(new window.MercadoPago(publicKey, { locale: "pt-BR" }));
    }
  }, [mpInstance]);

     const handlePaymentMethod = (method: string) : void => {
        console.log("Este é o método:" + method)
        if(method == 'pix') {
            setCardPaymentMethod(false)
            setPixPaymentMethod(true)
        } if (method == 'card'){
            setCardPaymentMethod(true)
            setPixPaymentMethod(false) 
        }
     }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const validateCardForm = () => {
    const { cardNumber, expirationDate, securityCode, cardholderName, docNumber, email, streetName, streetNumber, zipCode } = formData;
    if (!cardNumber || !expirationDate || !securityCode || !cardholderName || !docNumber || !email || !streetName || !streetNumber || !zipCode) {
      return "Todos os campos são obrigatórios.";
    }
    if (!/^[0-9 ]{12,19}$/.test(cardNumber.replace(/\s/g, ""))) {
      return "Número do cartão inválido.";
    }
    if (!/^[0-9]{3,4}$/.test(securityCode)) {
      return "Código de segurança inválido.";
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return "E-mail inválido.";
    }
    if (formData.docType === "CPF" && !/^\d{11}$/.test(docNumber.replace(/[^\d]/g, ""))) {
      return "CPF inválido.";
    }
    return null;
  };

  
  const validatePixForm = () => {
    const { email, docNumber, firstName, lastName } = formData; // Incluindo firstName e lastName na validação
    // Todos os campos essenciais para PIX agora são validados
    if (!email || !docNumber || !firstName || !lastName) {
      return "Por favor, preencha todos os campos (Nome, Sobrenome, E-mail e Documento).";
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return "E-mail inválido.";
    }
    if (formData.docType === "CPF" && !/^\d{11}$/.test(docNumber.replace(/[^\d]/g, ""))) {
      return "CPF inválido.";
    }
    // Adicionar validações básicas para nome/sobrenome se necessário (ex: não vazios)
    return null;
  };


  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mpInstance) {
      setError("Mercado Pago SDK não carregado.");
      return;
    }

    const formError = validateCardForm();
    if (formError) {
      setError(formError);
      return;
    }

    const total = cart.getTotal();
    if (!total || isNaN(total) || total <= 0) {
      setError("Erro: O valor total do carrinho é inválido.");
      return;
    }
    const amount = total.toFixed(2); 
    console.log("Cart total:", total, "Amount for cardForm:", amount);

    const detectIssuer = (cardNumber: string): string => {
      const cleanedCardNumber = cardNumber.replace(/\s/g, "");
      if (cleanedCardNumber.startsWith("4")) return "visa";
      if (/^5[1-5]/.test(cleanedCardNumber)) return "master";
      if (/^3[47]/.test(cleanedCardNumber)) return "amex";
      return "";
    };

    const issuer = detectIssuer(formData.cardNumber);
    if (!issuer) {
      setError("Não foi possível detectar o emissor do cartão.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const cardForm = mpInstance.cardForm({
        amount: amount,
        iframe: false, 
        form: {
          id: "card-form",
          cardNumber: { id: "form-checkout__cardNumber", placeholder: "Número do cartão" },
          expirationDate: { id: "form-checkout__expirationDate", placeholder: "MM/AA" },
          securityCode: { id: "form-checkout__securityCode", placeholder: "Código de segurança" },
          cardholderName: { id: "form-checkout__cardholderName", placeholder: "Titular do cartão" },
          issuer: { id: "form-checkout__issuer", placeholder: "Banco emissor" },
          installments: { id: "form-checkout__installments", placeholder: "Parcelas" },
          identificationType: { id: "form-checkout__docType", placeholder: "Tipo de documento" },
          identificationNumber: { id: "form-checkout__docNumber", placeholder: "Número do documento" },
          cardholderEmail: { id: "form-checkout__email", placeholder: "E-mail" },
        },
        callbacks: {
          onFormMounted: (error) => {
            if (error) {
              console.warn("Form Mounted handling error:", error);
              setError("Erro ao montar o formulário: " + error);
              return;
            }
            console.log("Formulário montado");
          },
          
          onSubmit: async (event) => {
            event.preventDefault();
            console.log("Creating card token with amount:", amount);
            const {
              paymentMethodId: payment_method_id,
              issuerId: issuer_id,
              cardholderEmail: email,
              amount: formAmount,
              token,
              installments,
              identificationNumber,
              identificationType,
            } = cardForm.getCardFormData(); 

            const paymentData = {
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(formAmount),
              installments: Number(installments),
              description: "Compra no carrinho",
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
                first_name: formData.cardholderName.split(" ")[0] || "Comprador",
                last_name: formData.cardholderName.split(" ").slice(1).join(" ") || "Cartao",
                address: {
                  street_name: formData.streetName,
                  street_number: formData.streetNumber,
                  zip_code: formData.zipCode,
                },
              },
              items: cart.getItems().map((item) => ({
                id: item.id.toString(),
                title: item.name,
                description: item.description || item.name,
                picture_url: item.src,
                unit_price: Number(item.price.toFixed(2)),
                quantity: item.quantity,
                category_id: item.category_id || "wines",
                currency_id: "BRL",
              })),
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
              clearCart();
              window.location.href = "/success";
            } else {
              setError(data.error || "Erro ao processar o pagamento.");
            }
          },
          onFetching: (resource) => {
            console.log("Fetching resource:", resource);
            const progressBar = document.querySelector(".progress-bar");
            if (progressBar) progressBar.removeAttribute("value");
            return () => {
              if (progressBar) progressBar.setAttribute("value", "0");
            };
          },
        },
      });

        
      const issuerInput = document.getElementById("form-checkout__issuer") as HTMLInputElement;
      const detectIssuer = (cardNumber: string): string => {
        const cleanedCardNumber = cardNumber.replace(/\s/g, "");
        if (cleanedCardNumber.startsWith("4")) return "visa";
        if (/^5[1-5]/.test(cleanedCardNumber)) return "master";
        if (/^3[47]/.test(cleanedCardNumber)) return "amex";
        return "";
      };
     
      const issuer = detectIssuer(formData.cardNumber);
      issuerInput.value = issuer;

    } catch (err: any) {
      setError(err.message || "Erro ao criar token ou processar pagamento: " + JSON.stringify(err));
      console.error("Erro ao criar token ou processar pagamento:", err);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handlePixSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   
    const formError = validatePixForm();
    if (formError) {
      setError(formError);
      return;
    }

    setIsLoading(true);
    setError(null);
    setPixQRCode(null); 

    try {
      const total = cart.getTotal();
      if (!total || isNaN(total) || total <= 0) {
         setError("Erro: O valor total do carrinho é inválido para PIX.");
         setIsLoading(false);
         return;
      }

      const paymentData = {
        
        transaction_amount: Number(total.toFixed(2)), 
        description: "Compra no carrinho", 
        payment_method_id: "pix", 
        
        payer: {
          email: formData.email, // E-mail do estado do formulário
          first_name: formData.firstName, // Primeiro nome do estado do formulário
          last_name: formData.lastName,   // Sobrenome do estado do formulário
          identification: { // Objeto de identificação
            type: formData.docType, // Tipo de documento do estado do formulário
            number: formData.docNumber.replace(/[^\d]/g, ""), // Número do documento limpo
          },
          // Adicione dados de endereço ou outros campos do pagador se sua API backend/MP exigir
          // address: { ... }
        },
        // --- FIM DA ESTRUTURA PAYER ---
        items: cart.getItems().map((item) => ({
          id: item.id.toString(),
          title: item.name,
          description: item.description || item.name,
          picture_url: item.src, // Certifique-se de que é uma URL válida se necessário
          unit_price: Number(item.price.toFixed(2)),
          quantity: item.quantity,
          category_id: item.category_id || "wines", // Use um category_id válido
          currency_id: "BRL",
        })),
        // Adicione outros campos relevantes como external_reference, notification_url, etc.
      };

      console.log("📤 Enviando paymentData (PIX) para o backend:", paymentData);

      // --- CORRIGINDO O ENDPOINT PARA PIX ---
      const res = await fetch("/api/mercado-pago/pix", { // <-- MUDANÇA AQUI: Endpoint correto para PIX
        method: "POST",
        body: JSON.stringify(paymentData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      // Tratamento da resposta do backend para PIX
      if (res.ok && data.status === "pending" && data.qr_code_base64) {
        console.log("✅ QR Code PIX recebido.");
        setPixQRCode(data.qr_code_base64);
        // Opcional: exibir o código copia e cola também: data.qr_code
      } else {
        console.error("❌ Erro ao gerar QR Code para PIX:", data);
        setError(data.error || "Erro ao gerar QR Code para PIX.");
      }
    } catch (err: any) {
      // Tratamento de erros de rede ou exceções
      setError(err.message || "Erro na comunicação com o servidor de pagamento PIX.");
      console.error("❌ Erro ao processar PIX:", err);
    } finally {
      setIsLoading(false); // Esconde o indicador de carregamento
    }
  };
  // --- Fim do método handlePixSubmit Corrigido ---


  if (!mpInstance && cardPaymentMethod) {
    return <p>Carregando SDK do Mercado Pago...</p>;
  }

  return (
    <>
        <div className={styles["payment-method-container"]}>
             <div className={styles["payment-method"]}>
                     <div className={styles["card-icon-div"]} onClick={() => handlePaymentMethod("card")}>
                      <span className={styles["card-span"]}>Cartão</span>
                    </div>
                    <div className={styles["pix-icon-div"]} onClick={() => handlePaymentMethod("pix")}>
                    </div>
             </div>
        </div>
        {cardPaymentMethod && <div className={styles["card-form-container"]}> <form id="card-form" onSubmit={handleCardSubmit} className={styles["card-payment-form"]}>
            <div className={styles["exit-btn-card"]} onClick={() => setCardPaymentMethod(false)}>
              x
            </div>
            <h3 className={styles["payment-details"]}>Cartão</h3>

            <div className={styles["form-group"]}>
              <label htmlFor="form-checkout__cardNumber">Número do Cartão</label>
              <input
                type="text"
                id="form-checkout__cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
                maxLength={19}
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="form-checkout__issuer">Banco Emissor</label>
              <select
                id="form-checkout__issuer"
                name="issuer"
                value={formData.issuer}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione o banco</option>

                <option value="1" >Confirmar depois</option>
              </select>
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="form-checkout__expirationDate">Data de Validade</label>
              <input
                type="text"
                id="form-checkout__expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                placeholder="MM/AA"
                required
                maxLength={5}
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="form-checkout__securityCode">Código de Segurança</label>
              <input
                type="text"
                id="form-checkout__securityCode"
                name="securityCode"
                value={formData.securityCode}
                onChange={handleInputChange}
                placeholder="123"
                required
                maxLength={4}
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="form-checkout__cardholderName">Nome no Cartão</label>
              <input
                type="text"
                id="form-checkout__cardholderName"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleInputChange}
                placeholder="Titular do cartão"
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="form-checkout__docType">Tipo de Documento</label>
              <select
                id="form-checkout__docType"
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
              <label htmlFor="form-checkout__docNumber">Número do Documento</label>
              <input
                type="text"
                id="form-checkout__docNumber"
                name="docNumber"
                value={formData.docNumber}
                onChange={handleInputChange}
                placeholder="12345678900"
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="form-checkout__email">E-mail</label>
              <input
                type="email"
                id="form-checkout__email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@exemplo.com"
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="form-checkout__streetName">Rua</label>
              <input
                type="text"
                id="form-checkout__streetName"
                name="streetName"
                value={formData.streetName}
                onChange={handleInputChange}
                placeholder="Rua Exemplo"
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="form-checkout__streetNumber">Número</label>
              <input
                type="text"
                id="form-checkout__streetNumber"
                name="streetNumber"
                value={formData.streetNumber}
                onChange={handleInputChange}
                placeholder="123"
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="form-checkout__zipCode">CEP</label>
              <input
                type="text"
                id="form-checkout__zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="12345-678"
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="form-checkout__installments">Parcelas</label>
              <select
                id="form-checkout__installments"
                name="installments"
                value={formData.installments}
                onChange={handleInputChange}
                required
              >
                <option value="1">1x</option>
                <option value="2">2x</option>
                <option value="3">3x</option>
              </select>
            </div>
            <input
              type="hidden"
              id="form-checkout__issuer"
              value=""
            />
            <progress value="0" className={styles["progress-bar"]}>Carregando...</progress>

            {error && <p className={styles["error-message"]}>{error}</p>}

            <div className={styles["checkout-button-div"]}>
              <button
                className={styles["card-checkout-btn"]}
                type="submit"
                disabled={isLoading || !mpInstance}
              >
                {isLoading ? "Processando..." : "Pagar"}
              </button>
            </div>
          </form>
        <Script
            src="https://sdk.mercadopago.com/js/v2"
            strategy="beforeInteractive"
            onLoad={() => console.log("Mercado Pago SDK carregado")}
          />
        </div>}

        {pixPaymentMethod && <div className={styles["pix-form-container"]}><form onSubmit={handlePixSubmit} className={styles["pix-payment-form"]}> 
            <div className={styles["exit-btn-pix"]} onClick={() => setPixPaymentMethod(false)}>
              x
            </div>
            <h3 className={styles["payment-details-pix"]}>PIX</h3>

            <div className={styles["form-group"]}>
              <label htmlFor="pix-firstName">Nome</label>
              <input
                type="text"
                id="pix-firstName"
                name="firstName" // Nome do campo no estado formData
                value={formData.firstName} // Valor do estado
                onChange={handleInputChange} // Atualiza o estado
                placeholder="Seu primeiro nome"
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="pix-lastName">Sobrenome</label>
              <input
                type="text"
                id="pix-lastName"
                name="lastName" // Nome do campo no estado formData
                value={formData.lastName} // Valor do estado
                onChange={handleInputChange} // Atualiza o estado
                placeholder="Seu sobrenome"
                required
              />
            </div>

            {/* Campos de E-mail, Tipo e Número de Documento para PIX */}
            <div className={styles["form-group"]}>
              <label htmlFor="form-checkout__email_pix">E-mail</label> {/* ID diferente para evitar conflito se o campo de cartão for gerenciado pelo SDK */}
              <input
                type="email"
                id="form-checkout__email_pix"
                name="email" // Nome do campo no estado formData
                value={formData.email} // Valor do estado
                onChange={handleInputChange} // Atualiza o estado
                placeholder="email@exemplo.com"
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="form-checkout__docType_pix">Tipo de Documento</label> {/* ID diferente */}
              <select
                id="form-checkout__docType_pix"
                name="docType" // Nome do campo no estado formData
                value={formData.docType} // Valor do estado
                onChange={handleInputChange} // Atualiza o estado
                required
              >
                <option value="CPF">CPF</option>
                <option value="CNPJ">CNPJ</option>
              </select>
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="form-checkout__docNumber_pix">Número do Documento</label> {/* ID diferente */}
              <input
                type="text"
                id="form-checkout__docNumber_pix"
                name="docNumber" // Nome do campo no estado formData
                value={formData.docNumber} // Valor do estado
                onChange={handleInputChange} // Atualiza o estado
                placeholder="12345678900"
                required
              />
            </div>


            {error && <p className={styles["error-message"]}>{error}</p>}

            {/* Exibe o QR Code PIX se disponível */}
            {pixQRCode && (
              <div className={styles["pix-qr-code"]}>
                <h4>Escaneie o QR Code para pagar</h4>
                {/* Usa a tag img com a fonte base64 */}
                <img className={styles["qr-code-img"]} src={`data:image/png;base64,${pixQRCode}`} alt="QR Code PIX" />
                {/* Opcional: exibir o código copia e cola */}
                {/* <p>Ou copie e cole o código:</p> */}
                {/* <textarea readOnly value={pixCopyPasteCode} /> */}
              </div>
            )}

            {/* Botão de submissão */}
            <div className={styles["checkout-button-div"]}>
              <button
                className={styles["pix-checkout-btn"]}
                type="submit"
                disabled={isLoading || !!pixQRCode} // Desabilita se carregando ou se o QR code já foi gerado
              >
                {isLoading ? "Processando..." : pixQRCode ? "QR Code Gerado" : "Gerar PIX"}
              </button>
            </div>
          </form></div>}

    </>
  );
};

export default CheckoutButton;
