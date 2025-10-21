const productos = [
  {
    id: "campus-black",
    categoria: "zapatillas",
    href: "/product?id=campus-black",
    imgSrc: "/assets/img/campus-00s-r-1.png",
    altText: "Campus 00s Black",
    titulo: "Campus 00s Black",
    descripcion: "Zapatilla Campus 00s de gamuza color negro con detalles blancos.",
    precio: 109990,
    tallas: [
      { us: "5.5", uk: "4.5", eu: "38", cm: "23.5" },
      { us: "6", uk: "5", eu: "38.5", cm: "24" },
      { us: "6.5", uk: "5.5", eu: "39", cm: "24.5" },
      { us: "7", uk: "6", eu: "40", cm: "25" },
      { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.5" }
    ]
  },
  {
    id: "campus-white",
    categoria: "zapatillas",
    href: "/product?id=campus-white",
    imgSrc: "/assets/img/Campu-00s-r-2.png",
    altText: "Campus 00s White",
    titulo: "Campus 00s White",
    descripcion: "Zapatilla Campus 00s de gamuza color blanco con detalles negros.",
    precio: 89990,
    tallas: [
      { us: "5.5", uk: "4.5", eu: "38", cm: "23.5" },
      { us: "6", uk: "5", eu: "38.5", cm: "24" },
      { us: "6.5", uk: "5.5", eu: "39", cm: "24.5" },
      { us: "7", uk: "6", eu: "40", cm: "25" },
      { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.5" }
    ]
  },
  {
    id: "campus-pink",
    categoria: "zapatillas",
    href: "/product?id=campus-pink",
    imgSrc: "/assets/img/Campus-00s-r-3.png",
    altText: "Campus 00s Pink",
    titulo: "Campus 00s Pink",
    descripcion: "Zapatilla Campus 00s de gamuza color rosado con detalles blancos.",
    precio: 99990,
    tallas: [
      { us: "5.5", uk: "4.5", eu: "38", cm: "23.5" },
      { us: "6", uk: "5", eu: "38.5", cm: "24" },
      { us: "6.5", uk: "5.5", eu: "39", cm: "24.5" },
      { us: "7", uk: "6", eu: "40", cm: "25" },
      { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.5" }
    ]
  },
  {
    id: "tn-negra",
    categoria: "zapatillas",
    href: "/product?id=tn-negra",
    imgSrc: "/assets/img/tn-negra.jpg",
    altText: "Nike TN negra",
    titulo: "Nike TN Air Max Plus",
    descripcion: "Zapatilla de hombre original en color negro.",
    precio: 185990,
    tallas: [
      { us: "5.5", uk: "4.5", eu: "38", cm: "23.5" },
      { us: "6", uk: "5", eu: "38.5", cm: "24" },
      { us: "6.5", uk: "5.5", eu: "39", cm: "24.5" },
      { us: "7", uk: "6", eu: "40", cm: "25" },
      { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.5" }
    ]
  },
  {
    id: "tn-blanca",
    categoria: "zapatillas",
    href: "/product?id=tn-blanca",
    imgSrc: "/assets/img/tn_blanca.jpg",
    altText: "Nike TN blanca",
    titulo: "Nike TN Air Max Plus",
    descripcion: "Zapatilla de hombre original en color blanco.",
    precio: 185990,
    tallas: [
      { us: "5.5", uk: "4.5", eu: "38", cm: "23.5" },
      { us: "6", uk: "5", eu: "38.5", cm: "24" },
      { us: "6.5", uk: "5.5", eu: "39", cm: "24.5" },
      { us: "7", uk: "6", eu: "40", cm: "25" },
      { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.5" }
    ]
  },
  {
    id: "tn-azul",
    categoria: "zapatillas",
    href: "/product?id=tn-azul",
    imgSrc: "/assets/img/tn-azuljpg.jpg",
    altText: "Nike TN azul",
    titulo: "Nike TN Air Max Plus",
    descripcion: "Zapatilla de hombre original en color azul.",
    precio: 185990,
    tallas: [
      { us: "5.5", uk: "4.5", eu: "38", cm: "23.5" },
      { us: "6", uk: "5", eu: "38.5", cm: "24" },
      { us: "6.5", uk: "5.5", eu: "39", cm: "24.5" },
      { us: "7", uk: "6", eu: "40", cm: "25" },
      { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.5" }
    ]
  },
  {
    id: "lafrance-negra",
    categoria: "zapatillas",
    href: "/product?id=lafrance-negra",
    imgSrc: "/assets/img/leFrance-negras.png",
    altText: "Puma LaFrance negra",
    titulo: "LaFrance PUMA",
    descripcion: "Zapatilla de hombre original color negro.",
    precio: 110990,
    tallas: [
      { us: "5.5", uk: "4.5", eu: "38", cm: "23.5" },
      { us: "6", uk: "5", eu: "38.5", cm: "24" },
      { us: "6.5", uk: "5.5", eu: "39", cm: "24.5" },
      { us: "7", uk: "6", eu: "40", cm: "25" },
      { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.5" }
    ]
  },
  {
    id: "lafrance-roja",
    categoria: "zapatillas",
    href: "/product?id=lafrance-roja",
    imgSrc: "/assets/img/LefranceR.png",
    altText: "Puma LaFrance roja",
    titulo: "LaFrance PUMA",
    descripcion: "Zapatilla de hombre original color rojo.",
    precio: 110990,
    tallas: [
      { us: "5.5", uk: "4.5", eu: "38", cm: "23.5" },
      { us: "6", uk: "5", eu: "38.5", cm: "24" },
      { us: "6.5", uk: "5.5", eu: "39", cm: "24.5" },
      { us: "7", uk: "6", eu: "40", cm: "25" },
      { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.5" }
    ]
  },
  {
    id: "lafrance-plateada",
    categoria: "zapatillas",
    href: "/product?id=lafrance-plateada",
    imgSrc: "/assets/img/leFrance-plateada.png",
    altText: "Puma LaFrance plateada",
    titulo: "LaFrance PUMA",
    descripcion: "Zapatilla de hombre original color plateado.",
    precio: 110990,
    tallas: [
      { us: "5.5", uk: "4.5", eu: "38", cm: "23.5" },
      { us: "6", uk: "5", eu: "38.5", cm: "24" },
      { us: "6.5", uk: "5.5", eu: "39", cm: "24.5" },
      { us: "7", uk: "6", eu: "40", cm: "25" },
      { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.5" }
    ]
  },
  {
    id: "adidas-mercedes",
    categoria: "ropa",
    href: "/product?id=adidas-mercedes",
    imgSrc: "/assets/img/MERCE.PNG",
    altText: "Adidas F1 Mercedes",
    titulo: "Adidas F1 Mercedes",
    descripcion: "Polerón F1 Mercedes color negro.",
    precio: 99990,
    tallas: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "liverpool",
    categoria: "ropa",
    href: "/product?id=liverpool",
    imgSrc: "/assets/img/liver.png",
    altText: "Polerón Liverpool",
    titulo: "Polerón Liverpool",
    descripcion: "Polerón rojo del equipo Liverpool FC.",
    precio: 89990,
    tallas: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "poleron-adidas",
    categoria: "ropa",
    href: "/product?id=poleron-adidas",
    imgSrc: "/assets/img/POLERON-N.PNG",
    altText: "Polerón Adidas negro",
    titulo: "Polerón Adidas",
    descripcion: "Polerón negro Adidas.",
    precio: 59990,
    tallas: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "bolso-nike",
    categoria: "accesorios",
    href: "/product?id=bolso-nike",
    imgSrc: "/assets/img/accesorio-2.jpg",
    altText: "Bolso Nike Gym Duffel",
    titulo: "Bolso Nike Gym Duffel",
    descripcion: "Bolso deportivo Nike ideal para gimnasio o viajes, con amplio compartimento principal y correas ajustables.",
    precio: 49990,
    tallas: ["Única"]
  },
  {
    id: "gorra-nike",
    categoria: "accesorios",
    href: "/product?id=gorra-nike",
    imgSrc: "/assets/img/accesorio-3.webp",
    altText: "Gorra Nike Performance",
    titulo: "Gorra Nike Performance",
    descripcion: "Gorra Nike con diseño ergonómico y material Dri-FIT que ofrece comodidad y transpirabilidad durante todo el día.",
    precio: 24990,
    tallas: ["Única"]
  },
  {
    id: "calcetas-nike",
    categoria: "accesorios",
    href: "/product?id=calcetas-nike",
    imgSrc: "/assets/img/accesorio-1.webp",
    altText: "Calcetas Nike Sportswear",
    titulo: "Calcetas Nike Sportswear",
    descripcion: "Pack de 3 pares de calcetas Nike de algodón premium con logo bordado y ajuste elástico para mayor confort.",
    precio: 14990,
    tallas: ["S", "M", "L"]
  }
];

export default productos;
