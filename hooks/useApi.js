import axios from 'axios';
import { useCallback, useMemo, useState } from 'react';

const useAPI = (url, method = 'GET', body = null, headers = {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  /*
    The useCallback hook is used to make the makeRequest function only re-created 
    when its dependencies (method, url, body, and headers) change. 
    This helps to avoid unnecessary re-renders in the component where this hook is used.
  */
  const makeRequest = useCallback(async () => {
    try {
      setLoading(true);
      const result = await axios({
        method,
        url,
        data: body,
        headers,
      });
      setResponse(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [method, url, body, headers]);

  /*
   In the useMemo hook, we are calling makeRequest and its dependency is also makeRequest. 
   This is done because we want the makeRequest function to be re-created only if its dependencies change.
   If the dependencies do not change, the same instance of the makeRequest function will be used. 
   This helps in preventing unnecessary re-renders of the component.
   */
  useMemo(() => {
    makeRequest();
  }, [makeRequest]);

  return { response, error, loading };
};

export default useAPI;
