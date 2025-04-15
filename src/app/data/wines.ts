export type Wine = {
  id: number;
  name: string;
  owner: string;
  price: number;
  src: string;
  description: {
    origin: string,
    method: string,
    grape: string;
    nationality: string;
    aromaticProfile: string;
    coloring: string;
    indication: string,
    award: string;
  };
}

const wines: Wine [] = [
  {
    id: 1,
    name: "Pazo Torrado",
    owner: "Angosto",
    price: 76.90,
    src: "/pazo-torrado.png",
    description: {
      origin: "D.O Rias Baixas, Espanha",
      method: "Método tradicional",
      grape: "100% Alvarinho",
      nationality: "Espanha",
      aromaticProfile: "Segundo o método tradicional do Vale do Sanes, apresenta notas de maçã fresca, cítrico e flores brancas. Intensidade média alta. Acidez muito viva e grande frescor. Final longo e persistente com excelênte mineralidade.",
      coloring: "Amarelo palha brilhante com reflexos esverdeados",
      indication: "Aperitivos, saladas, carnes brancas, peixes e frutos do mar",
      award: "89 pts: Wine Spectator"
    }
}, {
    id: 2,
    name: "Marques de la Concordia Brut",
    owner: "M de la concordia",
    price: 62.90,
    src: "/marques-de-la-concordia-brut.png",
    description: {
      origin: "D.O Cava, Espanha",
      method: "Método tradicional",
      grape: "40% Macabeo, 30% Parellada, 30% Xare-lo",
      nationality: "Espanha",
      aromaticProfile: "Amarelho palha com tons esverdeados brilhantes, borbulhas abundantes, finas e persistentes. Aromas de frutas verdes, notas de frutas tropicais, fundos cítricos e de ervas frescas. Paladar fresco ligeiro e elegante.",
      coloring: "",
      indication:"Aperitivos, saladas, ostras, peixes e frutos do mar",
      award: "88 pts: Guia Peñin"
    }
}, {
    id: 3,
    name: "Marques de la Concordia Reserva",
    owner: "M de la concordia",
    price: 89.90,
    src: "/marques-de-la-concordia-reserva.png",
    description: {
      origin: "D.O, Cava, Espanha",
      method: "Método tradicional Crianza de 40 meses",
      grape: "30% Chardonnay, 25% Macabeo, 25% Parellada, 20% Xare-lo",
      aromaticProfile: "Amarelo dourado pálido. Aroma intenso de citrino e pêssego, com notas de pão tostado. Em boca resulta em fino e elegante",
      nationality: "Espanha",
      coloring: "",
      indication: "Aperitivos, saladas, queijos leves, ostras, peixes e frutos do mar",
      award: "88 pts: Wine Spectator"
    }
}, {
  id: 4,
  name: "Marques de la Concordia Brut Rose",
  owner: "M de la concordia",
  price: 89.90,
  src: "/marques-de-la-concordia-brut-rose.png",
  description: {
    origin: "D.O, Cava, Espanha",
    method: "Método tradicional",
    grape: "70% Monastrell, 30% Pinot Noir",
    aromaticProfile: "Coloração rosé pálida. Aroma intenso de frutos vermelhos, como framboesa, amoras, e fruta madura. Em boca resulta fresco, equilibrado e muito elegante, mostrando um final persistente e muito refrescante. ",
    nationality: "Espanha",
    coloring: "",
    indication: "Aperitivos, cremes, frutos do mar, peixes, foie-gras e sobremesas",
    award: "88 pts: Wine Spectator"
  }
},{
  id: 5,
  name: "Marques de la Concordia Demi-Sec",
  owner: "M de la concordia",
  price: 89.90,
  src: "/marques-de-la-concordia-reserva.png",
  description: {
    origin: "D.O, Cava, Espanha",
    method: "Método tradicional",
    grape: "40% Macabeo, 30% Parellada, 30% Xare-lo",
    aromaticProfile: "Amarelo palha com reflexos dourados, borbulhas médias formam uma bela coroa. Aromas são florais e de fruta fresca, com sutis aromas cítricos, paladar estruturado, fresco, com suave acidez e tons florais",
    nationality: "Espanha",
    coloring: "",
    indication: "Aperitivos, saladas, queijos leves, ostras, peixes e frutos do mar",
    award: "88 pts: Guia Peñin"
  }
},{
    id: 6,
    name: "Almendros",
    owner: "Angosto",
    price: 89.90,
    src: "/almendros.png",
    description: {
      origin: "",
      method: "5 meses barrica carvalho francês",
      grape: "70% Verdejo, 30% Sauvignon Blanc",
      aromaticProfile: "Um excelente equilíbrio entre a madeira e o frescor, onde as frutas brancas, flores e leves rotas de cremosidade surpreende até chegar ao seu longo final. Um vinho saboroso e muito elegante",
      nationality: "Espanha",
      coloring: "Amarelo palha com reflexos dourados",
      indication: "Aperitivos, saladas, risotos, peixes gordurosos e frutos do mar",
      award: "92 pts: Guia Peñin"
    }
}, {
  id: 7,
  name: "Marques de la Vega",
  owner: "Angosto",
  price: 89.90,
  src: "/marques-de-la-vega.png",
  description: {
    origin: "D.O La Mancha, Espanha",
    method: "",
    grape: "100% Verdejo",
    aromaticProfile: "Intensidade aromatica média com notas de erva-doce, cítricos e maçã verde. Na boca resulta fresco e com uma acidez bem equilibrada",
    nationality: "Espanha",
    coloring: "Amarelo palha com reflexos esverdeados",
    indication: "Aperitivos, saladas, carnes brancas, peixes e frutos do mar",
    award: ""
  }
}, {
  id: 8,
  name: "Nave Sur",
  owner: "Angosto",
  price: 89.90,
  src: "/nave-sur-4.png",
  description: {
    origin: "D.O. Rueda, Espanha",
    method: "",
    grape: "100% Verdejo",
    aromaticProfile: "Um 100% Rueda, frutado com notas de maçã e ervas finas, delicado e boa tipicidade. Vivo e com boa estrutura e final, resultando em equilibrado e saboroso",
    nationality: "Espanha",
    coloring: "Amarelo palha brilhante, com reflexos esverdeados",
    indication: "Aperitivos, saladas, carnes brancas, peixes e frutos do mar",
    award: "Gold Berliner Wein Trophy, 88 Wine Enthusiast "
  }
}, {
  id: 9,
  name: "Finca Gabriel Malbec Rosé",
  owner: "Angosto",
  price: 89.90,
  src: "/finca-gabriel-malbec-rose.png",
  description: {
    origin: "Mendoza, Argentina",
    method: "",
    grape: "100% Malbec",
    aromaticProfile: "Aroma de frutos vermelhos silvestres. Excelente acidez e frescor, que junto a doçura da fruta torna o vinho uma escolha muito agradável e fácil de tomar",
    nationality: "Argentina",
    coloring: "Rosado intenso, límpido brilhante",
    indication: "Aperitivos, saladas, pizzas, peixes, sushi, sashimi e frutos do mar",
    award: ""
  }
}, {
  id: 10,
  name: "Finca Gabriel Chardonnay",
  owner: "Angosto",
  price: 89.90,
  src: "/finca-gabriel-chardonnay.png",
  description: {
    origin: "Mendoza, Argentina",
    method: "",
    grape: "100% Chardonnay",
    aromaticProfile: "Aroma intenso com notas de bananas e abacaxi. Grande frescor com uma entrada levemente doce em boca",
    nationality: "Argentina",
    coloring: "Amarelo brilhante com reflexos esverdeados",
    indication: "Aperitivos, saladas, queijos suaves, peixes e frutos do mar",
    award: "Silver Awards Vinus"
  }
}, {
  id:11,
  name: "Bondades Sauvignon Blanc",
  owner: "Angosto",
  price: 89.90,
  src: "/bondades-sauvignon-blanc.jpg",
  description: {
    origin: "Mendoza, Argentina",
    method: "",
    grape: "100% Sauvignon Blanc",
    aromaticProfile: "Em nariz, destacam notas cítricas como limão e toranja combinadas com ervas e pêssegos maduros. Boa acidez, resultando em refrescante, expressivo e aromático.",
    nationality: "Espanha",
    coloring: "Amarelo brilhante com reflexos esverdeados",
    indication: "Aperitivos, saladas, sushi, peixe, ostras e frutos do mar",
    award: "92 pts: Guia Peñin"
  }
}, {
  id: 12,
  name: "Angosto",
  owner: "Angosto",
  price: 89.90,
  src: "/angosto4.jpg",
  description: {
    origin: "D.O. Valência, Espanha",
    method: "",
    grape: "25% Chardonnay, 25% Verdejo, 25% Muscat, 25% Sauvignon Blanc",
    aromaticProfile: "Aromático frutado. Notas de fruta branca, flores e ervas, em perfeito equilibrio. Harmonioso e saboroso, elegante e fresco na boca",
    nationality: "Espanha",
    coloring: "Amarelo palha brilhante com tons esverdeados",
    indication: "Aperitivos, saladas, peixes e frutos do mar",
    award: "92 pts: Guia Peñin"
  }
}, {
  id: 13,
  name: "Quinta de Gomariz Loureiro",
  owner: "Angosto",
  price: 89.90,
  src: "/quinta-de-gomariz-loureiro.png",
  description: {
    origin: "Vinhos verdes Portugal",
    method: "",
    grape: "100% Loureiro",
    aromaticProfile: "Aromas de limão e toranja(grapefruit), e um toque de perfume floral. Apresenta-se com acidez bem equilibrada, mineral com 'Agulha' natural e final longo e persistente ",
    nationality: "Portugal",
    coloring: "Citrina brilhante",
    indication: "Aperitivos, saladas, peixes, cozinha asiática e italiana, carnes brancas sushi e frutos do mar",
    award: "Gold Mundus Vini"
  }
}, {
  id: 14,
  name: "Quinta de Gomariz Alvarinho",
  owner: "Angosto",
  price: 89.90,
  src: "/quinta-de-gomariz-alvarinho-3.png",
  description: {
    origin: "Vinhos verdes, Portugal",
    method: "",
    grape: "100% Alvarinho",
    aromaticProfile: "Uma das castas mais apreciadas no Vale do Ave. O nariz é vivo com nuances florais e frutadas em uma harmonia única e sabor e frescura. Acidez bem equilibrada com minerais persistentes e final prolongado",
    nationality: "Portugal",
    coloring: "Cor citrina brilhante",
    indication: "Aperitivos, saladas, peixes, aves, sushi e frutos do mar",
    award: "Gold Mundus Vini"
  }
}, {
  id: 15,
  name: "Marguerite Torrontés",
  owner: "Angosto",
  price: 89.90,
  src: "/marguerite-torrontes.png",
  description: {
    origin: "Mendoza Argentina",
    method: "",
    grape: "100% Torrontés",
    aromaticProfile: "Grande intensidade, apresentando aromas tropicais como abacaxi e jasmin. Na boca uma acidez muito equilibrada com notas cítricas e florais, resultando em um vinho aromático e refrescante",
    nationality: "Mendoza Argentina",
    coloring: "Amarelo brilhante com reflexos esverdeados",
    indication: "Aperitivos, empanados, saladas, sushi e frutos do mar",
    award: "92 pts: Guia Peñin"
  }
}, {
  id: 16,
  name: "Quinta de Gomariz Grande Escolha",
  owner: "Angosto",
  price: 89.90,
  src: "/quinta-de-gomariz-grande-escolha.png",
  description: {
    origin: "Vinhos verdes, Portugal",
    method: "",
    grape: "Alvarinho, Trajadura, Loureiro, Avesso, Fernão Pires e Azal",
    aromaticProfile: "Elegância e finesse. O nariz é vivo com nuances florais e frutadas muito marcantes. Deliciosa textura cremosa. Em boca, apresenta-se suave, persistente e natural 'agulha' típica dos Vinhos Verdes",
    nationality: "Espanha",
    coloring: "Cor citrina brilhante",
    indication: "Aperitivos, saladas, peixes, aves, sushi e frutos do mar",
    award: "Gold Mundus Vini"
  }
}, {
  id: 17,
  name: "Solar das Mouras",
  owner: "Angosto",
  price: 89.90,
  src: "/solar-das-mouras.png",
  description: {
    origin: "Alentejo Portugal",
    method: "",
    grape: "Arinto, Antão e Perrun",
    aromaticProfile: "Com aroma frutado a citrinos, com toques de baunilha e levemente mineral. Fresco, equilibrado. Final longo e persistente",
    nationality: "Portugal",
    coloring: "Amarelo citrino",
    indication: "Aperitivos, saladas, risotos, peixes grelhados e carnes brancas",
    award: ""
  }
}, {
  id: 18,
  name: "Identidad Rose",
  owner: "Angosto",
  price: 89.90,
  src: "/identidad-rose.png",
  description: {
    origin: "D.O. Utiel-Requena, Espanha",
    method: "",
    grape: "100% Bobal (Variedade autóctone)",
    aromaticProfile: "Aroma de frutos vermelhos, leves notas de especiarias e toda influência do mar mediterrâneo para oferecer um rosé com autêntic equilíbrio, frescor e plenitude ao paladar ",
    nationality: "Espanha",
    coloring: "Rosado claro límpido e brilhante",
    indication: "Aperitivos, saladas, pizzas, carnes brancas, sushi e sashimi, peixes e frutos do mar",
    award: ""
  }
}, {
  id: 19,
  name: "Cullerot",
  owner: "cullerot",
  price: 89.90,
  src: "/cullerot.png",
  description: {
    origin: "D.O Valência, Espanha",
    method: "6 meses ânforas/talhas de barro",
    grape: "Pedro Ximenez, Macabeo, Malvasia, Tortosina, Verdil, Merseguera, Chardonnay",
    aromaticProfile: "Intenso, fresco e espressivo, com lembranças de fruta fresca e toque cítricos. Sensação mineral entregando um maior volume. Excelente entrada, levemente untuoso, boa acidez e persistência.",
    nationality: "Espanha",
    coloring: "Amarelo palha com reflexos dourados",
    indication: "Aperitivos, risotos, saladas, peixes gordurosos e frutos do mar",
    award: "91 pts: Robert Parker"
  }
}, {
  id: 20,
  name: "Licenciado Reserva",
  owner: "Angosto",
  price: 89.90,
  src: "/licenciado-reserva.png",
  description: {
    origin: "D.O Ca La Rioja",
    method: "18 meses em Barrica de carvalho",
    grape: "100% Trempanillo",
    aromaticProfile: "Em nariz agradável profundo, com notas de frutos maduros, baunilha e especiarias. Elegante e equilibrado, com taninos bem integrados. Saboroso, potente, com um final longo com lembranças de ameixa e pão tostado",
    nationality: "Espanha",
    coloring: "Vermelho rubi intenso brilhante",
    indication: "Embutidos, carnes vermelhas queiijos e assados",
    award: "91 pts: James Suckling, Doc 95 pts  World Wine 2026"
  }
}, {
  id: 21,
  name: "Barrica Andina Pinot Noir",
  owner: "Angosto",
  price: 89.90,
  src: "/barrica-andina-pinot-noir.png",
  description: {
    origin: "Vale de Maule, Chile",
    method: "3 meses barrica de carvalho",
    grape: "100% Pinot Noir",
    aromaticProfile: "Aromas intensos de morangos maduros, mirtilo e notas de folhas de tábaco torradas. Em boca é delicado, rico, muito frutado com taninos macios e sabor persistente.",
    nationality: "Chile",
    coloring: "Rubi Brilhante",
    indication: "Risotos, vegetais assados, cremes, queijos, atum e salmão",
    award: ""
  }
}, {
  id: 22,
  name: "Barrica Andina Carménère",
  owner: "barrica-andina-carmenere",
  price: 89.90,
  src: "/barrica-andina-carmenere.png",
  description: {
    origin: "Valle Central Chile",
    method: "",
    grape: "100% Carménère",
    aromaticProfile: "Seus aromas lembram-nos de maduros frutos vermelhos com notas intensas de pimenta. Na boca é macio e redondo, com taninos doces",
    nationality: "Chile",
    coloring: "Vermelho-violeta intenso",
    indication: "Massas com molhos condimentados, carnes vermelhas com pouca gordura, assados e queijo tipo parmesão",
    award: ""
  }
}, {
  id: 23,
  name: "Romanico",
  owner: "Angosto",
  price: 89.90,
  src: "/romanico.png",
  description: {
    origin: "D.O - Toro, Espanha",
    method: "6 meses barrica de carvalho francês",
    grape: "100% Tinta de toro (Vinhas velhas)",
    aromaticProfile: "Um vinho surpreendente cheio de pureza e profundidade. Redondo e aveludado. Boa acidez, dotado de um grande frescor e aroma de frutas negras",
    nationality: "Espanha",
    coloring: "Vermelho púrpura intenso",
    indication: "Assados, carnes vermelhas, cordeiros e aperitivos",
    award: "92 pts: Robert Parker"
  }
}, {
  id: 24,
  name: "Cuarenta Vendimias Seleccion Especial",
  owner: "Angosto",
  price: 89.90,
  src: "/quarenta-vendimias-seleccion-especial.png",
  description: {
    origin: "D.O Ribera del Duero, Espanha",
    method: "9 meses barrica de carvalho",
    grape: "100% Trempanillo",
    aromaticProfile: "Aroma intenso com notas de alcaçuz, frutos pretos maduros, amora, ameixa e um fundo de torrefação e especiarias. Potente em boca, complexo e estruturado com lembranças de frutos pretos e retrogosto muito longo",
    nationality: "Espanha",
    coloring: "Vermelho rubi com reflexos violetas",
    indication: "Assados e carnes vermelhas, aperitivos e queijos curados",
    award: "90 pts: Guia Peñin"
  }
}, {
  id: 25,
  name: "Almendros Tinto",
  owner: "almendros-tinto",
  price: 89.90,
  src: "/almendros-tinto.png",
  description: {
    origin: "D.O - Valência, Espanha",
    method: "5 meses barrica carvalho francês",
    grape: "50% Syrah, 30% Garnacha, 20% Cabernet Franc",
    aromaticProfile: "Em nariz apresenta complexidade e aroma de frutos vermelhos, flores, tostados e especiarias. Taninos macios e aveludados. No paladar resulta cheio, redonto e saboroso",
    nationality: "Espanha",
    coloring: "Rubi intenso com reflexos violetas",
    indication: "Aperitivos, carnes vermelhas, carnes de caça e queijos curados",
    award: "92 pts: Guia Peñin"
  }
}, {
  id: 26,
  name: "Legitim de Miller",
  owner: "legitim-de-miller",
  price: 89.90,
  src: "/legitim-de-miller.png",
  description: {
    origin: "D.O Ca Priorat",
    method: "12 meses barrica carvalho francês",
    grape: "Garnacha, Merlot, Syrah",
    aromaticProfile: "Aromas de frutos vermelhos, fruta madura, ameixa tostados. Extremamente equilibrado, resultando saboroso e cálido no paladar. Retrogosto longo, agradavel e duradouro",
    nationality: "Espanha",
    coloring: "Vermelho rubi brilhante intenso",
    indication: "Embutidos, carnes vermelhas na grelha, caça, queijo de cabra, pratos de arroz e assados ",
    award: "91 pts: James Suckling"
  }
}, {
  id: 27,
  name: "Privado Reserva Malbec",
  owner: "qualquer",
  price: 89.90,
  src: "/privado-reserva-malbec.png",
  description: {
    origin: "Mendoza Argentina",
    method: "12 meses barrica carvalho",
    grape: "100% Malbec",
    aromaticProfile: "Aroma delicado e intenso de frutos secos com um toque de baunilha e chocolate no final. Sabor redondo",
    nationality: "Argentina",
    coloring: "Vermelho Rubi com tons Bordô",
    indication: "Carnes grelhadas, assados, aves, massas e cogumelos",
    award: "Double Ouro Vinus"
  }
}, {
  id: 28,
  name: "Finca los Príncipes Trempanillo",
  owner: "qualquer",
  price: 89.90,
  src: "/finca-los-principes-trempanillo.png",
  description: {
    origin: "D.O. Ca. - La Rioja, Espanha",
    method: "",
    grape: "100% Trempanillo",
    aromaticProfile: "Intenso aroma de alcaçuz acompanhados de baunilha e café. Na boca resulta fresco com um final longo e aveludado",
    nationality: "Espanha",
    coloring: "Vermelho cereja brilhante",
    indication: "Aperitivos, carnes vermelhas e massas",
    award: "Silver Medal Councours Modial de Bruxelles 2019"
  }
}, {
  id: 29,
  name: "Burgo Viejo Crianza",
  owner: "",
  price: 89.90,
  src: "/burgo-viejo-crianza.png",
  description: {
    origin: "D.O.C.a - La Rioja, Espanha",
    method: "12 meses barrica carvalho",
    grape: "90% Trempanillo, 10% Graciano",
    aromaticProfile: "Um vinho de grande personalidade, finura e potência, destacando em seus aromas e a fruta negra com notas balsâmicas, sobre uma base de especiaria e fina madeira. Aveludado e complexo. Mais que um vinho, um excelente Rioja",
    nationality: "Espanha",
    coloring: "Vermelho púrpura intenso",
    indication: "Assados, carnes vermelhas, cordeiro, queijos e aperitivos",
    award: "92 pts: James Suckling"
  }
}, {
  id: 30,
  name: "Bondades Malbec",
  owner: "",
  price: 89.90,
  src: "/bondades-malbec.png",
  description: {
    origin: "Mendoza Argentina",
    method: "",
    grape: "100% Malbec",
    aromaticProfile: "Aroma agradável de frutos secos. Sabor redondo e uma acidez muito equilibrada, que junto a doçura da fruta torna o vinho uma escolha muito agradável e fácil de tomar",
    nationality: "Argentina",
    coloring: "Vermelho intenso escuro com lágrimas densas",
    indication: "Aperitivos e queijos curados, massas com molho de tomate e carnes na brasa",
    award: ""
  }
}, {
  id: 31,
  name: "Solar das Mouras",
  owner: "",
  price: 89.90,
  src: "/solar-das-mouras.png",
  description: {
    origin: "Alentejo, Portugal",
    method: "",
    grape: "Aragonez, Trincadeira Alicante Bouchet",
    aromaticProfile: "Aroma de frutos vermelhos maduros e especiarias. Volumoso no paladar com taninos equilibrados e um final prolongado",
    nationality: "Portugal",
    coloring: "Vermelho rubi intenso",
    indication: "Aperitivos, risotos, queijos curados, carnes vermelhas e brancas",
    award: ""
  }
}, {
  id: 32,
  name: "Solar das Mouras Reserva",
  owner: "",
  price: 89.90,
  src: "/solar-das-mouras-reserva.png",
  description: {
    origin: "Alentejo, Portugal",
    method: "4 meses barrica carvalho",
    grape: "Aragonez, Trincadeira, Syrah",
    aromaticProfile: "Elegante cor granada com aroma a especiarias e a frutos vermelhos maduros com toque de baunilha. No paladar resulta volumoso com taninos presentes mais equilibrados e um final de boca prolongado. Bom equilíbrio entre fruta-madeira" ,
    nationality: "Portugal",
    coloring: "Vermelho rubi intenso",
    indication: "Aperitivos, risotos, queijos curados, carnes apimentadas",
    award: ""
  }
}, {
  id: 33,
  name: "Qunqy Roble Malbec",
  owner: "",
  price: 89.90,
  src: "/qunqy-roble-malbec.png",
  description: {
    origin: "Mendoza, Argentina",
    method: "6 meses barrica carvalho",
    grape: "100% Malbec",
    aromaticProfile: "Em nariz um aroma e sabor frutado com leves notas de especiarias. Vinho redondo, com boa estrutura, taninos doces e maduros",
    nationality: "Argentina",
    coloring: "Vermelhos escuros intensos, com lágrimas densas",
    indication: "Aperitivos e queijos curados, massas, assados, cordeiro e carnes vermelhas",
    award: ""
  }
}, {
  id: 34,
  name: "Qunqy Roble Cabernet Sauvignon",
  owner: "",
  price: 89.90,
  src: "/qunqy-roble-cabernet-sauvignon.png",
  description: {
    origin: "Mendoza, Argentina",
    method: "6 meses barrica de carvalho",
    grape: "100% Cabernet Sauvignon",
    aromaticProfile: "Aroma e sabor de frutas vermelhas e especiarias com taninos marcantes. Final de boca longo e muito agradável",
    nationality: "Argentina",
    coloring: "Vermelhos escuros intensos, com lágrimas densas na taça",
    indication: "Aperitivos e queijos curados, lasagna, assados, cordeiro, e carne suína e vermelha",
    award: ""
  }
}, {
  id: 35,
  name: "Privado Reserva Cabernet Franc",
  owner: "",
  price: 89.90,
  src: "/privado-reserva-cabernet-franc.png",
  description: {
    origin: "Mendoza Argentina",
    method: "12 meses barrica de carvalho",
    grape: "100% Cabernet Franc",
    aromaticProfile: "Aroma de frutos vermelhos maduros, amoras e groselhas com notas de baunilha tostada, resultado do amadurecimento em barrica. Grande intensidade e sabor",
    nationality: "Argentina",
    coloring: "Vermelho intenso com reflexos violáceos",
    indication: "Assados embutidos, aperitivos e queijos",
    award: ""
  }
}, {
  id: 36,
  name: "Ladron de Lunas",
  owner: "",
  price: 89.90,
  src: "/ladron-de-lunas.png",
  description: {
    origin: "Utiel - Requena, Espanha",
    method: "5 meses barrica carvalho francês",
    grape: "100% Bobal (variedade autóctone)",
    aromaticProfile: "Aroma de frutas vermelhas, ameixa madura e baunilha, notas tostadas e alcaçuz. Na boca, frescor e acidez equilibrada, boa carnosidade e elegância. Final suave e persistente, integrando perfeitamente taninos e sua grande personalidade",
    nationality: "Espanha",
    coloring: "Vermelho intenso com reflexos violáceos. Límpido brilhante",
    indication: "Assados, carnes vermelhas, queijos, legumes e aperitivos",
    award: "Silver Medal International Wine Awards"
  }
}, {
  id: 37,
  name: "Jorge Rubio Gran Reserva Malbec",
  owner: "",
  price: 89.90,
  src: "/jorge-rubio-gran-reserva-malbec.png",
  description: {
    origin: "Mendoza, Argentina",
    method: "18 meses barrica de carvalho francês",
    grape: "100% Malbec",
    aromaticProfile: "Aroma de frutos negros maduros, aromas e groselhas com notas de baunilha tostada, resultado do amadurecimento em barrica. Um vinho de grande intensidade",
    nationality: "Argentina",
    coloring: "Vermelho com reflexos violeta",
    indication: "Carnes de caça, carnes vermelhas e queijos curados",
    award: "Double Ouro Vinus"
  }
}, {
  id: 38,
  name: "Marques de la Vega",
  owner: "",
  price: 89.90,
  src: "/marques-de-la-vega3.png",
  description: {
    origin: "D.O - La Mancha, Espanha",
    method: "12 meses barrica carvalho francês",
    grape: "100% Trempanillo",
    aromaticProfile: "Aroma de frutas vermelhas, especialmente amora e cereja. Muito saboroso no paladar, estruturado e ao mesmo tempo leve, com taninos bem agradáveis, oferendo um conjunto bem elegante e equilibrado",
    nationality: "Espanha",
    coloring: "Vermelho rubi intenso",
    indication: "Aperitivos, risotos, queijos curados, carnes vermelhas e brancas",
    award: ""
  }
}, {
  id: 39,
  name: "Finca Gabriel Roble Malbec",
  owner: "",
  price: 89.90,
  src: "/finca-gabriel-roble-malbec.png",
  description: {
    origin: "Mendoza, Argentina",
    method: "6 meses barrica de carvalho ",
    grape: "100% Malbec",
    aromaticProfile: "Aroma intenso a frutos secos. Acidez equilibrada e final de boca persistente, macio e harmonioso",
    nationality: "Argentina",
    coloring: "Vermelho escuro e tons violáceos",
    indication: "Aperitivos e queijos curados, massas e carnes vermelhas",
    award: "Vinus Silvester Award"
  }
}, {
  id: 40,
  name: "Finca Gabriel Roble Cabernet Sauvignon",
  owner: "",
  price: 89.90,
  src: "/finca-gabriel-roble-cabernet-sauvignon.png",
  description: {
    origin: "Mendoza, Argentina",
    method: "12 meses barrica carvalho francês",
    grape: "100% Cabernet Sauvignon",
    aromaticProfile: "Aroma delicado, intenso e muito complexo. Sabor agradável a frutos vermelhos, frutas negras, pimenta verde e especiarias",
    nationality: "Argentina",
    coloring: "Vermelho escuro",
    indication: "Aperitivos, queijos curados, cordeiro e carnes vermelhas",
    award: "Vinus Sivester Award"
  }
}, {
  id: 41,
  name: "Conde de Arraiolos",
  owner: "",
  price: 89.90,
  src: "/conde-de-arraiolos.png",
  description: {
    origin: "Alentejo, Portugal",
    method: "6 meses barrica de carvalho",
    grape: "Syrah, Cabernet Sauvignon e Alicant Bouchet",
    aromaticProfile: "Apresenta um aroma a frutos muito maduros, frutos pretos e algumas especiarias, bem integrados com a madeira onde estagiou. Cheio e complexo no paladar, com taninos macios e um final longo e muito elegante",
    nationality: "Espanha",
    coloring: "Granada intenso",
    indication: "Aperitivos, risotos, queijos curados, carnes vermelhas e brancas",
    award: ""
  }
}, {
  id: 42,
  name: "Burgo Viejo Garnacha",
  owner: "",
  price: 89.90,
  src: "/burgo-viejo-garnacha.png",
  description: {
    origin: "D.O.C.a - La Rioja, Espanha",
    method: "",
    grape: "100% Garnacha",
    aromaticProfile: "Elegante monovarietal elaborado com vinhos de mais de 60 anos. Aroma de frutos vermelhos e pretos (cereja e ameixa), combinado com frutos sutis de baunilha. Na boca oferece uma passagem fresca, aveludada e intensa",
    nationality: "Espanha",
    coloring: "Vermelho cereja brilhante",
    indication: "Aperitivos massas, assados e carnes vermelhas",
    award: "90 pts: James Suckling"
  }
}]

export default wines


