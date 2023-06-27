export type TUsers = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string; // no formato ano-mês-dia T hora:minuto:segundo:milésimo-de-segundos Z
  };

  export type TProduct = {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
  };