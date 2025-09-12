import React, { useState } from "react";
import "./PUBG.css";

// Simple helpers
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const phoneRe = /^[0-9+()\s-]{6,}$/;

export default function PUBGBRRegistration({ eventName = "PUBG Morocco Cup 2025: BR", onClose }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    teamName: "",
    ingameID: "",
    rank: "",
    role: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  }

  function validate(values) {
    const errs = {};
    if (!values.fullName.trim()) errs.fullName = "Le nom est requis";
    if (!values.email.trim()) errs.email = "L'email est requis";
    else if (!emailRe.test(values.email)) errs.email = "Email invalide";
    if (!values.phone.trim()) errs.phone = "Téléphone requis";
    else if (!phoneRe.test(values.phone)) errs.phone = "Téléphone invalide";
    if (!values.country.trim()) errs.country = "Pays requis";
    if (!values.teamName.trim()) errs.teamName = "Nom d'équipe requis";
    if (!values.ingameID.trim()) errs.ingameID = "ID en jeu requis";
    if (!values.rank) errs.rank = "Rang requis";
    if (!values.role.trim()) errs.role = "Rôle requis";
    if (!values.agree) errs.agree = "Vous devez accepter les règles";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMsg("");
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    try {
      setSubmitting(true);
      // Simulate async submit and persist locally for demo
      await new Promise((res) => setTimeout(res, 800));
      const payload = { id: crypto.randomUUID?.() || String(Date.now()), eventName, ...form, createdAt: new Date().toISOString() };
      const raw = localStorage.getItem("pubg_registrations");
      const list = raw ? JSON.parse(raw) : [];
      list.push(payload);
      localStorage.setItem("pubg_registrations", JSON.stringify(list));
      setSuccessMsg("Inscription envoyée avec succès !");
      // Optional: reset minimal fields but keep name for multiple entries
      setForm((s) => ({ ...s, email: "", phone: "", ingameID: "" }));
    } catch (err) {
      setSuccessMsg("");
      setErrors({ submit: "Une erreur s'est produite. Réessayez." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <h2>{eventName} — Registration</h2>
        <button onClick={onClose} className="close-btn" aria-label="Fermer">×</button>
      </div>

      <form onSubmit={handleSubmit} className="form" noValidate>
        <label>
          Full Name
          <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="e.g. Yassine El Fassi" />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </label>

        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>

        <label>
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="+212 6 12 34 56 78" />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </label>

        <label>
          Country
          <input name="country" value={form.country} onChange={handleChange} placeholder="Morocco" />
          {errors.country && <span className="error">{errors.country}</span>}
        </label>

        <label>
          Team Name
          <input name="teamName" value={form.teamName} onChange={handleChange} placeholder="Atlas Lions" />
          {errors.teamName && <span className="error">{errors.teamName}</span>}
        </label>

        <label>
          In-game ID
          <input name="ingameID" value={form.ingameID} onChange={handleChange} placeholder="1234567890" />
          {errors.ingameID && <span className="error">{errors.ingameID}</span>}
        </label>

        <label>
          Rank
          <select name="rank" value={form.rank} onChange={handleChange}>
            <option value="">-- Select rank --</option>
            <option>Bronze</option>
            <option>Silver</option>
            <option>Gold</option>
            <option>Platinum</option>
            <option>Diamond</option>
            <option>Conqueror</option>
          </select>
          {errors.rank && <span className="error">{errors.rank}</span>}
        </label>

        <label>
          Role
          <input name="role" value={form.role} onChange={handleChange} placeholder="IGL / Fragger / Support" />
          {errors.role && <span className="error">{errors.role}</span>}
        </label>

        <label className="checkbox">
          <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
          I agree with the rules
        </label>
        {errors.agree && <span className="error">{errors.agree}</span>}

        {errors.submit && <p className="error">{errors.submit}</p>}
        {successMsg && <p className="success">{successMsg}</p>}

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={submitting || !form.agree}>
            {submitting ? "Submitting..." : "Register"}
          </button>
          <button
            type="button"
            className="reset-btn"
            onClick={() => setForm({ fullName:"", email:"", phone:"", country:"", teamName:"", ingameID:"", rank:"", role:"", agree:false })}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
