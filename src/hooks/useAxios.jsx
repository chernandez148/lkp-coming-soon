import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (url, config = {}, useCache = true) => {
  const [data, setData] = useState(() => {
    if (useCache) {
      const cached = sessionStorage.getItem(url);
      return cached ? JSON.parse(cached) : null;
    }
    return null;
  });

  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (useCache && data) return; // ✅ Don't fetch again if cached

    const source = axios.CancelToken.source();
    setLoading(true);

    axios
      .get(url, { cancelToken: source.token, ...config })
      .then((response) => {
        setData(response.data);
        setError(null);
        if (useCache) {
          sessionStorage.setItem(url, JSON.stringify(response.data));
        }
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(err);
        }
      })
      .finally(() => setLoading(false));

    return () => {
      source.cancel();
    };
  }, [url]);

  return { data, loading, error };
};

export default useAxios;
