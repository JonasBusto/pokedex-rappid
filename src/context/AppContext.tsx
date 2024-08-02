import { createContext, ReactNode, useState } from 'react';
import { ContextInterface } from '../interfaces/context';
import { useGetData } from '../hooks/useGetData';
import { useLoad } from '../hooks/useLoad';

export const AppContext = createContext<ContextInterface>({});

export function AppProvider({ children }: { children: ReactNode }) {
  useGetData();
  const { isLoading } = useLoad();

  const [showModalSign, setShowModalSign] = useState(false);

  const handleCloseModalSign = () => setShowModalSign(false);
  const handleShowModalSign = () => setShowModalSign(true);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        showModalSign,
        handleCloseModalSign,
        handleShowModalSign,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
