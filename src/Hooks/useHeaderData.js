import { useEffect, useState } from "react";

const useHeaderData = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem("user");

    setUserInfo(user ? JSON.parse(user) : null);

    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken ? JSON.parse(storedToken) : null);
  }, []);

  return {
    userInfo,
    token,
  };
};

export default useHeaderData;
