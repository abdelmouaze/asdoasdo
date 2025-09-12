 import { useEffect, useMemo, useRef, useState } from "react";
 import { Link, useLocation, useNavigate } from "react-router-dom";
 import "./Products.css";

 const Products = () => {
  // Simple featured list for the carousel (reuse some of the products below)
  const featured = [
    {
      id: "f1",
      title: "Offres PC Gaming",
      subtitle: "Des configs prêtes pour la victoire",
      image:"PC Gaming Haute Performance.jpg",
      cta: "Découvrir",
    },
    {
      id: "f2",
      title: "Cartes Graphiques RTX",
      subtitle: "Des performances extrêmes en 4K",
      image:"Carte Graphique RTX 4090.jpg",
      cta: "Voir maintenant",
    },
    {
      id: "f3",
      title: "Setup Gaming Complet",
      subtitle: "Style et précision pour votre setup",
      image:"Setup Gaming Complet.jpg",
      cta: "Équiper",
    },
    {
      id: "f4",
      title: "Clavier Mécanique RGB",
      subtitle: "Des performances extrêmes en 4K",
      image:"Clavier Mécanique RGB.jpg",
      cta: "Voir maintenant",
    },  
    {
      id: "f5",
      title: "Souris Gaming Ultra Légère",
      subtitle: "Des performances extrêmes en 4K",
      image:"Souris Gaming Ultra Légère.jpg",
      cta: "Voir maintenant",
    },      
    {
      id: "f6",
      title: "Casque Gaming Surround",
      subtitle: "Des performances extrêmes en 4K",
      image:"Casque Gaming Surround.jpg",
      cta: "Voir maintenant",
    },
  ];


  // Carousel logic
  const [index, setIndex] = useState(0);
  const viewportRef = useRef(null);
  const intervalRef = useRef(null);

  const goTo = (i) => {
    const newIndex = (i + featured.length) % featured.length;
    setIndex(newIndex);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    // autoplay
    intervalRef.current = setInterval(() => {
      next();
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [index]);

  const products = [
     {
    id: 1,
    title: "PC Gaming Haute Performance",
    category: "PC Complet",
    price: "25,000 MAD",
    image: "PC Gaming Haute Performance.jpg",
    specs: ["RTX 4080", "Intel i7-13700K", "32GB DDR5", "1TB NVMe SSD"],
    badge: "Populaire"
  },
  {
    id: 2,
    title: "Carte Graphique RTX 4090",
    category: "Composants",
    price: "18,500 MAD",
    image: "Carte Graphique RTX 4090.jpg",
    specs: ["24GB GDDR6X", "Ray Tracing", "DLSS 3.0", "4K Gaming"],
    badge: "Premium"
  },
  {
    id: 3,
    title: "Setup Gaming Complet",
    category: "Accessoires",
    price: "8,500 MAD",
    image: "Setup Gaming Complet.jpg",
    specs: ["Clavier Mécanique", "Souris Gaming", "Casque RGB", "Tapis XXL"],
    badge: "Pack"
  },
  {
    id: 4,
    title: "Clavier Mécanique RGB",
    category: "Périphériques",
    price: "1,200 MAD",
    image: "Clavier Mécanique RGB.jpg",
    specs: ["Switch Red", "Anti-ghosting", "RGB Personnalisable", "USB-C"],
    badge: "Nouveau"
  },
  {
    id: 5,
    title: "Souris Gaming Ultra Légère",
    category: "Périphériques",
    price: "850 MAD",
    image: "Souris Gaming Ultra Légère.jpg",
    specs: ["DPI 26,000", "Capteur Optique", "Sans Fil", "RGB"],
    badge: "Pro"
  },
  {
    id: 6,
    title: "Casque Gaming Surround",
    category: "Audio",
    price: "1,600 MAD",
    image: "Casque Gaming Surround.jpg",
    specs: ["7.1 Surround", "Micro Anti-Bruit", "Coussinets Confort", "RGB"],
    badge: "Best Seller"
  },
  {
    id: 7,
    title: "Écran Gaming 27'' 165Hz",
    category: "Moniteurs",
    price: "3,800 MAD",
    image: "Écran Gaming 27'' 165Hz.jpg",
    specs: ["QHD 1440p", "165Hz", "1ms", "HDR"],
    badge: "Performance"
  },
  {
    id: 8,
    title: "Fauteuil Gaming Confort",
    category: "Mobilier",
    price: "2,500 MAD",
    image: "Fauteuil Gaming Confort.jpg",
    specs: ["Ergonomique", "Cuir PU", "Accoudoirs 4D", "Inclinaison 180°"],
    badge: "Confort"
  },
  {
    id: 9,
    title: "Microphone USB Streaming",
    category: "Audio",
    price: "1,400 MAD",
    image: "Microphone USB Streaming.jpg",
    specs: ["Plug & Play", "Cardioïde", "Anti-pop", "Qualité Studio"],
    badge: "Streaming"
  },
  {
    id: 10,
    title: "SSD NVMe 2TB",
    category: "Stockage",
    price: "2,500 MAD",
    image: "SSD NVMe 2TB.jpg",
    specs: ["7000MB/s Lecture", "6000MB/s Écriture", "PCIe 4.0", "Fiabilité 5 ans"],
    badge: "Rapide"
  },
  {
    id: 11,
    title: "Alimentation 850W Gold",
    category: "Composants",
    price: "2,500 MAD",
    image: "Alimentation 850W Gold.jpg",
    specs: ["Certification 80+ Gold", "Modulaire", "Silencieuse", "10 ans Garantie"],
    badge: "Fiable"
  },
  {
    id: 12,
    title: "Carte Mère Z790",
    category: "Composants",
    price: "3,200 MAD",
    image: "Carte Mère Z790.jpg",
    specs: ["DDR5", "PCIe 5.0", "Wi-Fi 6E", "RGB"],
    badge: "Premium"
  },
  {
    id: 13,
    title: "Webcam Full HD 60FPS",
    category: "Accessoires",
    price: "900 MAD",
    image: "Webcam Full HD 60FPS.jpg",
    specs: ["1080p 60fps", "Auto Focus", "Micro Stéréo", "Plug & Play"],
    badge: "Streaming"
  },
  {
    id: 14,
    title: "Manette Sans Fil Xbox",
    category: "Accessoires",
    price: "1000 MAD",
    image: "Manette Sans Fil Xbox.jpg",
    specs: ["Bluetooth", "Vibrations", "Batterie Rechargeable", "Compatible PC"],
    badge: "Gaming"
  },
  {
    id: 15,
    title: "Routeur Wi-Fi 6 Gaming",
    category: "Réseau",
    price: "3,500 MAD",
    image: "Routeur Wi-Fi 6 Gaming.jpg",
    specs: ["Wi-Fi 6", "Low Latency", "Quad Band", "Optimisé Gaming"],
    badge: "Ultra Rapide"
  },
  {
    id: 16,
    title: "Boîtier PC RGB",
    category: "Composants",
    price: "2,900 MAD",
    image: "Boîtier PC RGB.jpg",
    specs: ["ATX", "Panneau Verre Trempé", "ARGB Ventilateurs", "Gestion Câbles"],
    badge: "Stylé"
  },
  {
    id: 17,
    title: "RAM DDR5 32GB",
    category: "Composants",
    price: "1,900 MAD",
    image: "RAM DDR5 32GB.jpg",
    specs: ["32GB (2x16)", "6000MHz", "CL36", "RGB"],
    badge: "Rapidité"
  },
  {
    id: 18,
    title: "Disque Dur Externe 4TB",
    category: "Stockage",
    price: "1,200 MAD",
    image: "Disque Dur Externe 4TB.jpg",
    specs: ["USB 3.2", "4 To", "Compact", "Fiable"],
    badge: "Stockage"
  },
  {
    id: 19,
    title: "Ventirad RGB Haute Performance",
    category: "Refroidissement",
    price: "750 MAD",
    image: "Ventirad RGB Haute Performance.jpg",
    specs: ["6 Heatpipes", "ARGB", "Silencieux", "Compatibilité Universelle"],
    badge: "Cool"
  },
  {
    id: 20,
    title: "Watercooling 360mm AIO",
    category: "Refroidissement",
    price: "3,100 MAD",
    image: "  Watercooling 360mm AIO.jpg",
    specs: ["Radiateur 360mm", "Pompe Haute Pression", "ARGB", "Support Intel & AMD"],
    badge: "Extreme"
  },
  {
    id: 21,
    title: "Carte Graphique RTX 4070 Super",
    category: "Composants",
    price: "8,900 MAD",
    image: "Carte Graphique RTX 4070 Super.jpg",
    specs: ["12GB GDDR6X", "DLSS 3", "Ray Tracing", "1440p Ultra"],
    badge: "Nouveau"
  },
  {
    id: 22,
    title: "Processeur AMD Ryzen 7 7800X3D",
    category: "Composants",
    price: "4,900 MAD",
    image: "Processeur AMD Ryzen 7 7800X3D.jpg",
    specs: ["8 Cœurs", "16 Threads", "AM5", "3D V-Cache"],
    badge: "Gaming"
  },
  {
    id: 23,
    title: "Processeur Intel Core i7-14700K",
    category: "Composants",
    price: "5,400 MAD",
    image: "Processeur Intel Core i7-14700K.jpg",
    specs: ["20 Cœurs", "28 Threads", "LGA1700", "5.6 GHz Turbo"],
    badge: "Performance"
  },
  {
    id: 24,
    title: "Écran Gaming 32'' 4K 144Hz",
    category: "Moniteurs",
    price: "7,900 MAD",
    image: "Écran Gaming 32'' 4K 144Hz.jpg",
    specs: ["3840x2160", "144Hz", "1ms", "HDR600"],
    badge: "4K"
  },
  {
    id: 25,
    title: "Écran 24'' 165Hz eSports",
    category: "Moniteurs",
    price: "2,300 MAD",
    image: "Écran 24'' 165Hz eSports.jpg",
    specs: ["1080p", "165Hz", "1ms", "G-SYNC"],
    badge: "eSports"
  },
  {
    id: 26,
    title: "Clavier Mécanique 75%",
    category: "Périphériques",
    price: "890 MAD",
    image: "Clavier Mécanique 75.jpg",
    specs: ["Hot-swap", "Switch Red", "RGB", "USB-C"],
    badge: "Compact"
  },
  {
    id: 27,
    title: "Souris Sans Fil 65g",
    category: "Périphériques",
    price: "690 MAD",
    image: "Souris Sans Fil 65g.jpg",
    specs: ["26K DPI", "Capteur Optique", "PTFE Skates", "USB-C"],
    badge: "Légère"
  },
  {
    id: 28,
    title: "Casque Micro Broadcast",
    category: "Audio",
    price: "1,950 MAD",
    image: "Casque Micro Broadcast.jpg",
    specs: ["USB/XLR", "Anti-pop", "Monitoring", "Studio"],
    badge: "Studio"
  },
  {
    id: 29,
    title: "Barre de Son Gaming RGB",
    category: "Audio",
    price: "780 MAD",
    image: "Barre de Son Gaming RGB.jpg",
    specs: ["Bluetooth", "Subwoofers", "EQ", "USB"],
    badge: "RGB"
  },
  {
    id: 30,
    title: "Micro-Casque 7.1 Sans Fil",
    category: "Audio",
    price: "1,350 MAD",
    image: "Micro-Casque 7.1 Sans Fil.jpg",
    specs: ["7.1", "2.4GHz", "ANC", "RGB"],
    badge: "Sans Fil"
  },
  {
    id: 31,
    title: "Boîtier ITX Verre Trempé",
    category: "Composants",
    price: "1,450 MAD",
    image: "Boîtier ITX Verre Trempé.jpg",
    specs: ["Mini-ITX", "ARGB", "Flux d'air", "USB-C Front"],
    badge: "Compact"
  },
  {
    id: 32,
    title: "Carte Mère B650 Wi-Fi",
    category: "Composants",
    price: "2,200 MAD",
    image: "Carte Mère B650 Wi-Fi.jpg",
    specs: ["AM5", "DDR5", "PCIe 4.0", "Wi-Fi 6E"],
    badge: "Équilibré"
  },
  {
    id: 33,
    title: "Carte Mère Z690 DDR5",
    category: "Composants",
    price: "2,650 MAD",
    image: "Carte Mère Z690 DDR5.jpg",
    specs: ["LGA1700", "DDR5", "PCIe 5.0", "M.2 Shield"],
    badge: "Premium"
  },
  {
    id: 34,
    title: "Kit Ventilateurs ARGB",
    category: "Refroidissement",
    price: "520 MAD",
    image: "Kit Ventilateurs ARGB.jpg",
    specs: ["120mm", "ARGB", "PWM", "Silencieux"],
    badge: "Cool"
  },
  {
    id: 35,
    title: "Alimentation 1000W Platinum",
    category: "Composants",
    price: "3,400 MAD",
    image: "Alimentation 1000W Platinum.jpg",
    specs: ["80+ Platinum", "Full Modulaire", "Silencieuse", "10 ans"],
    badge: "Haute Gamme"
  },
  {
    id: 36,
    title: "SSD NVMe 1TB Gen4",
    category: "Stockage",
    price: "1,190 MAD",
    image: "SSD NVMe 1TB Gen4.jpg",
    specs: ["7000/6000 MB/s", "DRAM Cache", "Heatsink", "5 ans"],
    badge: "Rapide"
  },
  {
    id: 37,
    title: "HDD 8TB 3.5''",
    category: "Stockage",
    price: "1,450 MAD",
    image: "HDD 8TB 3.5.jpg",
    specs: ["7200 RPM", "256MB Cache", "SATA", "Fiable"],
    badge: "Capacité"
  },
  {
    id: 38,
    title: "Fauteuil Gaming Pro",
    category: "Mobilier",
    price: "3,200 MAD",
    image: "Fauteuil Gaming Pro.jpg",
    specs: ["Accoudoirs 4D", "Dossier 165°", "Cuir PU", "Oreiller Mémoire"],
    badge: "Confort"
  },
  {
    id: 39,
    title: "Bureau Gaming LED 140cm",
    category: "Mobilier",
    price: "1,990 MAD",
    image: "Bureau Gaming LED 140cm.jpg",
    specs: ["140x60cm", "LED RGB", "Gestion Câbles", "Tapis"],
    badge: "Setup"
  },
  {
    id: 40,
    title: "Routeur Wi-Fi 7 Tri-Band",
    category: "Réseau",
    price: "4,500 MAD",
    image: "Routeur Wi-Fi 7 Tri-Band.jpg",
    specs: ["Wi-Fi 7", "Tribande", "2.5G WAN", "Optimisé Jeux"],
    badge: "Ultra Rapide"
  },
  {
    id: 41,
    title: "Webcam 4K Streaming",
    category: "Accessoires",
    price: "1,650 MAD",
    image: "Webcam 4K Streaming.jpg",
    specs: ["4K", "AutoFocus", "HDR", "Stabilisation"],
    badge: "Pro"
  },
  {
    id: 42,
    title: "Kit Streaming Starter",
    category: "Accessoires",
    price: "2,200 MAD",
    image: "Kit Streaming Starter.jpg",
    specs: ["Ring Light", "Trépied", "Micro USB", "Support Téléphone"],
    badge: "Bundle"
  },
  {
    id: 43,
    title: "PC Gaming RTX 4070",
    category: "PC Complet",
    price: "17,900 MAD",
    image: "PC Gaming RTX 4070.jpg",
    specs: ["RTX 4070", "Ryzen 7", "32GB DDR5", "1TB NVMe"],
    badge: "Gaming"
  },
  {
    id: 44,
    title: "PC Création 4K",
    category: "PC Complet",
    price: "22,500 MAD",
    image: "PC Création 4K.jpg",
    specs: ["RTX 4080", "Intel i9", "64GB DDR5", "2TB NVMe"],
    badge: "Studio"
  },
  {
    id: 45,
    title: "Écran Gamer 27'' QHD 165Hz",
    category: "Moniteurs",
    price: "3,200 MAD",
    image: "Écran Gamer 27'' QHD 165Hz.jpg",
    specs: ["2560x1440", "165Hz", "1ms", "HDR"],
    badge: "eSports"
  },
  {
    id: 46,
    title: "Écran 34'' UltraWide 144Hz",
    category: "Moniteurs",
    price: "5,900 MAD",
    image: "Écran 34'' UltraWide 144Hz.jpg",
    specs: ["UWQHD", "144Hz", "1ms", "HDR600"],
    badge: "Immersion"
  },
  {
    id: 47,
    title: "Clavier Mécanique Low‑Profile",
    category: "Périphériques",
    price: "1,090 MAD",
    image: "Clavier Mécanique Low‑Profile.jpg",
    specs: ["Low‑profile", "RGB", "Hot‑swap", "USB‑C"],
    badge: "Nouveau"
  },
  {
    id: 48,
    title: "Souris Gaming 26K DPI",
    category: "Périphériques",
    price: "690 MAD",
    image: "Souris Gaming 26K DPI.jpg",
    specs: ["26K DPI", "Sans fil", "75g", "RGB"],
    badge: "Légère"
  },
  {
    id: 49,
    title: "Casque Hi‑Res Monitoring",
    category: "Audio",
    price: "1,790 MAD",
    image: "Casque Hi‑Res Monitoring.jpg",
    specs: ["Hi‑Res", "Fermé", "Câble détachable", "Confort"],
    badge: "Studio"
  },
  {
    id: 50,
    title: "Micro XLR Broadcast",
    category: "Audio",
    price: "2,100 MAD",
    image: "Micro XLR Broadcast.jpg",
    specs: ["XLR", "Cardioïde", "Anti‑pop", "Bras articulé"],
    badge: "Pro"
  },
  {
    id: 51,
    title: "Webcam 1080p 60fps V2",
    category: "Accessoires",
    price: "990 MAD",
    image: "Webcam 1080p 60fps V2.jpg",
    specs: ["1080p", "60fps", "AF", "Stéréo"],
    badge: "Clair"
  },
  {
    id: 52,
    title: "Carte Graphique RTX 4070 Super OC",
    category: "Composants",
    price: "9,450 MAD",
    image: "Carte Graphique RTX 4070 Super OC.jpg",
    specs: ["12GB GDDR6X", "DLSS 3", "Ray Tracing", "OC"],
    badge: "Gaming"
  },
  {
    id: 53,
    title: "Carte Graphique RTX 4080 Super",
    category: "Composants",
    price: "14,900 MAD",
    image: "Carte Graphique RTX 4080 Super.jpg",
    specs: ["16GB GDDR6X", "DLSS 3", "4K", "OC"],
    badge: "Premium"
  },
  {
    id: 54,
    title: "Carte Mère Z790 A‑RGB",
    category: "Composants",
    price: "3,290 MAD",
    image: "Carte Mère Z790 A‑RGB.jpg",
    specs: ["LGA1700", "DDR5", "PCIe 5.0", "Wi‑Fi 6E"],
    badge: "Premium"
  },
  {
    id: 55,
    title: "Carte Mère B650 Wi‑Fi",
    category: "Composants",
    price: "2,290 MAD",
    image: "Carte Mère B650 Wi‑Fi.jpg",
    specs: ["AM5", "DDR5", "PCIe 4.0", "Wi‑Fi 6E"],
    badge: "Équilibré"
  },
  {
    id: 56,
    title: "Boîtier ATX Verre Trempé",
    category: "Composants",
    price: "1,590 MAD",
    image: "Boîtier ATX Verre Trempé.jpg",
    specs: ["Airflow", "ARGB", "Verre", "USB‑C"],
    badge: "Stylé"
  },
  {
    id: 57,
    title: "Boîtier ITX Air Mini",
    category: "Composants",
    price: "1,290 MAD",
    image: "Boîtier ITX Air Mini.jpg",
    specs: ["Mini‑ITX", "Airflow", "ARGB", "Compact"],
    badge: "Compact"
  },
  {
    id: 58,
    title: "Alimentation 850W Gold Modulaire",
    category: "Composants",
    price: "2,390 MAD",
    image: "Alimentation 850W Gold Modulaire.jpg",
    specs: ["80+ Gold", "Full Modulaire", "Silencieuse", "10 ans"],
    badge: "Fiable"
  },
  {
    id: 59,
    title: "Alimentation 1000W Platinum",
    category: "Composants",
    price: "3,290 MAD",
    image: "Alimentation 1000W PlatinumE.jpg",
    specs: ["80+ Platinum", "Modulaire", "Silent", "10 ans"],
    badge: "Haute Gamme"
  },
  {
    id: 60,
    title: "RAM DDR5 32GB 6000 CL30",
    category: "Composants",
    price: "1,850 MAD",
    image: "RAM DDR5 32GB 6000 CL30.jpg",
    specs: ["32GB (2x16)", "6000MHz", "CL30", "RGB"],
    badge: "Rapide"
  },
  {
    id: 61,
    title: "SSD NVMe 1TB Gen4 Heatsink",
    category: "Stockage",
    price: "1,190 MAD",
    image: "SSD NVMe 1TB Gen4 Heatsink.jpg",
    specs: ["7000/6000 MB/s", "Gen4", "Heatsink", "5 ans"],
    badge: "Rapide"
  },
  {
    id: 62,
    title: "SSD NVMe 2TB Gen4 DRAM",
    category: "Stockage",
    price: "2,490 MAD",
    image: "SSD NVMe 2TB Gen4 DRAM.jpg",
    specs: ["2TB", "Gen4", "DRAM", "7000MB/s"],
    badge: "Rapide"
  },
  {
    id: 63,
    title: "Disque Dur Externe 4TB USB‑C",
    category: "Stockage",
    price: "1,190 MAD",
    image: "Disque Dur Externe 4TB USB‑C.jpg",
    specs: ["4TB", "USB‑C", "Compact", "Fiable"],
    badge: "Capacité"
  },
  {
    id: 64,
    title: "Fauteuil Gaming XL Pro",
    category: "Mobilier",
    price: "3,490 MAD",
    image: "Fauteuil Gaming XL Pro.jpg",
    specs: ["Accoudoirs 4D", "Dossier 165°", "Cuir PU", "Oreiller"],
    badge: "Confort"
  },
  {
    id: 65,
    title: "Bureau Gaming 160cm LED",
    category: "Mobilier",
    price: "2,490 MAD",
    image: "Bureau Gaming 160cm LED.jpg",
    specs: ["160x70cm", "LED", "Gestion Câbles", "Tapis"],
    badge: "Setup"
  },
  {
    id: 66,
    title: "Manette Sans Fil Pro V2",
    category: "Accessoires",
    price: "1,090 MAD",
    image: "Manette Sans Fil Pro V2.jpg",
    specs: ["Bluetooth", "Vibrations", "Batterie", "PC"],
    badge: "Gaming"
  },
  {
    id: 67,
    title: "Ventilateurs ARGB 120mm (3x)",
    category: "Refroidissement",
    price: "590 MAD",
    image: "Ventilateurs ARGB 120mm (3x).jpg",
    specs: ["120mm", "PWM", "ARGB", "Silencieux"],
    badge: "Cool"
  },
  {
    id: 68,
    title: "Watercooling AIO 360 ARGB",
    category: "Refroidissement",
    price: "3,100 MAD",
    image: "Watercooling AIO 360 ARGB.jpg",
    specs: ["Radiateur 360mm", "Pompe Haute Pression", "ARGB", "Intel/AMD"],
    badge: "Extreme"
  },
  {
    id: 69,
    title: "Tapis de Souris XXL RGB",
    category: "Accessoires",
    price: "390 MAD",
    image: "Tapis de Souris XXL RGB.jpg",
    specs: ["900x400mm", "Surface micro‑texturée", "Base anti‑dérapante", "RGB"],
    badge: "Setup"
  }
  ,
  // 21 NEW products with new external images
  {
    id: 70,
    title: "PC Gaming RTX 4060 Air Mini",
    category: "PC Complet",
    price: "12,490 MAD",
    image: "PC Gaming RTX 4060 Air Mini.jpg",
    specs: ["RTX 4060", "Ryzen 5", "16GB DDR5", "1TB NVMe"],
    badge: "Nouveau"
  },
  {
    id: 71,
    title: "PC Création Compact i7",
    category: "PC Complet",
    price: "14,900 MAD",
    image: "PC Création Compact i7.jpg",
    specs: ["Intel i7", "32GB DDR5", "RTX 4070", "2TB NVMe"],
    badge: "Studio"
  },
  {
    id: 72,
    title: "Écran IPS 27'' 180Hz",
    category: "Moniteurs",
    price: "2,990 MAD",
    image: "Écran IPS 27'' 180Hz.jpg",
    specs: ["27''", "180Hz", "1ms", "IPS"],
    badge: "eSports"
  },
  {
    id: 73,
    title: "Écran OLED 34'' UltraWide 175Hz",
    category: "Moniteurs",
    price: "10,900 MAD",
    image: "Écran OLED 34'' UltraWide 175Hz.jpg",
    specs: ["UWQHD", "175Hz", "OLED", "HDR10"],
    badge: "Premium"
  },
  {
    id: 74,
    title: "Clavier 60% Sans Fil RGB",
    category: "Périphériques",
    price: "1,090 MAD",
    image: "Clavier 60 Sans Fil RGB.jpg",
    specs: ["60%", "Hot‑swap", "Bluetooth", "USB‑C"],
    badge: "Compact"
  },
  {
    id: 75,
    title: "Clavier TKL Low‑Profile",
    category: "Périphériques",
    price: "1,190 MAD",
    image: "Clavier TKL Low Profile.jpg",
    specs: ["TKL", "Low‑profile", "RGB", "2.4G"],
    badge: "Stylé"
  },
  {
    id: 76,
    title: "Souris 8K Polling 55g",
    category: "Périphériques",
    price: "1,090 MAD",
    image: "Souris 8K Polling.jpg",
    specs: ["55g", "26K DPI", "8KHz", "PTFE"],
    badge: "eSports"
  },
  {
    id: 77,
    title: "Casque Hi‑Res ANC Wireless",
    category: "Audio",
    price: "2,290 MAD",
    image: "Casque HiRes ANC Wireless.jpg",
    specs: ["ANC", "Hi‑Res", "BT 5.3", "40h"],
    badge: "Studio"
  },
  {
    id: 78,
    title: "Micro Streaming USB/XLR",
    category: "Audio",
    price: "2,190 MAD",
    image: "Micro Streaming USBXLR.jpg",
    specs: ["USB/XLR", "Anti‑pop", "Shockmount", "Bras"],
    badge: "Pro"
  },
  {
    id: 79,
    title: "Barre de Son Gaming 2.1 RGB",
    category: "Audio",
    price: "1,190 MAD",
    image: "Barre de Son Gaming 2.1 RGB.jpg",
    specs: ["2.1", "Bluetooth", "EQ", "RGB"],
    badge: "RGB"
  },
  {
    id: 80,
    title: "Carte Graphique RTX 4060 Ti",
    category: "Composants",
    price: "5,990 MAD",
    image: "Carte Graphique RTX 4060 Ti.jpg",
    specs: ["8GB GDDR6", "DLSS 3", "RT", "1080p Ultra"],
    badge: "Gaming"
  },
  {
    id: 81,
    title: "Carte Mère X670E Wi‑Fi",
    category: "Composants",
    price: "4,790 MAD",
    image: "Carte Mère X670E WiFi.jpg",
    specs: ["AM5", "DDR5", "PCIe 5.0", "Wi‑Fi 6E"],
    badge: "Premium"
  },
  {
    id: 82,
    title: "RAM DDR5 64GB 6000 CL30",
    category: "Composants",
    price: "3,200 MAD",
    image: "RAM DDR5 64GB 6000 CL30.jpg",
    specs: ["64GB (2x32)", "6000MHz", "CL30", "RGB"],
    badge: "Rapide"
  },
  {
    id: 83,
    title: "SSD NVMe 4TB Gen4 DRAM",
    category: "Stockage",
    price: "4,490 MAD",
    image: "SSD NVMe 4TB Gen4 DRAM.jpg",
    specs: ["4TB", "7000/6500 MB/s", "DRAM", "5 ans"],
    badge: "Capacité"
  },
  {
    id: 84,
    title: "HDD 12TB 7200 NAS",
    category: "Stockage",
    price: "2,190 MAD",
    image: "HDD 12TB 7200 NAS.jpg",
    specs: ["12TB", "7200RPM", "256MB", "SATA"],
    badge: "Fiable"
  },
  {
    id: 85,
    title: "Routeur Wi‑Fi 7 Quad‑Band 10G",
    category: "Réseau",
    price: "6,900 MAD",
    image: "Routeur Wi‑Fi 7 Quad‑Band 10G.jpg",
    specs: ["Wi‑Fi 7", "Quad‑Band", "10G", "Low Latency"],
    badge: "Ultra"
  },
  {
    id: 86,
    title: "Webcam 4K HDR AutoFocus",
    category: "Accessoires",
    price: "2,190 MAD",
    image: "Webcam 4K HDR AutoFocus.jpg",
    specs: ["4K", "HDR", "AF", "Low‑light"],
    badge: "Pro"
  },
  {
    id: 87,
    title: "Support Micro + Bras Pro",
    category: "Accessoires",
    price: "590 MAD",
    image: "Support Micro + Bras Pro.jpg",
    specs: ["Bras articulé", "Clamp", "Ressorts", "Pro"],
    badge: "Creator"
  },
  {
    id: 88,
    title: "Fauteuil Gaming Tissu Pro",
    category: "Mobilier",
    price: "2,000 MAD",
    image: "Fauteuil Gaming Tissu Pro.jpg",
    specs: ["Tissu", "Accoudoirs 4D", "Mémoire", "165°"],
    badge: "Confort"
  },
  {
    id: 89,
    title: "Bureau Gaming 160 LED Chêne",
    category: "Mobilier",
    price: "2,790 MAD",
    image: "Bureau Gaming 160 LED Chêne.jpg",
    specs: ["160x70cm", "LED", "Gestion Câbles", "Tapis"],
    badge: "Setup"
  },
  {
    id: 90,
    title: "Lampe RGB Ambiance Setup",
    category: "Accessoires",
    price: "390 MAD",
    image: "Lampe RGB Ambiance Setup.jpg",
    specs: ["RGB", "USB‑C", "App", "Scènes"],
    badge: "Setup"
  }
];


// Search & filter state (must come after products is defined)
const [query, setQuery] = useState("");
const [category, setCategory] = useState("all");
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const inCat = category === "all" || p.category === category;
      if (!q) return inCat;
      const hay = `${p.title} ${p.category} ${p.specs.join(" ")}`.toLowerCase();
      return inCat && hay.includes(q);
    });
  }, [products, query, category]);

  // Cart state with persistence
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Open cart if navigated with state { openCart: true }
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state && location.state.openCart) {
      setCartOpen(true);
      // clear the flag so refresh doesn't reopen
      navigate('.', { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, image: product.image, qty: 1 }];
    });
  };

  const inc = (id) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  const dec = (id) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  // Helper to parse numeric amount from price string like "1,200 MAD"
  const parsePrice = (p) => Number(String(p).replace(/[^0-9.]/g, "")) || 0;
  const cartTotal = cart.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0);

  // Commander now navigates to the dedicated order page

  return (
    <section id="products" className="products-section">
      <div className="container">
        {/* Hero Carousel */}
        <div className="products-hero">
          <button aria-label="Précédent" className="carousel-btn left" onClick={prev}>
            ‹
          </button>
          <div className="carousel-viewport" ref={viewportRef}>
            <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
              {featured.map((item) => (
                <div className="carousel-slide" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div className="slide-overlay">
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                    <a href="#products-grid" className="slide-cta">{item.cta} →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button aria-label="Suivant" className="carousel-btn right" onClick={next}>
            ›
          </button>
        </div>

        {/* Title Section */
        }
        <div className="title-section">
          <h2>
            Nos <span className="gradient-text">Produits</span>
          </h2>
          <p>Découvrez notre sélection de PC gaming et composants premium</p>
        </div>

        {/* Toolbar: Category Dropdown + Rounded Search + Cart Button */}
        <div className="products-toolbar">
          <div className="searchbar">
            {/* Categories dropdown button */}
            <CategoriesMenu
              categories={categories}
              current={category}
              onSelect={(c) => setCategory(c)}
              count={filtered.length}
            />

            <div className="search-field" role="search">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Rechercher"
              />
              <button type="button" className="search-submit" aria-label="Rechercher">
                🔍
              </button>
            </div>
          </div>

          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Ouvrir le panier">
            🛒 Panier
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>

        {/* Products Grid */}
        {/* Visible category chips above the grid */}
        <div className="category-chips-row" aria-label="Catégories">
          {categories.map((c) => (
            <button
              key={c}
              className={`chip${category === c ? " active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div id="products-grid" className="products-grid">
          {filtered.map((product) => (
            <div key={product.id} className="product-card">
              <div className="card-header">
                <span className="badge">{product.badge}</span>
              </div>

              {/* Product Image */}
              <div className="image-container">
                <img src={product.image} alt={product.title} />
              </div>

              {/* Product Info */}
              <div className="info">
                <p className="category">{product.category}</p>
                <h3>{product.title}</h3>
              </div>

              {/* Specs */}
              <div className="specs">
                {product.specs.map((spec, index) => (
                  <div key={index} className="spec-item">
                    <span className="dot"></span>
                    {spec}
                  </div>
                ))}
              </div>

              {/* Price and Button */}
              <div className="price-row">
                <div className="price">{product.price}</div>
                <div className="actions">
                  <Link
                    to={`/products/${product.id}`}
                    state={{ product }}
                    className="details-btn"
                  >
                    Voir détails →
                  </Link>
                  <button className="add-btn" onClick={() => addToCart(product)}>Ajouter</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="cta-container">
          <button className="cta-btn">Voir tous nos produits →</button>
        </div>
        {/* Cart Drawer */}
        <aside className={`cart-drawer${cartOpen ? " open" : ""}`} aria-hidden={!cartOpen}>
          <div className="cart-header">
            <h3>Votre Panier</h3>
            <button className="" onClick={() => setCartOpen(false)} aria-label="Fermer">✕</button>
          </div>
          <div className="cart-body">
            {cart.length === 0 ? (
              <p className="empty">Votre panier est vide.</p>
            ) : (
              <ul className="cart-list">
                {cart.map((item) => (
                  <li key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} />
                    <div className="meta">
                      <h4>{item.title}</h4>
                      <span className="unit">{item.price}</span>
                      <div className="qty">
                        <button onClick={() => dec(item.id)} aria-label="Diminuer">−</button>
                        <span>{item.qty}</span>
                        <button onClick={() => inc(item.id)} aria-label="Augmenter">+</button>
                        <button className="remove" onClick={() => removeItem(item.id)} aria-label="Retirer">Retirer</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="cart-footer">
            <div className="total">
              Total: <strong>{cartTotal.toLocaleString()} MAD</strong>
            </div>
            <div className="footer-actions">
              <button className="clear" onClick={clearCart}>Vider</button>
              <button className="checkout" disabled={cart.length === 0} onClick={() => { setCartOpen(false); navigate('/order'); }}>Commander</button>
            </div>
          </div>
        </aside>

      </div>
    </section>
  );
};

// Categories dropdown component (inline to keep file self-contained)
function CategoriesMenu({ categories, current, onSelect, count = 0 }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onDoc = (e) => {
      if (!e.target.closest || !e.target.closest('.categories-menu')) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  return (
    <div className="categories-menu">
      <button
        type="button"
        className="categories-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {`Catégories (${count})`} <span className="chevron">▾</span>
      </button>
      {open && (
        <ul className="categories-list" role="menu">
          {categories.map((c) => (
            <li key={c} role="menuitem">
              <button
                type="button"
                className={`cat-item${current === c ? ' active' : ''}`}
                onClick={() => {
                  onSelect(c);
                  setOpen(false);
                }}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Products;
