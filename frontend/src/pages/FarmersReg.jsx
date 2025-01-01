import React, { useState } from "react";
import Header from '../comps/header.jsx';
import Footer from '../comps/footer.jsx';
import { useRef } from 'react';
import AlertSystem from '../comps/AlertSystem.jsx';
import './FarmersReg.css';


const FarmerRegistration = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [step, setStep] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    farmName: '',
    farmerName: '',
    phone: '',
    email: '',
    region: '',
    address: '',
    description: '',
    cropType: '',
    workType: '',
    farmSize: '',
    experienceRequired: '',
    volunteerCount: '',
    startDate: '',
    endDate: '',
    workHours: '',
    requirements: '',
    accommodation: false,
    accommodationDetails: '',
    meals: false,
    mealsDetails: '',
    transportation: false,
    transportationDetails: '',
    farmImages: []
  });

  const formRef = useRef(null);

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    const requiredFields = {
      1: ['farmName', 'farmerName', 'phone', 'email', 'region', 'address'],
      2: ['description', 'cropType', 'workType'],
      3: ['volunteerCount', 'startDate', 'endDate', 'workHours']
    };
  
    requiredFields[currentStep].forEach(field => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        newErrors[field] = 'שדה זה הוא חובה';
      }
    });
  
    // Phone validation
    if (currentStep === 1 && formData.phone) {
      const phoneRegex = /^0[2-9]\d{8}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'מספר הטלפון לא תקין';
      }
    }
  
    // Email validation
    if (currentStep === 1 && formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'כתובת אימייל לא תקינה';
      }
    }
  
    // Date validation
    if (currentStep === 3) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      if (formData.startDate) {
        const startDate = new Date(formData.startDate);
        if (startDate < today) {
          newErrors.startDate = 'תאריך ההתחלה חייב להיות היום או בעתיד';
        }
      }
  
      if (formData.startDate && formData.endDate) {
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        if (end < start) {
          newErrors.endDate = 'תאריך הסיום חייב להיות מאוחר יותר מתאריך ההתחלה';
        }
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleStepChange = (nextStep) => {
    const isCurrentStepValid = validateStep(step);
    
    if (isCurrentStepValid && nextStep > step) {
      setStep(nextStep);
      const formSection = document.querySelector('.registration-form-section');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (nextStep < step) {
      // Allow going back without validation
      setStep(nextStep);
      const formSection = document.querySelector('.registration-form-section');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.focus();
        errorElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      const imageFiles = Array.from(files);
      if (imageFiles.length + formData.farmImages.length > 3) {
        alert('ניתן להעלות עד 3 תמונות');
        return;
      }
      const newImages = imageFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setFormData(prev => ({
        ...prev,
        farmImages: [...prev.farmImages, ...newImages]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear specific field error when user starts typing/selecting
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const removeImage = (index) => {
    const updatedImages = formData.farmImages.filter((_, i) => i !== index);
    URL.revokeObjectURL(formData.farmImages[index].preview);
    
    setFormData(prev => ({
      ...prev,
      farmImages: updatedImages
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isFormValid = validateStep(1) && 
                       validateStep(2) && 
                       validateStep(3);
    
    if (!isFormValid) {
      setAlertMessage('אנא מלא את כל שדות החובה');
      setIsError(true);
      setShowAlert(true);
      
      // השתמש ב-scrollY במקום pageYOffset
      window.scrollTo({
        top: window.scrollY,
        behavior: 'smooth'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // כאן הלוגיקה של שליחת הטופס שלך
      await new Promise(resolve => setTimeout(resolve, 2000)); // סימולציה של שליחה
      
      setAlertMessage('התהליך הושלם בהצלחה! הצוות יצור עמך קשר בהקדם.');
      setIsError(false);
      setShowAlert(true);
      
      setTimeout(() => {
        setShowAlert(false);
        resetForm();
      }, 4000);
      
    } catch (error) {
      setAlertMessage('אירעה שגיאה בשליחת הטופס. אנא נסה שוב.');
      setIsError(true);
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    // Revoke any existing object URLs to prevent memory leaks
    formData.farmImages.forEach(image => {
      URL.revokeObjectURL(image.preview);
    });

    setFormData({
      farmName: '',
      farmerName: '',
      phone: '',
      email: '',
      region: '',
      address: '',
      description: '',
      cropType: '',
      workType: '',
      farmSize: '',
      experienceRequired: '',
      volunteerCount: '',
      startDate: '',
      endDate: '',
      workHours: '',
      requirements: '',
      accommodation: false,
      accommodationDetails: '',
      meals: false,
      mealsDetails: '',
      transportation: false,
      transportationDetails: '',
      farmImages: []
    });
    
    setStep(1);
    setErrors({});
    setShowRegistration(false);
    setShowAlert(false);
  };

  const renderInputWithError = (name, label, type = 'text', options = {}) => {
    const { required = true, additionalProps = {} } = options;
    return (
      <div className={`form-group ${errors[name] ? 'has-error' : ''}`}>
        <label>
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          required={required}
          className={errors[name] ? 'error-input' : ''}
          {...additionalProps}
        />
        {errors[name] && (
          <span className="error-message">{errors[name]}</span>
        )}
      </div>
    );
  };


  return (
    <div className="farmer-reg">
      <Header />
      <main className="farmer-registration">
        <div className="registration-container" dir="rtl">
          <section className="welcome-section">
            <div className="title-container">
              <h2 className="title">הצטרפו כחקלאים</h2>
            </div>

            <p className="opening-par">
              ברוכים הבאים לעמוד ההרשמה לחקלאים. אנו שמחים על התעניינותכם בשיתוף פעולה עם מיזם ההתנדבות שלנו. 
              המטרה שלנו היא ליצור חיבור משמעותי בין חקלאים למתנדבים, ולסייע בשמירה על החקלאות הישראלית.
            </p>

            <div className="registration_process_container">
              <h3 className="title2">תהליך ההרשמה כולל שלושה שלבים פשוטים:</h3>
              <ol className="registration_process_list">
                <li className="registration_list_item">
                  <h4>פרטים אישיים</h4>
                  <p className="registration_item_description">
                    תתבקש למלא את הפרטים הבסיסיים שלך ושל המשק, כדי שנוכל ליצור איתך קשר.
                  </p>
                </li>
                <li className="registration_list_item">
                  <h4>פרטי המשק</h4>
                  <p className="registration_item_description">
                    ספר לנו על המשק שלך - סוגי הגידולים, אופי העבודה, והמאפיינים הייחודיים שיעזרו למתנדבים להבין טוב יותר את מקום ההתנדבות.
                  </p>
                </li>
                <li className="registration_list_item">
                  <h4>פרטי ההתנדבות</h4>
                  <p className="registration_item_description">
                    בשלב זה תוכל לציין את הצרכים שלך - כמה מתנדבים נדרשים, מתי, ולכמה זמן.
                  </p>
                </li>
              </ol>
              <p className="end-description">
                עם סיום תהליך ההרשמה, נעבור על הפרטים ונפרסם את המשק שלך באתר בהקדם האפשרי. 
                אנו מתחייבים לתת מענה מהיר ומקצועי לכל בקשה.
              </p>
            </div>

            {!showRegistration ? (
              <div className="start-registration">
                <button 
                  className="start-button"
                  onClick={() => setShowRegistration(true)}
                >
                  מוכנים? בואו נתחיל
                </button>
              </div>
            ) : (
              <section className="registration-form-section" ref={formRef}>
                <div className="steps-indicator">
                  <div className={`step ${step >= 1 ? 'active' : ''}`}>פרטים אישיים</div>
                  <div className={`step ${step >= 2 ? 'active' : ''}`}>פרטי המשק</div>
                  <div className={`step ${step >= 3 ? 'active' : ''}`}>פרטי ההתנדבות</div>
                </div>

                <form onSubmit={handleSubmit} className="registration-form">
                  {step === 1 && (
                    <div className="form-section step-1">
                      <h3>פרטים אישיים</h3>
                      {renderInputWithError('farmName', 'שם המשק / חווה')}
                      {renderInputWithError('farmerName', 'שם מלא')}
                      {renderInputWithError('phone', 'טלפון', 'tel')}
                      {renderInputWithError('email', 'דוא"ל', 'email')}
                      
                      <div className={`form-group ${errors.region ? 'has-error' : ''}`}>
                        <label>
                          אזור
                          <span className="required-asterisk">*</span>
                        </label>
                        <select
                          name="region"
                          value={formData.region}
                          onChange={handleInputChange}
                          required
                          className={errors.region ? 'error-input' : ''}
                        >
                          <option value="">בחר אזור</option>
                          <option value="צפון">צפון</option>
                          <option value="שרון">שרון</option>
                          <option value="מרכז">מרכז</option>
                          <option value="דרום">דרום</option>
                        </select>
                        {errors.region && (
                          <span className="error-message">{errors.region}</span>
                        )}
                      </div>
                      
                      {renderInputWithError('address', 'כתובת המשק')}
                      
                      <button 
                        type="button" 
                        onClick={() => handleStepChange(2)}
                        disabled={isSubmitting}
                      >
                        המשך
                      </button>
                    </div>
                  )}
                    

                    {step === 2 && (
  <div className="form-section step-2">
    <h3>פרטי המשק</h3>
    {renderInputWithError('description', 'תיאור המשק', 'textarea',{required: false} )}
    {renderInputWithError('cropType', 'סוגי גידולים')}
    {renderInputWithError('workType', 'סוג העבודה')}
    
    {renderInputWithError('farmSize', 'גודל השטח החקלאי', 'text', { required: false })}
    
    <div className="form-group">
      <label>ניסיון נדרש</label>
      <textarea
        name="experienceRequired"
        value={formData.experienceRequired}
        onChange={handleInputChange}
      />
    </div>

    <div className="image-upload-section">
      <h4 className="image">תמונות מהמשק</h4>
      <p className="image-upload-text">
        הוספת תמונות יכולה לעזור למתנדבים להתרשם טוב יותר מהמשק שלך. 
        ניתן להעלות עד 3 תמונות (אופציונלי)
      </p>
      <input
        type="file"
        id="farm-images"
        accept="image/*"
        multiple
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="farm-images" className="image-upload-button">
        העלאת תמונות
      </label>
      
      <div className="image-preview-container">
        {formData.farmImages.map((image, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img
              src={image.preview}
              alt={`תמונת משק ${index + 1}`}
              className="image-preview"
            />
            <button
              className="remove-image"
              onClick={() => removeImage(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="button-group">
      <button 
        type="button" 
        onClick={() => handleStepChange(1)}
        disabled={isSubmitting}
      >
        חזור
      </button>
      <button 
        type="button"
        onClick={() => handleStepChange(3)}
        disabled={isSubmitting}
      >
        המשך
      </button>
    </div>
  </div>
)}


{step === 3 && (
  <div className="form-section step-3">
    <h3>פרטי ההתנדבות</h3>
    {renderInputWithError('volunteerCount', 'מספר מתנדבים נדרש', 'number')}
    {renderInputWithError('startDate', 'תאריך התחלה', 'date')}
    {renderInputWithError('endDate', 'תאריך סיום', 'date')}
    {renderInputWithError('workHours', 'שעות עבודה')}

    <div className="form-group">
      <label>דרישות מיוחדות</label>
      <textarea
        name="requirements"
        value={formData.requirements}
        onChange={handleInputChange}
      />
    </div>

    <div className="form-group checkbox-group">
      <label>
        <input
          type="checkbox"
          name="accommodation"
          checked={formData.accommodation}
          onChange={handleInputChange}
        />
        לינה במקום
      </label>
      {formData.accommodation && (
        <textarea
          name="accommodationDetails"
          value={formData.accommodationDetails}
          onChange={handleInputChange}
          placeholder="פרטים נוספים על הלינה"
        />
      )}
    </div>

    <div className="form-group checkbox-group">
      <label>
        <input
          type="checkbox"
          name="meals"
          checked={formData.meals}
          onChange={handleInputChange}
        />
        ארוחות
      </label>
      {formData.meals && (
        <textarea
          name="mealsDetails"
          value={formData.mealsDetails}
          onChange={handleInputChange}
          placeholder="פרטים נוספים על הארוחות"
        />
      )}
    </div>

    <div className="form-group checkbox-group">
      <label>
        <input
          type="checkbox"
          name="transportation"
          checked={formData.transportation}
          onChange={handleInputChange}
        />
        הסעות
      </label>
      {formData.transportation && (
        <textarea
          name="transportationDetails"
          value={formData.transportationDetails}
          onChange={handleInputChange}
          placeholder="פרטים נוספים על ההסעות"
        />
      )}
    </div>

    <div className="button-group">
      <button 
        type="button" 
        onClick={() => handleStepChange(2)}
        disabled={isSubmitting}
      >
        חזור
      </button>
      <button 
        type="submit"
        disabled={isSubmitting}
        className={isSubmitting ? 'submitting' : ''}
      >
        {isSubmitting ? 'שולח...' : 'שלח בקשה'}
      </button>
    </div>
  </div>
)}
                </form>
              </section>
            )}
          </section>
        </div>

        <AlertSystem
  isSubmitting={isSubmitting}
  showAlert={showAlert}
  alertMessage={alertMessage}
  onAlertClose={() => setShowAlert(false)}
  isError={isError}
/>
      </main>
      <Footer />
               
      <div className="footer-copyright">
  <p>
    
    Copyright ©{' '}
    <a
      className="web-link"
      href="https://mitnadvimb.il@gmail.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      מתנדבים באדמה
    </a>
    {` ${new Date().getFullYear()}`}
    <img
      src="/אייקון חטופים.png"
      alt="סמל החטופים"
      className="hostages-icon"
    />
  </p>
</div>
    </div>
  );
};

export default FarmerRegistration;