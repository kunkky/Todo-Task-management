import React, { useEffect, useState } from "react";
import PageLoader from "./PageLoader";
import HomePage from "./Dashboard/HomePage";

const Home = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  }, []);

  return <>{showLoader ? <PageLoader /> : <HomePage />}</>;
};

export default Home;
