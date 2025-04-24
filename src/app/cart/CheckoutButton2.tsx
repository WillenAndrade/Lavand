import { FormDataType } from "../../../types/form" 
import React from "react";

interface CheckoutButtonProps {
  formData: FormDataType | undefined;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error: string;
  pixQRCode: string;
  handlePixSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  formData,
  handleInputChange,
  error,
  pixQRCode,
  handlePixSubmit,
}) => {
  return (
    <div>
      <form onSubmit={handlePixSubmit}>
        {/* Renderizar os campos de formulário */}
        <input
          type="text"
          name="cardholderName"
          value={formData?.cardholderName}
          onChange={handleInputChange}
        />
        {/* Exibir o QR Code do Pix */}
        <div>
          <h3>QR Code do Pix</h3>
          <img src={pixQRCode} alt="QRCode do Pix" />
        </div>

        {/* Exibir o erro */}
        {error && <div className="error">{error}</div>}

        <button type="submit">Pagar com Pix</button>
      </form>
    </div>
  );
};

export default CheckoutButton;