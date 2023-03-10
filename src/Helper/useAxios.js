/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";

function useAxios(url, body) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authState } = useOktaAuth();
  useEffect(() => {
    const response = axios({
      method: "post",
      url: url,
      headers: {
        Authorization: `Bearer ${authState.accessToken.accessToken}`,
        "Content-Type": "application/json",
      },
      data: body,
    });
    response.then((val) => {
      setLoading(false);
      setData(val.data);
    });
  }, []);

  return { loading, data };
}

export const useRequest = (url, body) => {
  const { authState } = useOktaAuth();
  const response = axios({
    method: "post",
    url: url,
    headers: {
      Authorization: `Bearer ${authState.accessToken.accessToken}`,
      "Content-Type": "application/json",
    },
    data: body,
  });
  const data = response.then((val) => {
    return val;
  });
  return { data };
};

export default useAxios;

export const baseUrl = 'http://65.1.3.29:9000/'
// export const baseUrl = 'http://localhost:9000/';