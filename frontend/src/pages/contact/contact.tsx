import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.message) {
      setError(t('contact.errors.required'));
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post(
        `${import.meta.env.REACT_APP_API_URL}/contact/message`,
        {
          username: formData.username,
          email: formData.email,
          message: formData.message
        }
      );
      
      if (response.status !== 200) {
        throw new Error(t('contact.errors.failed'));
      }

      setSuccess(true);
      setFormData({ username: '', email: '', message: '' });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || t('contact.errors.generic'));
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t('contact.errors.unexpected'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="subscribtionh1 text-4xl font-bold text-center text-[#AD7C59] mb-12 relative">
          {t('contact.title')}
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-12 p-8 w-[70%] relative left-70">
          {/* Contact Info */}
          <div className="w-1/2">
            <h2 className="contactinfoh2 text-2xl font-semibold text-gray-800 border-b pb-2 border-[#AD7C59]">
              {t('contact.info.title')}
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-[#AD7C59]/10 p-2 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-[#AD7C59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">{t('contact.info.email')}</h3>
                  <p className="text-gray-600">{t('contact.info.emailValue')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#AD7C59]/10 p-2 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-[#AD7C59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">{t('contact.info.phone')}</h3>
                  <p className="text-gray-600">{t('contact.info.phoneValue')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#AD7C59]/10 p-2 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-[#AD7C59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">{t('contact.info.address')}</h3>
                  <p className="text-gray-600">{t('contact.info.addressValue')}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8170906.499278747!2d35.4925666!3d9.145000000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sEthiopia!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                title={t('contact.info.addressValue')}
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-1/2">
            <h2 className="contactinfoh2 text-2xl font-semibold text-gray-800 border-b pb-2 border-[#AD7C59] mb-6">
              {t('contact.form.title')}
            </h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {t('contact.success')}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AD7C59] focus:border-[#AD7C59] transition"
                  placeholder={t('contact.form.namePlaceholder')}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className=" block text-sm font-medium text-gray-70 mb-5">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AD7C59] focus:border-[#AD7C59] transition"
                  placeholder={t('contact.form.emailPlaceholder')}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AD7C59] focus:border-[#AD7C59] transition"
                  placeholder={t('contact.form.messagePlaceholder')}
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-[#AD7C59] text-white font-medium rounded-lg hover:bg-[#8c5e40] transition flex justify-center items-center ${isSubmitting ? 'opacity-75' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('contact.form.sending')}
                  </>
                ) : t('contact.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;