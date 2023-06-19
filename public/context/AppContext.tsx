import { createContext, ReactNode } from 'react';

export const AppContext = createContext<any>(null);

export const CountryProvider: React.FC<{ children: ReactNode }> = ({ children }) => { 
  return (
    <AppContext.Provider value={children}>
      {children}
    </AppContext.Provider>
  );
};
