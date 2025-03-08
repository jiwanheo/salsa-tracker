import React, { createContext, useContext, useState } from 'react';

const TopPageContext = createContext();

export const useTopPageContext = () => useContext(TopPageContext);

export const TopPageContextProvider = ({ children }) => {
  const [topPageContextMessage, setTopPageContextMessage] = useState({ text: '', type: '' });

  return (
    <TopPageContext.Provider value={{ topPageContextMessage, setTopPageContextMessage }}>
      {children}
    </TopPageContext.Provider>
  );
};