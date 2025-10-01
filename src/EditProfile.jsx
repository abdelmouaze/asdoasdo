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
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      alert('تم حفظ التغييرات بنجاح!');
      navigate('/profile');
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('حدث خطأ أثناء حفظ التغييرات');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  const handleImageUpload = (file, type) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'avatar') {
          setAvatarImage(e.target.result);
        } else if (type === 'cover') {
          setCoverImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  const flagEmoji = (code) => (code||'').toUpperCase().replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0)));

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
              العودة
            </button>

            {/* Cover Camera Button */}
            <button 
              className="cover-camera-btn"
              onClick={() => coverInputRef.current?.click()}
              title="Change Cover Photo"
            >
              📷 تغيير الغلاف
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
              <label>رقم الهاتف</label>
              <div className="input-container">
                <span className="field-icon"></span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="أدخل رقم الهاتف"
                />
              </div>
            </div>

            {/* Birth Date */}
            <div className="form-field">
              <label>تاريخ الميلاد</label>
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
              <label>الاسم الأول</label>
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
              <label>تأكيد كلمة المرور الجديدة</label>
              <div className="input-container">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="تأكيد كلمة المرور الجديدة"
                />
              </div>
            </div>

            {/* City */}
            <div className="form-field">
              <label>المدينة</label>
              <div className="input-container">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="الإمارات العربية المتحدة"
                />
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="form-column">
            
            {/* Username */}
            <div className="form-field">
              <label>اسم المستخدم</label>
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
              <label>البريد الإلكتروني</label>
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
              <label>الاسم الأخير</label>
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
              <label>كلمة السر</label>
              <div className="input-container">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="أدخل كلمة المرور الجديدة"
                />
              </div>
            </div>

            {/* Country */}
            <div className="form-field">
              <label>البلد</label>
              <div className="input-container">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="United Arab Emirates">United Arab Emirates 🇦🇪</option>
                  <option value="Europe">Europe 🇪🇺</option>
                  <option value="Algeria">الجزائر 🇩🇿</option>
                  <option value="Morocco">المغرب 🇲🇦</option>
                  <option value="Tunisia">تونس 🇹🇳</option>
                  <option value="Egypt">مصر 🇪🇬</option>
                  <option value="Saudi Arabia">السعودية 🇸🇦</option>
                  <option value="USA">أمريكا 🇺🇸</option>
                </select>
              </div>
            </div>

          </div>

        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button className="cancel-btn" onClick={handleCancel}>
            إلغاء
          </button>
          <button className="save-btn-main" onClick={handleSave}>
            💾 حفظ التغييرات
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditProfile;
