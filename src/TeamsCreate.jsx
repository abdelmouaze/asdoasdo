import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeamsCreate.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Full ISO 3166-1 alpha-2 country codes
const REGION_CODES = [
  'AF','AX','AL','DZ','AS','AD','AO','AI','AQ','AG','AR','AM','AW','AU','AT','AZ','BS','BH','BD','BB','BY','BE','BZ','BJ','BM','BT','BO','BQ','BA','BW','BV','BR','IO','BN','BG','BF','BI','KH','CM','CA','CV','KY','CF','TD','CL','CN','CX','CC','CO','KM','CG','CD','CK','CR','CI','HR','CU','CW','CY','CZ','DK','DJ','DM','DO','EC','EG','SV','GQ','ER','EE','SZ','ET','FK','FO','FJ','FI','FR','GF','PF','TF','GA','GM','GE','DE','GH','GI','GR','GL','GD','GP','GU','GT','GG','GN','GW','GY','HT','HM','VA','HN','HK','HU','IS','IN','ID','IR','IQ','IE','IM','IL','IT','JM','JP','JE','JO','KZ','KE','KI','KP','KR','KW','KG','LA','LV','LB','LS','LR','LY','LI','LT','LU','MO','MG','MW','MY','MV','ML','MT','MH','MQ','MR','MU','YT','MX','FM','MD','MC','MN','ME','MS','MA','MZ','MM','NA','NR','NP','NL','NC','NZ','NI','NE','NG','NU','NF','MK','MP','NO','OM','PK','PW','PS','PA','PG','PY','PE','PH','PN','PL','PT','PR','QA','RE','RO','RU','RW','BL','SH','KN','LC','MF','PM','VC','WS','SM','ST','SA','SN','RS','SC','SL','SG','SX','SK','SI','SB','SO','ZA','GS','SS','ES','LK','SD','SR','SJ','SE','CH','SY','TW','TJ','TZ','TH','TL','TG','TK','TO','TT','TN','TR','TM','TC','TV','UG','UA','AE','GB','US','UM','UY','UZ','VU','VE','VN','VG','VI','WF','EH','YE','ZM','ZW'
];

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
const flagEmoji = (code) => code
  .toUpperCase()
  .replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0)));

export default function TeamsCreate() {
  const navigate = useNavigate();
  const token = localStorage.getItem('auth_token');
  const bannerInputRef = useRef(null);
  const logoInputRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    shortName: '',
    country: '',
    city: '',
    game: '',
    maxMembers: 4,
    logo: '',
    banner: '',
    socials: { facebook: '', twitter: '', telegram: '', whatsapp: '', discord: '' },
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const onChange = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const onSocial = (k, v) => setForm(prev => ({ ...prev, socials: { ...prev.socials, [k]: v } }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.country) { setError('Team name and country are required'); return; }
    try {
      setSaving(true);
      const res = await fetch(`${API_URL}/api/teams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to create team');
      await res.json().catch(() => ({}));
      navigate('/teams');
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const onPickBanner = () => bannerInputRef.current?.click();
  const onPickLogo = () => logoInputRef.current?.click();

  const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const onBannerFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const dataUrl = await readFileAsDataUrl(f);
    onChange('banner', dataUrl);
  };

  const onLogoFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const dataUrl = await readFileAsDataUrl(f);
    onChange('logo', dataUrl);
  };

  return (
    <div className="team-create-page" style={{ paddingTop: '107px' }}>
      <div className="tc-header">
        <button className="tc-back" onClick={() => navigate(-1)}>← Back</button>
        <h2>Create Team</h2>
        <div />
      </div>

      <div className="tc-banner">
        {form.banner ? (
          <img src={form.banner} alt="Banner" />
        ) : (
          <div className="tc-banner-placeholder">Upload banner URL below</div>
        )}
        <button type="button" className="tc-camera tc-banner-camera" onClick={onPickBanner} title="Upload banner">
          📷
        </button>
        <input ref={bannerInputRef} type="file" accept="image/*" onChange={onBannerFile} hidden />
        <div className="tc-avatar" onClick={onPickLogo} role="button" aria-label="Upload logo" title="Upload logo">
          {form.logo ? (
            <img src={form.logo} alt="Logo" />
          ) : (
            <div className="tc-avatar-placeholder" aria-hidden>
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 11c1.657 0 3-1.79 3-4s-1.343-4-3-4-3 1.79-3 4 1.343 4 3 4zM8 11c1.657 0 3-1.79 3-4S9.657 3 8 3 5 4.79 5 7s1.343 4 3 4zM8 13c-3.314 0-6 1.79-6 4v2h12v-2c0-2.21-2.686-4-6-4zm8 0c-.73 0-1.41.1-2 .27 1.19.86 2 2.05 2 3.73v2h6v-2c0-2.21-2.686-4-6-4z" fill="#9AA5B1"/>
              </svg>
            </div>
          )}
          <button type="button" className="tc-camera tc-logo-camera" onClick={onPickLogo} title="Upload logo" aria-label="Upload logo">
            📸
          </button>
          <input ref={logoInputRef} type="file" accept="image/*" onChange={onLogoFile} hidden />
        </div>
      </div>

      <form className="tc-form" onSubmit={onSubmit}>
        <div className="tc-grid">
          <label>
            <span>Team Name</span>
            <input value={form.name} onChange={(e)=>onChange('name', e.target.value)} placeholder="Your team name" />
          </label>
          <label>
            <span>Short Name</span>
            <input value={form.shortName} onChange={(e)=>onChange('shortName', e.target.value)} placeholder="Short name" />
          </label>

          <label>
            <span>Country</span>
            <select value={form.country} onChange={(e)=>onChange('country', e.target.value)}>
              <option value="">Select a country</option>
              {REGION_CODES.map((code) => (
                <option key={code} value={code}>
                  {flagEmoji(code)} {regionNames.of(code)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>City</span>
            <input value={form.city} onChange={(e)=>onChange('city', e.target.value)} placeholder="City name" />
          </label>

          <label>
            <span>Game</span>
            <select value={form.game} onChange={(e)=>onChange('game', e.target.value)}>
              <option value="">Choose</option>
              <option>Free Fire</option>
              <option>PUBG</option>
              <option>Call of Duty</option>
              <option>Fortnite</option>
              <option>Apex Legends</option>
              <option>Valorant</option>
            </select>
          </label>
          <label>
            <span>Max Members</span>
            <input type="number" min={1} max={50} value={form.maxMembers} onChange={(e)=>onChange('maxMembers', Number(e.target.value))} />
          </label>

          <label className="full">
            <span>Logo URL</span>
            <input value={form.logo} onChange={(e)=>onChange('logo', e.target.value)} placeholder="https://..." />
          </label>
          <label className="full">
            <span>Banner URL</span>
            <input value={form.banner} onChange={(e)=>onChange('banner', e.target.value)} placeholder="https://..." />
          </label>
        </div>

        <div className="tc-socials">
          <h4>Social Links</h4>
          <div className="tc-social-grid">
            <label>
              <span>WhatsApp</span>
              <input value={form.socials.whatsapp} onChange={(e)=>onSocial('whatsapp', e.target.value)} placeholder="https://wa.me/..." />
            </label>
            <label>
              <span>Twitter/X</span>
              <input value={form.socials.twitter} onChange={(e)=>onSocial('twitter', e.target.value)} placeholder="https://x.com/..." />
            </label>
            <label>
              <span>Telegram</span>
              <input value={form.socials.telegram} onChange={(e)=>onSocial('telegram', e.target.value)} placeholder="https://t.me/..." />
            </label>
            <label>
              <span>Facebook</span>
              <input value={form.socials.facebook} onChange={(e)=>onSocial('facebook', e.target.value)} placeholder="https://facebook.com/..." />
            </label>
            <label>
              <span>Discord</span>
              <input value={form.socials.discord} onChange={(e)=>onSocial('discord', e.target.value)} placeholder="https://discord.gg/..." />
            </label>
          </div>
        </div>

        {error && <div className="tc-error">{error}</div>}

        <div className="tc-actions">
          <button type="button" className="btn-secondary" onClick={()=>navigate('/teams')}>Cancel</button>
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Creating...' : 'Create Team'}</button>
        </div>
      </form>
    </div>
  );
}
