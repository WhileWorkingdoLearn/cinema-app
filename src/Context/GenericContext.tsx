import { createContext, useContext } from "react";

type ContextType<T> = {
    data: T;
  };
  
  export const createGenericContext = <T extends {}>() => {
    const context = createContext<ContextType<T> | undefined>(undefined);
    
    const useGenericContext = () => {
      const ctx = useContext(context);
      if (!ctx) {
        throw new Error('useGenericContext must be used within a Provider');
      }
      return ctx;
    };
  
    return [useGenericContext, context.Provider] as const;
  };
  
  
  