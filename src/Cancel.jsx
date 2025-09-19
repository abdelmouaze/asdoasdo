import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Cancel() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Payment canceled | Moize';
  }, []);

  return (
    <div style={{ paddingTop: '120px' }}>
      <section className="container" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h1 style={{ marginBottom: 12 }}>Paiement annulé</h1>
        <p style={{ color: 'var(--muted-foreground)', marginBottom: 24 }}>
          Votre paiement a été annulé. Vous pouvez revenir à la boutique pour continuer vos achats
          ou réessayer le paiement plus tard.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link className="button" to="/products">
            ← Retour aux produits
          </Link>
          <button className="button" onClick={() => navigate(-1)}>
            ⤺ Revenir en arrière
          </button>
        </div>
      </section>
    </div>
  );
}

export default Cancel;
