import React, { useState } from 'react';
import axios from 'axios';
import '../styles/DataFetching.css';

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

const DataFetching: React.FC = () => {
  const [searchType, setSearchType] = useState<'id' | 'email'>('id');
  const [searchValue, setSearchValue] = useState<string>('');
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContact = async () => {
    if (!searchValue) {
      setError(`Please enter a valid ${searchType === 'id' ? 'ID' : 'email'}`);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const params = searchType === 'email' ? { email: searchValue } : {};
      const endpoint = searchType === 'id' ? `http://localhost:5000/api/contact/${searchValue}` : `http://localhost:5000/api/contact/search/${params.email}`;
      console.log("*********res *********> [ "+endpoint+" ]");
      const response = await axios.get(endpoint, { params });

      if (response.data.success) {
        setContact(response.data.contact);
      } else {
        setError(response.data.message || 'Contact not found');
      }
    } catch (error) {
      setError('Failed to fetch contact. Please try again.');
      console.error('Error fetching contact:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="data-fetching-container">
      <h2>Fetch Contact</h2>
      <div className="fetch-form">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as 'id' | 'email')}
          className="search-type"
        >
          <option value="id">By ID</option>
          <option value="email">By Email</option>
        </select>
        <input
          type="text"
          placeholder={`Enter Contact ${searchType === 'id' ? 'ID' : 'Email'}`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={fetchContact} disabled={loading} className="fetch-button">
          {loading ? 'Fetching...' : 'Fetch Contact'}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {contact && (
        <div className="contact-details fade-in">
          <h3>Contact Details</h3>
          <p><strong>Name:</strong> {contact.name}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Message:</strong> {contact.message}</p>
          <p><strong>Date:</strong> {new Date(contact.date).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default DataFetching;