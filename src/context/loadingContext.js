// LoadingContext.js
import React, { createContext, useState } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = (value) => {
    setLoading(value);
  };

  return (
    <LoadingContext.Provider value={{ loading, toggleLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// export const useLoading = () => React.useContext(LoadingContext);
export default LoadingContext;
