// Centralized products data with rich descriptions and galleries
export const products = [
  {
    id: 1,
    title: "PC Gaming Haute Performance",
    category: "PC Complet",
    price: "25,000 MAD",
    image: "https://www.progear.ma/6197-tm_product_lg/pc-gamer-hautes-performances-avec-i7-14700k-rtx-4070-ti-super-16gb-ssd-1tb.jpg",
    specs: ["RTX 4080", "Intel i7-13700K", "32GB DDR5", "1TB NVMe SSD"],
    badge: "Populaire",
    description:
      "Conçu pour les gamers exigeants, ce PC offre des performances de pointe en 1440p et 4K. Refroidissement optimisé, assemblage propre et silencieux, prêt à l'emploi avec Windows et pilotes à jour.",
    features: [
      "Refroidissement haut débit et silencieux",
      "Excellents résultats en jeux AAA et e-sports",
      "Châssis airflow avec verre trempé",
      "Garantie 2 ans atelier",
    ],
    gallery: [
      "https://m.media-amazon.com/images/I/61oqMZoMjpL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71z25PIpPfL.jpg",
    ],
  },
  {
    id: 2,
    title: "Carte Graphique RTX 4090",
    category: "Composants",
    price: "18,500 MAD",
    image: "https://atlasgaming.ma/wp-content/uploads/2024/03/Atlas-Gaming-Asus-ROG-RTX4090-OC-A-1200x1200.jpg",
    specs: ["24GB GDDR6X", "Ray Tracing", "DLSS 3.0", "4K Gaming"],
    badge: "Premium",
    description:
      "La référence absolue pour le jeu 4K et la création. Accélérez vos workflows en 3D/IA et profitez d'une fluidité incomparable dans tous les jeux modernes.",
    features: [
      "DLSS 3 pour des FPS boostés",
      "Ray Tracing de dernière génération",
      "Refroidissement tri-ventilateurs",
      "Support AV1 pour le streaming",
    ],
    gallery: [
      "https://m.media-amazon.com/images/I/71J5X7b0c9L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71Q4m9Dk7cL._AC_SL1500_.jpg",
    ],
  },
  {
    id: 3,
    title: "Setup Gaming Complet",
    category: "Accessoires",
    price: "8,500 MAD",
    image: "https://www.ultrapc.ma/44034-large_default/setup-gamer-ultrapc-r5-5500-rtx3060-xg2522f-180hz-hybrok-hpg200-pack-4in1-fighter-black.jpg",
    specs: ["Clavier Mécanique", "Souris Gaming", "Casque RGB", "Tapis XXL"],
    badge: "Pack",
    description:
      "Un pack complet pour transformer votre bureau en véritable battlestation. Des périphériques performants et un confort durable.",
    features: [
      "Clavier switches rouges réactifs",
      "Souris légère haute précision",
      "Casque 7.1 avec micro antibruit",
      "Tapis XXL anti-dérapant",
    ],
    gallery: [
      "https://m.media-amazon.com/images/I/61fQmS8qvXL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71w8z7C0J5L._AC_SL1500_.jpg",
    ],
  },
  // ... you can extend with the rest as needed
];

export const getProductById = (id) => products.find((p) => p.id === Number(id));
