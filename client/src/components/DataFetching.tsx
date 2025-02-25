import React, { useState } from 'react';
import axios from 'axios';
import '../styles/DataFetching.css';

interface Data {
  message: string;
}

const DataFetching: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Data>('http://localhost:5000/api/data');
      setData(response.data);
    } catch (error) {
      setError('Error fetching data. Please try again.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="data-fetching-container">
      <h2>Data Fetching</h2>
      <button onClick={fetchData} disabled={loading} className="fetch-button">
        {loading ? 'Fetching...' : 'Fetch Data'}
      </button>
      {loading && <div className="spinner"></div>}
      {error && <p className="error-message">{error}</p>}
      {data && (
        <div className="data-display fade-in">
          <p>Data from backend: {data.message}</p>
        </div>
      )}
    </div>
  );
};

export default DataFetching;