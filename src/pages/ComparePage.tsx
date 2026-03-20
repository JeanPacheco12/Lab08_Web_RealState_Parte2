import type React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { Button } from '@/components/ui/button';
import { formatPrice, formatArea } from '@/lib/utils';

export function ComparePage(): React.ReactElement {
  const { compareList, removeFromCompare } = useCompare();

  // =========================================================================
  // 1. ESTADO VACÍO (Requisito del Lab)
  // Si no hay propiedades, mostramos un mensaje amigable y un botón de regreso
  // =========================================================================
  if (compareList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center max-w-md">
        <div className="bg-muted p-6 rounded-full mb-6">
          <Trash2 className="h-12 w-12 text-muted-foreground opacity-50" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Nada por aquí...</h1>
        <p className="text-muted-foreground mb-8">
          Aún no has seleccionado ninguna propiedad para comparar. Ve al listado principal y selecciona hasta 3 propiedades que te interesen.
        </p>
        <Button asChild size="lg">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al listado
          </Link>
        </Button>
      </div>
    );
  }

  // =========================================================================
  // 2. CÁLCULOS PARA RESALTAR (Requisito del Lab)
  // Encontramos el precio más bajo y el área más grande para resaltarlos
  // =========================================================================
  const minPrice = Math.min(...compareList.map(p => p.price));
  const maxArea = Math.max(...compareList.map(p => p.area));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold">Comparación de Propiedades</h1>
          <p className="text-muted-foreground mt-1">
            Analiza las opciones lado a lado para tomar la mejor decisión.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Seguir buscando
          </Link>
        </Button>
      </div>

      <div className="overflow-x-auto pb-4">
        <table className="w-full border-collapse bg-card rounded-xl border shadow-sm overflow-hidden min-w-[800px]">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="p-4 text-left font-semibold text-muted-foreground w-1/4">Característica</th>
              {compareList.map(property => (
                <th key={property.id} className="p-4 text-left w-1/4 align-top border-l">
                  <div className="relative h-40 mb-4 rounded-lg overflow-hidden border">
                    <img
                      src={property.images?.[0] ?? `https://placehold.co/800x600/e2e8f0/64748b?text=${encodeURIComponent(property.propertyType)}`}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg leading-tight line-clamp-2 mb-1">{property.title}</h3>
                  <p className="text-sm font-normal text-muted-foreground">{property.city}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {/* PRECIO (Resalta el más bajo) */}
            <tr>
              <td className="p-4 font-medium text-muted-foreground">Precio</td>
              {compareList.map(property => {
                const isBest = property.price === minPrice;
                return (
                  <td key={property.id} className={`p-4 border-l transition-colors ${isBest ? 'bg-green-50/50 dark:bg-green-950/20' : ''}`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-xl ${isBest ? 'font-bold text-green-700 dark:text-green-500' : 'font-semibold'}`}>
                        {formatPrice(property.price)}
                      </span>
                      {isBest && <span title="Mejor precio"><CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" /></span>}
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* HABITACIONES */}
            <tr>
              <td className="p-4 font-medium text-muted-foreground">Habitaciones</td>
              {compareList.map(property => (
                <td key={property.id} className="p-4 border-l text-lg">
                  {property.bedrooms} {property.bedrooms === 1 ? 'habitación' : 'habitaciones'}
                </td>
              ))}
            </tr>

            {/* BAÑOS */}
            <tr>
              <td className="p-4 font-medium text-muted-foreground">Baños</td>
              {compareList.map(property => (
                <td key={property.id} className="p-4 border-l text-lg">
                  {property.bathrooms} {property.bathrooms === 1 ? 'baño' : 'baños'}
                </td>
              ))}
            </tr>

            {/* ÁREA (Resalta la más grande) */}
            <tr>
              <td className="p-4 font-medium text-muted-foreground">Área Total</td>
              {compareList.map(property => {
                const isBest = property.area === maxArea;
                return (
                  <td key={property.id} className={`p-4 border-l transition-colors ${isBest ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''}`}>
                     <div className="flex items-center gap-2">
                      <span className={`text-lg ${isBest ? 'font-bold text-blue-700 dark:text-blue-500' : ''}`}>
                        {formatArea(property.area)}
                      </span>
                      {isBest && <span title="Mayor área"><CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-500" /></span>}
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* PRECIO POR METRO CUADRADO */}
            <tr>
              <td className="p-4 font-medium text-muted-foreground">Precio por m²</td>
              {compareList.map(property => {
                const pricePerSqm = property.price / property.area;
                return (
                  <td key={property.id} className="p-4 border-l text-muted-foreground">
                    <span className="font-medium text-foreground">{formatPrice(pricePerSqm)}</span> / m²
                  </td>
                );
              })}
            </tr>

            {/* ACCIONES (Remover de la lista) */}
            <tr className="bg-muted/10">
              <td className="p-4"></td>
              {compareList.map(property => (
                <td key={property.id} className="p-4 border-l">
                  <Button
                    variant="ghost"
                    className="w-full flex items-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeFromCompare(property.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Quitar propiedad
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}