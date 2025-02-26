import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      if (response.data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setError('Failed to submit the form. Please try again.');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      {success && <p className="success-message">Message sent successfully!</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;