
import React, { ChangeEvent } from "react";  // Certifique-se de importar ChangeEvent de 'react'
import { FormDataType } from "../../../types/form";  // Certifique-se de importar o FormDataType

export interface PixFormProps {
  formData: FormDataType | undefined;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error: string;
  pixQRCode: string;
  handlePixSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;  // Adicionando a propriedade handlePixSubmit
}

const PixForm: React.FC<PixFormProps> = ({ formData, handleInputChange, error, pixQRCode, handlePixSubmit }) => {
  return (
    <form onSubmit={handlePixSubmit}>  {/* Usando handlePixSubmit aqui */}
      {/* Renderize os campos do formulário aqui */}
      <input
        type="text"
        name="cardholderName"
        value={formData?.cardholderName}
        onChange={handleInputChange}
      />
      {/* Outros campos do formulário */}

      {/* Exibindo o QR Code do Pix */}
      <div>
        <h3>QR Code do Pix</h3>
        <img src={pixQRCode} alt="QRCode do Pix" />
      </div>

      {/* Exibindo o erro */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default PixForm;