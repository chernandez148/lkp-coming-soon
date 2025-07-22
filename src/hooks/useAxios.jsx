import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/slices/userSlice";

const useAxios = (url, requiresUser = false, useCache = true) => {
  const [data, setData] = useState(() => {
    if (useCache) {
      const cached = sessionStorage.getItem(url);
      return cached ? JSON.parse(cached) : null;
    }
    return null;
  });

  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState(null);
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (useCache && data) return; // Don't fetch again if cached

    const source = axios.CancelToken.source();
    setLoading(true);

    const config = {};

    // Add user ID to request if required and user is logged in
    if (requiresUser && user?.id) {
      config.params = { user_id: user.id };
    }

    axios
      .get(url, {
        cancelToken: source.token,
        ...config,
      })
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
  }, [url, requiresUser, user?.id]); // Add user.id to dependencies

  return { data, loading, error };
};

export default useAxios;
