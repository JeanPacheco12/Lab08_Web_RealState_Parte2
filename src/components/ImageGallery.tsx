import type React from 'react';
import { useState } from 'react';
import { ImageModal } from '@/components/ImageModal';

interface ImageGalleryProps {
  images: string[];
  title: string;
  badge?: React.ReactNode; // Permitimos pasar el "badge" de Venta/Alquiler para mantener tu diseño
}

export function ImageGallery({ images, title, badge }: ImageGalleryProps): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const mainImage = images[0] ?? 'https://placehold.co/1200x600/e2e8f0/64748b?text=Sin+Imagen';

  return (
    <div className="space-y-4">
      {/* Imagen Principal */}
      <div 
        className="relative rounded-lg overflow-hidden cursor-pointer group"
        onClick={() => openModal(0)}
      >
        <img
          src={mainImage}
          alt={title}
          className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Capa oscura al hacer hover para indicar que es clickeable */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        {badge}
      </div>

      {/* Cuadrícula de Miniaturas (Requisito del Lab) */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(1).map((img, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden cursor-pointer h-24 group"
              onClick={() => openModal(index + 1)} // +1 porque el slice quitó la primera imagen
            >
              <img
                src={img}
                alt={`${title} - miniatura ${index + 2}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      )}

      {/* Renderizamos el Modal que creamos en el paso anterior */}
      <ImageModal
        images={images}
        currentIndex={currentIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNavigate={setCurrentIndex}
      />
    </div>
  );
}