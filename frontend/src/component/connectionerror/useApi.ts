// src/hooks/useApi.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = <T,>(url: string, params?: any) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, { params });
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(
          axios.isAxiosError(err) && err.message === 'Network Error' 
            ? 'connection' 
            : 'Failed to load data'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(params)]);

  return { data, loading, error };
};

export default useApi;