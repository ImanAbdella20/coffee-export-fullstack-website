import axios from 'axios';
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError('');

    try {
     const response =  await axios.post(`${import.meta.env.REACT_APP_API_URL}/contact/message`, {
       
      });
      if (!response) {
        throw new Error('Failed to send the message.');
      }

      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Reset form fields
    } catch (err) {
      setError('There was an issue sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='h-screen'>
      <div className="container mx-auto p-4">
        <h1 className="text-center text-3xl font-bold my-4">Contact Us</h1>
        <div className="flex justify-around">
          {/* Contact Info */}
          <div className="w-1/3">
            <h2 className="text-2xl font-semibold mb-2">Our Contact Information</h2>
            <p><strong>Email:</strong> info@coffeeexport.com</p>
            <p><strong>Phone:</strong> +251178456789</p>
            <p><strong>Address:</strong> 123 Coffee St, A.A, Ethiopia</p>
            <div className="mt-4">
              {/* Embed Map (Google Maps or other) */}
              <iframe
                src="https://www.google.com/maps/embed?pb=..."
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-1/3">
            <h2 className="text-2xl font-semibold mb-2">Send Us a Message</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-2 p-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-2 p-2"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="border-2 p-2"
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white p-2"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
