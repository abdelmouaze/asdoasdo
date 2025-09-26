import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Cancel.css';

function Cancel() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Payment canceled | Moize';
  }, []);

  return (
    <div className="cancel-page" style={{ paddingTop: '120px' }}>
      <section className="cancel-card container">
        <div className="cancel-icon" aria-hidden>✖</div>
        <h1 className="cancel-title">Paiement annulé</h1>
        <p className="cancel-sub">
          Votre paiement a été annulé. Vous pouvez revenir à la boutique pour continuer vos achats
          ou réessayer le paiement plus tard.
        </p>
        <div className="cancel-actions">
          <Link className="btn btn-primary" to="/products">← Retour aux produits</Link>
          <button className="btn btn-outline" onClick={() => navigate(-1)}>⤺ Revenir en arrière</button>
        </div>
      </section>
    </div>
  );
}

export default Cancel;
