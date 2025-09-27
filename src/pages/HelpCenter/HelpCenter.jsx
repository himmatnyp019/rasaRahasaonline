import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faQuestionCircle, 
  faShoppingCart, 
  faCreditCard, 
  faShippingFast, 
  faUndo, 
  faUserShield, 
  faHeadset, 
  faChevronDown, 
  faChevronUp,
  faSearch,
  faPaperPlane,
  faUser,
  faPhone,
  faEnvelope,
  faCommentDots,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import './HelpCenter.css';

const HelpCenter = () => {
  const { t } = useTranslation();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const faqData = [
    {
      id: 1,
      icon: faShoppingCart,
      category: 'ordering',
      question: t('howToPlaceOrderQuestion'),
      answer: t('howToPlaceOrderAnswer')
    },
    {
      id: 2,
      icon: faCreditCard,
      category: 'payment',
      question: t('paymentMethodsQuestion'),
      answer: t('paymentMethodsAnswer')
    },
    {
      id: 3,
      icon: faShippingFast,
      category: 'shipping',
      question: t('shippingTimeQuestion'),
      answer: t('shippingTimeAnswer')
    },
    {
      id: 4,
      icon: faUndo,
      category: 'returns',
      question: t('returnPolicyQuestion'),
      answer: t('returnPolicyAnswer')
    },
    {
      id: 5,
      icon: faUserShield,
      category: 'account',
      question: t('createAccountQuestion'),
      answer: t('createAccountAnswer')
    },
    {
      id: 6,
      icon: faShippingFast,
      category: 'shipping',
      question: t('trackOrderQuestion'),
      answer: t('trackOrderAnswer')
    },
    {
      id: 7,
      icon: faCreditCard,
      category: 'payment',
      question: t('paymentSecurityQuestion'),
      answer: t('paymentSecurityAnswer')
    },
    {
      id: 8,
      icon: faUndo,
      category: 'returns',
      question: t('refundProcessQuestion'),
      answer: t('refundProcessAnswer')
    }
  ];

  const categories = [
    { key: 'all', label: t('categoriesAll'), icon: faQuestionCircle },
    { key: 'ordering', label: t('categoriesOrdering'), icon: faShoppingCart },
    { key: 'payment', label: t('categoriesPayment'), icon: faCreditCard },
    { key: 'shipping', label: t('categoriesShipping'), icon: faShippingFast },
    { key: 'returns', label: t('categoriesReturns'), icon: faUndo },
    { key: 'account', label: t('categoriesAccount'), icon: faUserShield }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', phone: '', email: '', message: '' });
      alert(t('inquirySubmitSuccess'));
    }, 2000);
  };

  return (
    <div className="help-center">
      <div className="help-center-container">
        {/* Header Section */}
        <div className="help-center-header">
          <div className="header-content">
            <div className="header-icon-container">
              <FontAwesomeIcon icon={faHeadset} className="header-icon" />
              <div className="icon-glow"></div>
            </div>
            <h1 className="header-title">{t('helpCenterTitle')}</h1>
            <p className="header-subtitle">{t('helpCenterSubtitle')}</p>
            <div className="header-decoration">
              <div className="decoration-dot"></div>
              <div className="decoration-dot"></div>
              <div className="decoration-dot"></div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        {/* <div className="search-section">
          <div className="search-container">
            <div className="search-wrapper">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="search-ripple"></div>
            </div>
          </div>
        </div> */}

        {/* Category Filter */}
        <div className="category-section">
          <h3 className="section-title">{t('browseCategories')}</h3>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category.key}
                className={`category-btn ${selectedCategory === category.key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.key)}
              >
                <div className="btn-icon">
                  <FontAwesomeIcon icon={category.icon} />
                </div>
                <span>{category.label}</span>
                <div className="btn-ripple"></div>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2 className="section-title main-title">{t('faqTitle')}</h2>
          <div className="faq-list">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map(faq => (
                <div key={faq.id} className="faq-item">
                  <div 
                    className="faq-question"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <div className="question-content">
                      <div className="faq-icon-container">
                        <FontAwesomeIcon icon={faq.icon} className="faq-icon" />
                      </div>
                      <span className="question-text">{faq.question}</span>
                    </div>
                    <div className="toggle-container">
                      <FontAwesomeIcon 
                        icon={openFAQ === faq.id ? faChevronUp : faChevronDown} 
                        className="toggle-icon"
                      />
                    </div>
                  </div>
                  <div className={`faq-answer ${openFAQ === faq.id ? 'open' : ''}`}>
                    <div className="answer-content">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <div className="no-results-icon-container">
                  <FontAwesomeIcon icon={faQuestionCircle} className="no-results-icon" />
                </div>
                <h3>{t('noResultsTitle')}</h3>
                <p>{t('noResultsMessage')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Inquiry Form Section */}
        <div className="inquiry-section">
          <div className="inquiry-header">
            <div className="inquiry-icon-container">
              <FontAwesomeIcon icon={faCommentDots} className="inquiry-icon" />
            </div>
            <h3 className="inquiry-title">{t('sendInquiryTitle')}</h3>
            <p className="inquiry-subtitle">{t('sendInquirySubtitle')}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="inquiry-form">
            <div className="form-grid">
              <div className="form-group">
                <div className="input-container">
                  <FontAwesomeIcon icon={faUser} className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('namePlaceholder')}
                    className="form-input"
                    required
                  />
                  <div className="input-underline"></div>
                </div>
              </div>
              
              <div className="form-group">
                <div className="input-container">
                  <FontAwesomeIcon icon={faPhone} className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('phonePlaceholder')}
                    className="form-input"
                    required
                  />
                  <div className="input-underline"></div>
                </div>
              </div>
              
              <div className="form-group form-group-full">
                <div className="input-container">
                  <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('emailPlaceholder')}
                    className="form-input"
                    required
                  />
                  <div className="input-underline"></div>
                </div>
              </div>
              
              <div className="form-group form-group-full">
                <div className="textarea-container">
                  <FontAwesomeIcon icon={faCommentDots} className="textarea-icon" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('messagePlaceholder')}
                    className="form-textarea"
                    rows="5"
                    required
                  ></textarea>
                  <div className="textarea-underline"></div>
                </div>
              </div>
            </div>
            
            <div className="form-submit">
              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                <div className="btn-content">
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="btn-icon spinning" />
                      <span>{t('submitBtnSending')}</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} className="btn-icon" />
                      <span>{t('submitBtnText')}</span>
                    </>
                  )}
                </div>
                <div className="btn-wave"></div>
              </button>
            </div>
          </form>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <h3 className="contact-title">{t('stillNeedHelp')}</h3>
          <p className="contact-message">{t('contactMessage')}</p>
          <div className="contact-buttons">
            <button className="contact-btn primary">
              <FontAwesomeIcon icon={faHeadset} className="contact-icon" />
              <span>{t('liveChatBtn')}</span>
              <div className="btn-glow"></div>
            </button>
            <button className="contact-btn secondary">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              <span>{t('emailSupportBtn')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;