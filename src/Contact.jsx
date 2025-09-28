import { useState } from 'react';
import './Contact.css';

// Base API URL from env (Vite) with localhost fallback for dev
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult({ type: '', message: '' });
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to send message');
      setResult({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setResult({ type: 'error', message: err.message || 'Something went wrong' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: '107px' }}>
    <div className="contact-page">
      <div className="container">
        <div className="contact-content">
          <h1>Contact Us</h1>
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>
                Have questions about our gaming gear? Need support with your order? 
                We're here to help! Reach out to our gaming experts.
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <h3>📧 Email</h3>
                  <p>shadowvortex433@gmail.com</p>
                </div>
                
                <div className="contact-item">
                  <h3>📞 Phone</h3>
                  <p>(+212) 714257457</p>
                </div>
                
                <div className="contact-item">
                  <h3>🕒 Support Hours</h3>
                  <p>Monday - Friday: 9AM - 8PM EST<br />
                     Saturday - Sunday: 10AM - 6PM EST</p>
                </div>
                
                <div className="contact-item">
                  <h3>🎮 Gaming Community</h3>
                  <p>Join our Discord server for real-time support and gaming discussions!</p>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="order-support">Order Support</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
                {result.message && (
                  <p
                    role="alert"
                    style={{
                      marginTop: '8px',
                      color: result.type === 'success' ? '#22c55e' : '#f87171',
                      fontWeight: 600,
                    }}
                  >
                    {result.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Contact;
