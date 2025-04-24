import React from "react";
import styles from "./CheckoutButton.module.css";

interface PaymentOptionsProps {
  setCardPaymentMethod: React.Dispatch<React.SetStateAction<boolean>>;
  setPixPaymentMethod: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  setCardPaymentMethod,
  setPixPaymentMethod,
}) => {
  return (
    <div className={styles["payment-options"]}>
      <h2>Escolha o método de pagamento</h2>
      <div className={styles["payment-buttons"]}>
        <button onClick={() => setCardPaymentMethod(true)}>Cartão de Crédito</button>
        <button onClick={() => setPixPaymentMethod(true)}>PIX</button>
      </div>
    </div>
  );
};

export default PaymentOptions;