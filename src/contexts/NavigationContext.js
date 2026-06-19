import React, { createContext, useState, useContext } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [page, setPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const navigateTo = (pageName, productId = null) => {
    setPage(pageName);
    setSelectedProductId(productId);
  };

  return (
    <NavigationContext.Provider value={{ page, navigateTo, selectedProductId }}>
      {children}
    </NavigationContext.Provider>
  );
};