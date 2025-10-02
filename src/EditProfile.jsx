import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    city: '',
    country: 'United Arab Emirates'
  });
  const [avatarImage, setAvatarImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  useEffect(() => {
    try {
      const userData = localStorage.getItem('auth_user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setFormData({
          name: parsedUser.name || '',
          email: parsedUser.email || '',
          phone: parsedUser.phone || '',
          birthDate: parsedUser.birthDate || '',
          firstName: parsedUser.name?.split(' ')[0] || '',
          lastName: parsedUser.name?.split(' ')[1] || '',
          password: '',
          confirmPassword: '',
          city: parsedUser.city || 'الإمارات العربية المتحدة',
          country: parsedUser.country || 'United Arab Emirates'
        });
        // Load existing images
        if (parsedUser.avatarUrl) {
          setAvatarImage(parsedUser.avatarUrl);
        }
        if (parsedUser.coverImage) {
          setCoverImage(parsedUser.coverImage);
        }
      } else {
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      navigate('/signin');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    try {
      const updatedUser = { 
        ...user, 
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        avatarUrl: avatarImage || user.avatarUrl,
        coverImage: coverImage || user.coverImage
      };
      
      // Try to save
      try {
        localStorage.setItem('auth_user', JSON.stringify(updatedUser));
        alert('تم حفظ التغييرات بنجاح!');
        navigate('/profile');
      } catch (storageError) {
        if (storageError.name === 'QuotaExceededError') {
          // Storage is full, try to save without images
          alert('الصور كبيرة جداً! سيتم حفظ البيانات بدون الصور.');
          const userWithoutImages = { 
            ...user, 
            ...formData,
            name: `${formData.firstName} ${formData.lastName}`.trim()
          };
          localStorage.setItem('auth_user', JSON.stringify(userWithoutImages));
          navigate('/profile');
        } else {
          throw storageError;
        }
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('حدث خطأ أثناء حفظ التغييرات: ' + error.message);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  const handleImageUpload = (file, type) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set max dimensions
          const maxWidth = type === 'avatar' ? 300 : 800;
          const maxHeight = type === 'avatar' ? 300 : 400;
          
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.7 quality
          const compressedImage = canvas.toDataURL('image/jpeg', 0.7);
          
          if (type === 'avatar') {
            setAvatarImage(compressedImage);
          } else if (type === 'cover') {
            setCoverImage(compressedImage);
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  const flagEmoji = (code) => (code||'').toUpperCase().replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0)));

  // Function to clear old images from localStorage
  const clearOldImages = () => {
    if (window.confirm('هل تريد حذف الصور القديمة لتوفير المساحة؟')) {
      const userData = localStorage.getItem('auth_user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        delete parsedUser.avatarUrl;
        delete parsedUser.coverImage;
        localStorage.setItem('auth_user', JSON.stringify(parsedUser));
        setAvatarImage(null);
        setCoverImage(null);
        alert('تم حذف الصور القديمة بنجاح!');
      }
    }
  };

  if (!user) {
    return (
      <div className="edit-profile-page">
        <div className="loading">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '107px' }}>
      <div className="edit-profile-page">
        
        {/* Cover Section */}
        <div className="edit-cover">
          {coverImage ? (
            <img src={coverImage} alt="Profile cover" />
          ) : (
            <div className="edit-cover-placeholder" />
          )}

          {/* Hero Section */}
          <div className="edit-hero">
            {/* Back Button */}
            <button className="back-btn" onClick={handleCancel}>
              <span>←</span>
              Retour
            </button>

            {/* Cover Camera Button */}
            <button 
              className="cover-camera-btn"
              onClick={() => coverInputRef.current?.click()}
              title="Change Cover Photo"
            >
              📷 Changer la couverture
            </button>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleImageUpload(e.target.files[0], 'cover')}
            />

            <div className="edit-avatar">
              {avatarImage ? (
                <img src={avatarImage} alt="Avatar" />
              ) : (
                <div className="edit-avatar-placeholder">{initial}</div>
              )}
              <button 
                className="avatar-camera-btn"
                onClick={() => avatarInputRef.current?.click()}
                title="Change Profile Photo"
              >
                📷
              </button>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => handleImageUpload(e.target.files[0], 'avatar')}
              />
            </div>

            <div className="edit-hero-meta">
              <h2>{formData.firstName || formData.name || 'User'} {formData.lastName || ''}</h2>
              <div className="edit-hero-sub">
                {formData.city || 'City'} {formData.country ? <span className="edit-flag">{flagEmoji(formData.country)}</span> : '🌍'}
              </div>
            </div>
          </div>
        </div>

        {/* Form Grid */}
        <div className="edit-form-grid">
          
          {/* Left Column */}
          <div className="form-column">
            
            {/* Phone Number */}
            <div className="form-field">
              <label>Numéro de téléphone</label>
              <div className="input-container">
                <span className="field-icon"></span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Entrez votre numéro"
                />
              </div>
            </div>

            {/* Birth Date */}
            <div className="form-field">
              <label>Date de naissance</label>
              <div className="input-container">
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* First Name */}
            <div className="form-field">
              <label>Prénom</label>
              <div className="input-container">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Abdo"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-field">
              <label>Confirmer le mot de passe</label>
              <div className="input-container">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirmer le mot de passe"
                />
              </div>
            </div>

            {/* City */}
            <div className="form-field">
              <label>Ville</label>
              <div className="input-container">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Entrez votre ville"
                />
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="form-column">
            
            {/* Username */}
            <div className="form-field">
              <label>Nom d'utilisateur</label>
              <div className="input-container">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Abdo Abdo"
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-field">
              <label>Email</label>
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="abdelmouaze123@gmail.com"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="form-field">
              <label>Nom de famille</label>
              <div className="input-container">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Abdo"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-field">
              <label>Mot de passe</label>
              <div className="input-container">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Entrez le nouveau mot de passe"
                />
              </div>
            </div>

            {/* Country */}
            <div className="form-field">
              <label>Pays</label>
              <div className="input-container">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="United Arab Emirates">United Arab Emirates 🇦🇪</option>
                  <option value="Europe">Europe 🇪🇺</option>
                  <option value="Algeria">Algérie 🇩🇿</option>
                  <option value="Morocco">Maroc 🇲🇦</option>
                  <option value="Tunisia">Tunisie 🇹🇳</option>
                  <option value="Egypt">Égypte 🇪🇬</option>
                  <option value="Saudi Arabia">Arabie Saoudite 🇸🇦</option>
                  <option value="USA">États-Unis 🇺🇸</option>
                </select>
              </div>
            </div>

          </div>

        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button className="cancel-btn" onClick={handleCancel}>
            Annuler
          </button>
          {(avatarImage || coverImage) && (
            <button 
              className="clear-images-btn" 
              onClick={clearOldImages}
              type="button"
            >
              🗑️ Supprimer les images
            </button>
          )}
          <button className="save-btn-main" onClick={handleSave}>
            💾 Enregistrer les modifications
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditProfile;
