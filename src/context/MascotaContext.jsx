import { createContext, useState } from 'react';

export const MascotaContext = createContext();

export const MascotaProvider = ({ children }) => {
  const [mascotaActual, setMascotaActual] = useState(null);

  return (
    <MascotaContext.Provider value={{ mascotaActual, setMascotaActual }}>
      {children}
    </MascotaContext.Provider>
  );
};
