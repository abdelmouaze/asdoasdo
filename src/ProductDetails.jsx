import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getProductById } from "./data/products";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const storeProduct = getProductById(id);
  const base = state?.product || storeProduct;
  const product = base && storeProduct
    ? { ...storeProduct, ...base, gallery: base.gallery ?? storeProduct.gallery }
    : base;

  const images = useMemo(() => {
    if (!product) return [];
    const normalize = (s) => {
      if (!s) return s;
      if (s.startsWith("http") || s.startsWith("/")) return s;
      return `/${s}`; 
    };
    const list = [product.image, ...(product.gallery ?? [])]
      .filter(Boolean)
      .map(normalize);
    if (list.length === 1) return [list[0], list[0], list[0]];
    return list;
  }, [product]);

  const [mainSrc, setMainSrc] = useState(() => (images[0] ?? ""));
  useEffect(() => {
    setMainSrc(images[0] ?? "");
  }, [images]);

  const [added, setAdded] = useState(false);
  const addToCart = () => {
    try {
      const raw = localStorage.getItem("cart");
      const cart = raw ? JSON.parse(raw) : [];
      const idx = cart.findIndex((i) => i.id === product.id);
      if (idx !== -1) {
        cart[idx] = { ...cart[idx], qty: cart[idx].qty + 1 };
      } else {
        cart.push({ id: product.id, title: product.title, price: product.price, image: product.image, qty: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
      navigate('/products', { state: { openCart: true } });
    } catch (e) {
      console.error("Failed to update cart", e);
    }
  };

  if (!product) {
    return (
      <div style={{ paddingTop: '107"px' }}>
      <section className="product-details-section">
        <div className="container">
          <div className="not-found">
            <h2>Produit introuvable</h2>
            <p>Le produit demandé n'existe pas ou n'est plus disponible.</p>
            <Link to="/products" className="btn-primary">← Retour aux produits</Link>
          </div>
        </div>
      </section>
      </div>
      );
  }

  return (
    <div style={{ paddingTop: '107px' }}>
    <section className="product-details-section">
      <div className="container details-layout">
        <div className="gallery">
          <div className="main-image">
            {mainSrc ? (
              <img src={mainSrc} alt={product.title} />
            ) : null}
          </div>
          {images.length ? (
            <div className="thumbs">
              {images.slice(0, 5).map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Aperçu ${idx + 1}`}
                  className={src === mainSrc ? "active" : ""}
                  onClick={() => setMainSrc(src)}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="info-panel">
          <div className="badge-row">
            <span className="badge">{product.badge}</span>
            <span className="category">{product.category}</span>
          </div>
          <h1 className="title">{product.title}</h1>

          <div className="price-block">
            <div className="price-gradient">{product.price}</div>
            <div className="availability">En stock • Livraison 24-72h</div>
          </div>

          {product.specs?.length ? (
            <div className="specs-grid">
              {product.specs.map((s, i) => (
                <div key={i} className="spec-chip">{s}</div>
              ))}
            </div>
          ) : null}

          <div className="description">
            <h3>Présentation</h3>
            <p>
              {product.description ||
                "Découvrez un produit pensé pour la performance et la fiabilité. Optimisé pour offrir une expérience fluide en jeu comme en productivité, avec une construction soignée et des composants de qualité."}
            </p>
          </div>

          <div className="features">
            <h3>Points forts</h3>
            <ul>
              {(product.features?.length ? product.features : [
                "Excellentes performances dans les jeux modernes",
                "Refroidissement optimisé et silencieux",
                "Conception premium et ergonomique",
                "Support et garantie inclus",
              ]).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="cta-row">
            <button className="btn-primary" onClick={addToCart} aria-live="polite">
              {added ? "Ajouté ✓" : "Ajouter au panier"}
            </button>
            <Link to="/products" className="btn-secondary">← Continuer mes achats</Link>
          </div>

          <div className="policies">
            <div>🚚 Livraison offerte dès 999 MAD</div>
            <div>🛡️ Garantie 1 mois</div>
            <div>💳 Paiement sécurisé</div>
          </div>
        </div>
      </div>

      <div className="container details-extra">
        <div className="info-cards">
          <div className="info-card">
            <h4>Assemblage et tests</h4>
            <p>Chaque configuration est montée et testée par nos techniciens avant expédition.</p>
          </div>
          <div className="info-card">
            <h4>Support expert</h4>
            <p>Une équipe passionnée vous accompagne pour le choix, l'installation et l'optimisation.</p>
          </div>
          <div className="info-card">
            <h4>Retour simplifié</h4>
            <p>7 jours pour changer d'avis avec prise en charge rapide.</p>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
