import React, { createContext, useContext, useState } from 'react';
import { Property } from '@/types/property';
import { toast } from 'sonner';

interface CompareContextType {
  compareList: Property[];
  addToCompare: (property: Property) => void;
  removeFromCompare: (propertyId: string) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: React.ReactNode }) => {
  const [compareList, setCompareList] = useState<Property[]>([]);

  const addToCompare = (property: Property) => {
    if (compareList.some(p => p.id === property.id)) {
      toast.error('Esta propiedad ya está en la lista de comparación');
      return;
    }
    if (compareList.length >= 3) {
      toast.error('Solo puedes comparar un máximo de 3 propiedades a la vez');
      return;
    }
    
    setCompareList([...compareList, property]);
    toast.success('Propiedad añadida a la comparación');
  };

  const removeFromCompare = (propertyId: string) => {
    setCompareList(compareList.filter(p => p.id !== propertyId));
    toast.info('Propiedad removida de la comparación');
  };

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) throw new Error('useCompare debe usarse dentro de un CompareProvider');
  return context;
};