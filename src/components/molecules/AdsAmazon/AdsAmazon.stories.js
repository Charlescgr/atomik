import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withNextRouter } from 'storybook-addon-next-router';

import AdsAmazon from './AdsAmazon';
import Slider from './Slider';
import TemplateList from './TemplateList';
import BoxGrid from './BoxGrid';
import BoxStandard from './BoxStandard';

export default {
  title: 'Components/Molecules/AdsAmazon',
  component: AdsAmazon,
  decorators: [withA11y, withNextRouter],
  parameters: {
    options: {
      selectedPanel: true,
      showPanel: true,
      showNav: true,
      isToolshown: true
    },
    notes: 'type the notes here.'
  }
};

export const Default = () => (
  <AdsAmazon
    exampleMode
    thumb="https://m.media-amazon.com/images/I/51nmWnm8drL.jpg?auto=webp&quality=45&width=1920&crop=16:9,smart,safe"
    url="https://www.amazon.es/dp/B08CXZMQ22?tag=entrenamiento-21&linkCode=ogi&th=1&psc=1"
    title="La mejor oferta para comprar Fb Sport 10.49″ que hemos encontrado"
    price="339,99"
    messages={{
      thumb: 'thumb del producto',
      buyOn: 'Comprar en Amazon',
      currency: 'EUR',
    }}
    classesPlugin="aawp-product--style-light aawp-product--css-adjust-image-large"
    className="mtb--big"
  >
    <ul>
      <li>🌊 Diseño de SUP Hinchable - 320 CM Longitud 78 CM Anchura 15...</li>
      <li>🌊 Construido Para la Exploración - Si le gusta el aguas...</li>
      <li>🌊 Mas Seguro - La cubierta superior suave antideslizante es...</li>
      <li>🌊 Experiencia Única - Se Tabla da SUP única para una...</li>
      <li>🌊 Tabla de SUP Accesorios - La tabla de paddle llega con...</li>
    </ul>
  </AdsAmazon>
);
export const WithBestseller = () => (
  <AdsAmazon
    exampleMode
    thumb="https://m.media-amazon.com/images/I/51nmWnm8drL.jpg?auto=webp&quality=45&width=1920&crop=16:9,smart,safe"
    url="https://www.amazon.es/dp/B08CXZMQ22?tag=entrenamiento-21&linkCode=ogi&th=1&psc=1"
    title="La mejor oferta para comprar Fb Sport 10.49″ que hemos encontrado"
    price="339,99"
    messages={{
      thumb: 'thumb del producto',
      buyOn: 'Comprar en Amazon',
      currency: 'EUR',
      sales: 'OFERTA',
      bestseller: 'SUPERVENTAS NO. 1'
    }}
    classesPlugin="aawp-product--ribbon aawp-product--sale aawp-product--css-adjust-image-large aawp-product--bestseller"
    className="mtb--big"
  >
    <ul>
      <li>🌊 Diseño de SUP Hinchable - 320 CM Longitud 78 CM Anchura 15...</li>
      <li>🌊 Construido Para la Exploración - Si le gusta el aguas...</li>
      <li>🌊 Mas Seguro - La cubierta superior suave antideslizante es...</li>
      <li>🌊 Experiencia Única - Se Tabla da SUP única para una...</li>
      <li>🌊 Tabla de SUP Accesorios - La tabla de paddle llega con...</li>
    </ul>
  </AdsAmazon>
);

export const BoxStandardAds = () => {
  const item = {
    link: 'https://www.amazon.es/dp/B001UAV8B4?tag=misanim-21&linkCode=ogi&th=1&psc=1',
    image: {
      src: 'https://m.media-amazon.com/images/I/41Td-TIhw6L._SL160_.jpg',
      alt: 'Cafetera Ilsa Napolitana de Aluminio y Plata'
    },
    rating: {
      ammount: 123
    },
    messages: {
      reviews: 'Reviews',
      buyAmazon: 'Comprar en Amazon'
    },
    title: 'Zuiver Cafetera Italiana, Plateado, 6 Tazas',
    listDetails: ['De aluminio', 'Para 6 tazas', 'Para el café de Napoles'],
    oldPrice: '35,54 €',
    discount: '12',
    price: '35,54 €',
    primeLink: 'https://www.amazon.es/amazonprime?tag=misanim-21'
  };

  return (
    <BoxStandard product={item} />
  );
};

export const AdsSlider = () => {
  const images = {
    slides: [
      {
        src: 'https://m.media-amazon.com/images/I/71gHNltp67L._AC_UX679_.jpg',
        alt: 'Roupas para bebês recém-nascidos, macacão de manga comprida com babados + calça listrada + faixa de cabeça'
      },
      {
        src: 'https://m.media-amazon.com/images/I/81TeQaQo20L._AC_UX679_.jpg',
        alt: 'Roupas para bebês recém-nascidos, de manga comprida com babados + calça listrada + faixa de cabeça'
      },
      {
        src: 'https://m.media-amazon.com/images/I/71Ay4o6ykIL._AC_UX679_.jpg',
        alt: 'Roupas para bebês recém-nascidos, de manga comprida com + calça listrada + faixa de cabeça'
      },
      {
        src: 'https://m.media-amazon.com/images/I/71Ay4o6ykIL._AC_UX679_.jpg',
        alt: 'Roupas para comprida com + calça listrada + faixa de cabeça'
      },
      {
        src: 'https://m.media-amazon.com/images/I/71Ay4o6ykIL._AC_UX679_.jpg',
        alt: 'Roupas para bebês recém-nascidos, de manga comprida com + calça listrada + faixa de cabeça'
      },
      {
        src: 'https://m.media-amazon.com/images/I/71gHNltp67L._AC_UX679_.jpg',
        alt: 'Roupas para bebês recém-nascidos, macacão de manga comprida com babados + calça listrada + faixa de cabeça'
      }
    ],
    details: {
      link: 'https://www.amazon.com/-/pt/dp/B01MSM0SU4/?_encoding=UTF8&pd_rd_w=4A6c1&pf_rd_p=6f8f01b9-e98c-4b0d-91cf-a93790267134&pf_rd_r=NQF15YYW12CCJNMB2T4D&pd_rd_r=1aba8ceb-e857-4ef1-9d66-f8a4926bc7b5&pd_rd_wg=Nj5ZB&ref_=pd_gw_ci_mcx_mr_hp_atf_m',
      listDetails: ['De aluminio', 'Para 6 tazas', 'Para el café de Napoles'],
      title: 'Bluelover Vietnamita-Style De Acero Inoxidable Cafetera Goteo Filtro Cafetera Infusión Café Goteo Recipiente'
    },
    messages: {
      seePrice: 'Ver Precio'
    }
  };
  return (
    <Slider product={images} />
  );
};

export const TemplateListAds = () => {
  const items = [
    {
      description: 'Ufesa Cafetera expreso Duetto Creme CE7141, 500 W, 1 Cups, Acero Inoxidable, Gris',
      link: 'https://www.amazon.es/dp/B0055ZGJCS?tag=misanim-21&linkCode=ogi&th=1&psc=1',
      image: {
        alt: 'Ufesa Cafetera expreso Duetto Creme CE7141, 500 W, 1 Cups, Acero Inoxidable, Gris',
        src: 'https://m.media-amazon.com/images/I/51psgU8HpAL._SL160_.jpg'
      },
      subtitle: 'Doble opción de preparación de café: sistema de café molido y sistema de monodosis; Vaporizador orientable con función Turbo para cappuccino',
    },
    {
      description: "De'longhi Dedica - Cafetera de Bomba de Acero Inoxidable para Café Molido o Monodosis, Cafetera para Espresso y Cappuccino, Depósito de 1.3 Litros, Sistema Anti-goteo, EC685.M, Metal 30x33x15cm",
      discount: 26,
      link: 'https://www.amazon.es/dp/B06WGTZ874?tag=misanim-21&linkCode=osi&th=1&psc=1',
      image: {
        alt: "De'longhi Dedica - Cafetera de Bomba de Acero Inoxidable para Café Molido o Monodosis, Cafetera para Espresso y Cappuccino,...",
        src: 'https://m.media-amazon.com/images/I/41J7jGAuhSL._SL160_.jpg'
      },
      subtitle: 'Diseño: cafetera estrecha (sólo 15 cm de ancho); Dimensiones del producto: 33 x 14.9 x 30.3 cm',
      primeLink: 'https://www.amazon.es/amazonprime?tag=misanim-21',
      price: '229,90 €'
    },
    {
      description: 'Solac CE4480 Espresso-Cafetera de 19 Bares con vaporizador, 850 W, 1.25 litros, 0 Decibeles, Acero Inoxidable',
      link: 'https://www.amazon.es/dp/B01M9BF86K?tag=misanim-21&linkCode=osi&th=1&psc=1',
      image: {
        alt: 'Solac CE4480 Espresso-Cafetera de 19 Bares con vaporizador, 850 W, 1.25 litros, 0 Decibeles, Acero Inoxidable',
        src: 'https://m.media-amazon.com/images/I/41WNlqSlZiL._SL160_.jpg'
      },
      primeLink: 'https://www.amazon.es/amazonprime?tag=misanim-21',
    }
  ];
  return (
    <TemplateList listItems={items} />
  );
};

export const BoxGridAds = () => {
  const items = [
    {
      discount: 6,
      image: {
        src: 'https://m.media-amazon.com/images/I/41Hr37iIEWL._SL160_.jpg',
        alt: 'Krups Nespresso Inissia XN1001 - Cafetera monodosis de cápsulas Nespresso, 19 bares, apagado automático, color blanco, 14...'
      },
      link: 'https://www.amazon.es/dp/B00G98EJHM?tag=misanim-21&linkCode=osi&th=1&psc=1',
      description: 'Krups Nespresso Inissia XN1001 - Cafetera monodosis de cápsulas Nespresso, 19 bares, apagado automático, color blanco, 14 cápsulas interior',
      rating: {
        ammount: 1280
      },
      primeLink: 'https://www.amazon.es/amazonprime?tag=misanim-21',
      oldPrice: '109,99 €'
    },
    {
      discount: 37,
      image: {
        src: 'https://m.media-amazon.com/images/I/41KgZJOWgFL._SL160_.jpg',
        alt: "Nescafé Dolce Gusto De'Longhi EDG240.R Cafetera De Cápsulas, 1470 W, 1.2 litros, plástico, Rojo"
      },
      link: 'https://www.amazon.es/dp/B07G4P24SP?tag=misanim-21&linkCode=ogi&th=1&psc=1',
      description: "Nescafé Dolce Gusto De'Longhi EDG240.R Cafetera De Cápsulas, 1470 W, 1.2 litros, plástico, Rojo",
      oldPrice: '89,00 €'
    },
    {
      image: {
        src: 'https://m.media-amazon.com/images/I/41KqS+oX3OL._SL160_.jpg',
        alt: "De'Longhi Nespresso Lattissima One EN500W-Cafetera monodosis de cápsulas Nespresso con depósito de leche compacto, 19..."
      },
      link: 'https://www.amazon.es/dp/B074ZFF31Y?tag=misanim-21&linkCode=ogi&th=1&psc=1',
      description: "De'Longhi Nespresso Lattissima One EN500W-Cafetera monodosis de cápsulas Nespresso con depósito de leche compacto, 19 bares, apagado automático color blanco, Incluye pack de bienvenida con 14 cápsulas",
    },
    {
      discount: 6,
      image: {
        src: 'https://m.media-amazon.com/images/I/41Hr37iIEWL._SL160_.jpg',
        alt: 'Krups Nespresso Inissia XN1001 - Cafetera monodosis de cápsulas Nespresso, 19 bares, apagado automático, color blanco, 14...'
      },
      link: 'https://www.amazon.es/dp/B00G98EJHM?tag=misanim-21&linkCode=osi&th=1&psc=1',
      description: 'Krups Nespresso Inissia XN1001 - Cafetera monodosis de cápsulas Nespresso, 19 bares, apagado automático, color blanco, 14 cápsulas interior',
      rating: {
        ammount: 1280
      },
      primeLink: 'https://www.amazon.es/amazonprime?tag=misanim-21',
      oldPrice: '109,99 €'
    },
    {
      image: {
        src: 'https://m.media-amazon.com/images/I/41KqS+oX3OL._SL160_.jpg',
        alt: "De'Longhi Nespresso Lattissima One EN500W-Cafetera monodosis de cápsulas Nespresso con depósito de leche compacto, 19..."
      },
      link: 'https://www.amazon.es/dp/B074ZFF31Y?tag=misanim-21&linkCode=ogi&th=1&psc=1',
      description: "De'Longhi Nespresso Lattissima One EN500W-Cafetera monodosis de cápsulas Nespresso con depósito de leche compacto, 19 bares, apagado automático color blanco, Incluye pack de bienvenida con 14 cápsulas",
    },
    {
      discount: 37,
      image: {
        src: 'https://m.media-amazon.com/images/I/41KgZJOWgFL._SL160_.jpg',
        alt: "Nescafé Dolce Gusto De'Longhi EDG240.R Cafetera De Cápsulas, 1470 W, 1.2 litros, plástico, Rojo"
      },
      link: 'https://www.amazon.es/dp/B07G4P24SP?tag=misanim-21&linkCode=ogi&th=1&psc=1',
      description: "Nescafé Dolce Gusto De'Longhi EDG240.R Cafetera De Cápsulas, 1470 W, 1.2 litros, plástico, Rojo",
      oldPrice: '89,00 €'
    },
  ];
  return (
    <BoxGrid productList={items} messages={{ seePrice: 'Ver Precio' }} />
  );
};
