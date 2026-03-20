import type React from 'react';
import { Button } from '@/components/ui/button';
import { Scale, Check } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { Property } from '@/types/property';

interface CompareButtonProps {
  property: Property;
  className?: string;
}

export function CompareButton({ property, className = '' }: CompareButtonProps): React.ReactElement {
  const { compareList, addToCompare, removeFromCompare } = useCompare();

  // Verificamos si esta propiedad en específico ya está en la lista.
  const isSelected = compareList.some((p) => p.id === property.id);
  
  // Verificamos si ya llegamos al límite máximo.
  const isMaxReached = compareList.length >= 3;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que al hacer clic se abra la página de detalles si el botón está dentro de un Link.
    e.stopPropagation();

    if (isSelected) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property);
    }
  };

  return (
    <Button
      type="button"
      variant={isSelected ? "secondary" : "outline"}
      size="sm"
      className={`flex items-center gap-2 transition-all ${className}`}
      onClick={handleToggle}
      disabled={!isSelected && isMaxReached}
      title={isMaxReached && !isSelected ? "Límite de 3 propiedades alcanzado" : "Comparar propiedad"}
    >
      {isSelected ? (
        <>
          <Check className="h-4 w-4 text-green-600" />
          <span>Comparando</span>
        </>
      ) : (
        <>
          <Scale className="h-4 w-4" />
          <span>Comparar</span>
        </>
      )}
    </Button>
  );
}