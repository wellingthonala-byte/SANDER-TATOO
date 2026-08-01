export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "dor",
    question: "A tatuagem dói?",
    answer:
      "A sensação varia de pessoa para pessoa e de região para região. Áreas com mais massa muscular tendem a ser mais confortáveis. Trabalhamos com pausas, ritmo controlado e todo o suporte necessário para que a sessão seja tranquila do início ao fim.",
  },
  {
    id: "preco",
    question: "Quanto custa uma tatuagem?",
    answer:
      "O valor depende do tamanho, do nível de detalhe, da região do corpo e do número de sessões. Após entender sua ideia, enviamos um orçamento fechado e sem surpresas — incluindo a quantidade estimada de sessões.",
  },
  {
    id: "tempo",
    question: "Quanto tempo leva para ficar pronta?",
    answer:
      "Peças pequenas costumam ser finalizadas em uma única sessão de 1 a 3 horas. Projetos maiores, como fechamentos, são divididos em sessões de até 5 horas com intervalo de 3 a 4 semanas para cicatrização.",
  },
  {
    id: "referencia",
    question: "Posso levar uma referência?",
    answer:
      "Sim, e incentivamos. Referências ajudam a entender seu gosto. A partir delas criamos um projeto autoral e exclusivo — nunca reproduzimos a tatuagem de outra pessoa.",
  },
  {
    id: "cuidados",
    question: "Como devo cuidar da tatuagem?",
    answer:
      "Você recebe um guia completo de cicatrização e acompanhamento pelo WhatsApp. Em resumo: higienização suave, pomada indicada, nada de sol direto, piscina ou mar durante as primeiras semanas.",
  },
  {
    id: "estilos",
    question: "Vocês tatuam qualquer estilo?",
    answer:
      "Somos especializados em realismo, fine line, blackwork, fechamentos e trabalhos coloridos. Se o estilo desejado estiver fora da nossa especialidade, indicamos um profissional de confiança para você.",
  },
];
