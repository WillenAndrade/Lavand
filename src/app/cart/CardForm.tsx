import React from "react";
import Script from "next/script";
import styles from "./CheckoutButton.module.css";

interface CardFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleCardSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setCardPaymentMethod: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  error: string | null;
  mpInstance: any;
}

const CardForm: React.FC<CardFormProps> = ({
  formData,
  handleInputChange,
  handleCardSubmit,
  setCardPaymentMethod,
  isLoading,
  error,
  mpInstance
}) => {
  return (
    <div className={styles["checkout-button-div"]}>
      <form id="card-form" onSubmit={handleCardSubmit} className={styles["payment-form"]}>
        <div className={styles["exit-btn"]} onClick={() => setCardPaymentMethod(false)}>x</div>
        <h3 className={styles["payment-details"]}>Detalhes do Pagamento (Cartão)</h3>

        
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
            <option value="1">Banco 1</option>
            <option value="2">Banco 2</option>
            <option value="3">Banco 3</option>
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

        <Script
          src="https://sdk.mercadopago.com/js/v2"
          strategy="beforeInteractive"
          onLoad={() => console.log("Mercado Pago SDK carregado")}
        />
      </form>
    </div>
  );
};

export default CardForm;