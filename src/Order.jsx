import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './Order.css';

function Order() {
  // Load cart from localStorage to show summary
  const [cart, setCart] = useState([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart');
      setCart(raw ? JSON.parse(raw) : []);
    } catch {
      setCart([]);
    }
  }, []);

  // Helpers to keep cart in sync when user edits quantities from the summary
  const persistCart = (next) => {
    setCart(next);
    try { localStorage.setItem('cart', JSON.stringify(next)); } catch {}
  };
  const updateQty = (id, qty) => {
    const next = cart.map((i) => (i.id === id ? { ...i, qty } : i)).filter((i) => i.qty > 0);
    persistCart(next);
  };
  const removeItem = (id) => {
    const next = cart.filter((i) => i.id !== id);
    persistCart(next);
  };

  const parsePrice = (p) => Number(String(p).replace(/[^0-9.]/g, '')) || 0;
  const total = useMemo(() => cart.reduce((s, i) => s + parsePrice(i.price) * i.qty, 0), [cart]);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    notes: ''
  });
  const [errs, setErrs] = useState({});
  const [sending, setSending] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errs[name]) setErrs((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Prénom requis';
    if (!form.lastName.trim()) e.lastName = 'Nom requis';
    if (!form.email.trim()) e.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
    if (!form.phone.trim()) e.phone = 'Téléphone requis';
    if (!form.address.trim()) e.address = 'Adresse requise';
    if (!form.city.trim()) e.city = 'Ville requise';
    if (!form.postalCode.trim()) e.postalCode = 'Code postal requis';
    if (!form.country.trim()) e.country = 'Pays requis';
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const eObj = validate();
    if (Object.keys(eObj).length) { setErrs(eObj); return; }
    setSending(true);
    try {
      // TODO: Replace with real API/email submission
      const payload = { customer: form, items: cart, total };
      console.log('Submitting order', payload);
      await new Promise((r) => setTimeout(r, 1200));
      alert('Commande envoyée ! Nous vous contacterons pour la confirmation.');
      // Optionally clear cart here
      // localStorage.removeItem('cart');
      // setCart([]);
      setForm({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', postalCode: '', country: '', notes: '' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ paddingTop: '107px' }}>
    <div className="order-page">
      <div className="order-container">
        <div className="order-header">
          <Link to="/products" className="back-link">← Continuer mes achats</Link>
        </div>
        <h1>Finaliser la commande</h1>
        <p className="order-subtitle">Vérifiez votre panier et renseignez vos informations pour recevoir votre commande.</p>

        <div className="order-layout">
          <aside className="summary">
            <h2>Résumé du panier</h2>
            {cart.length === 0 ? (
              <p className="empty">Votre panier est vide.</p>
            ) : (
              <ul className="summary-list">
                {cart.map((i) => (
                  <li key={i.id} className="summary-item rowlike">
                    <img className="thumb" src={i.image} alt={i.title} />

                    <div className="mid">
                      <div className="title clamp">{i.title}</div>
                    </div>

                    <div className="right">
                      <div className="price-strong">{i.price}</div>
                      <div className="qty-controls">
                        <select value={i.qty} onChange={(e) => updateQty(i.id, Number(e.target.value))} aria-label={`Quantité pour ${i.title}`}>
                          {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                        <button type="button" className="remove-btn" onClick={() => removeItem(i.id)} aria-label={`Retirer ${i.title}`}>🗑</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="summary-total">Total: <strong>{total.toLocaleString()} MAD</strong></div>
          </aside>

          <form className="order-form" onSubmit={onSubmit}>
            <h2>Informations personnelles</h2>
            <div className="row">
              <div className="field">
                <label htmlFor="firstName">Prénom *</label>
                <input id="firstName" name="firstName" value={form.firstName} onChange={onChange} className={errs.firstName ? 'error' : ''} />
                {errs.firstName && <span className="err">{errs.firstName}</span>}
              </div>
              <div className="field">
                <label htmlFor="lastName">Nom *</label>
                <input id="lastName" name="lastName" value={form.lastName} onChange={onChange} className={errs.lastName ? 'error' : ''} />
                {errs.lastName && <span className="err">{errs.lastName}</span>}
              </div>
            </div>
            <div className="row">
              <div className="field">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" value={form.email} onChange={onChange} className={errs.email ? 'error' : ''} />
                {errs.email && <span className="err">{errs.email}</span>}
              </div>
              <div className="field">
                <label htmlFor="phone">Téléphone *</label>
                <input id="phone" name="phone" value={form.phone} onChange={onChange} className={errs.phone ? 'error' : ''} />
                {errs.phone && <span className="err">{errs.phone}</span>}
              </div>
            </div>

            <h2>Adresse de livraison</h2>
            <div className="field">
              <label htmlFor="address">Adresse *</label>
              <input id="address" name="address" value={form.address} onChange={onChange} className={errs.address ? 'error' : ''} />
              {errs.address && <span className="err">{errs.address}</span>}
            </div>
            <div className="row">
              <div className="field">
                <label htmlFor="city">Ville *</label>
                <input id="city" name="city" value={form.city} onChange={onChange} className={errs.city ? 'error' : ''} />
                {errs.city && <span className="err">{errs.city}</span>}
              </div>
              <div className="field">
                <label htmlFor="postalCode">Code postal *</label>
                <input id="postalCode" name="postalCode" value={form.postalCode} onChange={onChange} className={errs.postalCode ? 'error' : ''} />
                {errs.postalCode && <span className="err">{errs.postalCode}</span>}
              </div>
            </div>
            <div className="field">
              <label htmlFor="country">Pays *</label>
              <select id="country" name="country" value={form.country} onChange={onChange} className={errs.country ? 'error' : ''}>
                <option value="">Sélectionnez</option>
                <option value="MA">Maroc</option>
                <option value="FR">France</option>
                <option value="BE">Belgique</option>
                <option value="CH">Suisse</option>
                <option value="CA">Canada</option>
                <option value="TN">Tunisie</option>
                <option value="OTHER">Autre</option>
              </select>
              {errs.country && <span className="err">{errs.country}</span>}
            </div>

            <h2>Notes</h2>
            <div className="field">
              <label htmlFor="notes">Notes (optionnel)</label>
              <textarea id="notes" name="notes" rows={4} value={form.notes} onChange={onChange} placeholder="Précisions sur la commande..." />
            </div>

            <div className="page-actions">
              <button className="btn primary" type="submit" disabled={sending || cart.length === 0}>
                {sending ? 'Envoi...' : 'Envoyer la commande'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Order;
