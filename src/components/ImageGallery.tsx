import { useState } from 'react';
import ImageModal from './ImageModal';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) {
    return <div className="p-4 text-gray-500">No hay imágenes disponibles para esta propiedad.</div>;
  }

  return (
    <div className="w-full space-y-4">
      {/* 1. Imagen Principal (Gigante y Clickeable) */}
      <div 
        className="relative w-full h-[400px] rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition"
        onClick={() => openModal(0)}
      >
        <img
          src={images[0]}
          alt="Vista principal de la propiedad"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* 2. Cuadrícula de Miniaturas (Las demás fotos) */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(1).map((img, idx) => (
            <div 
              key={idx} 
              className="aspect-video overflow-hidden rounded-lg cursor-pointer border border-gray-200 shadow-sm hover:shadow-md transition"
              onClick={() => openModal(idx + 1)} // +1 porque cortamos la primera foto
            >
              <img
                src={img}
                alt={`Miniatura ${idx + 2}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal a pantalla completa */}
      {modalOpen && (
        <ImageModal
          images={images}
          currentIndex={currentIndex}
          onClose={() => setModalOpen(false)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}