import styles from "./pages.module.css";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheck } from "react-icons/fa6";

export default function SuccessPage() {
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000); 

    return () => clearTimeout(timer); 
  }, [router]);
    
  return (
    <div className={styles["success-container"]}>
      <div className={styles["success-title"]}>
         <div className={styles["success-icon"]}><FaCheck size={30} /></div><h1 className={styles["success-icon-h1"]}>Compra realizada com sucesso!</h1>
      </div>
      
      <p className={styles["success-message-1"]}>Seu pedido já está sendo processado!</p>

      <p className={styles["success-message-2"]}>
       Volte sempre! 
      </p>
     
    </div>
  );
}

/*
  const router = useRouter();
  
    useEffect(() => {
      const timer = setTimeout(() => {
        router.push('/');
      }, 5000); // 5 segundos
  
      return () => clearTimeout(timer); // limpa o timer se sair da página antes
    }, [router]);

*/

/*
   <a 
        href="/"
        className={styles["success-button"]}
      >
        Voltar para Home
      </a>

*/