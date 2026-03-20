import { useEffect } from 'react';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ImageModal({ images, currentIndex, onClose, onNext, onPrev }: ImageModalProps) {
  // Accesibilidad: Escuchar el teclado (Escape y Flechas)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!images || images.length === 0) return null;

  return (
    // Backdrop click: Cierra el modal si das clic en el fondo negro
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div 
        className="relative flex flex-col items-center justify-center w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic en la imagen
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl font-bold"
        >
          &times;
        </button>

        <div className="flex items-center justify-between w-full">
          {/* Navigation Arrows (Prev) */}
          <button 
            onClick={onPrev} 
            className="text-white hover:bg-white/20 p-4 rounded-full text-4xl transition"
          >
            &#8249;
          </button>

          {/* Imagen Actual */}
          <img 
            src={images[currentIndex]} 
            alt={`Property image ${currentIndex + 1}`} 
            className="max-h-[80vh] w-auto object-contain rounded-md"
          />

          {/* Navigation Arrows (Next) */}
          <button 
            onClick={onNext} 
            className="text-white hover:bg-white/20 p-4 rounded-full text-4xl transition"
          >
            &#8250;
          </button>
        </div>

        {/* Image Counter */}
        <div className="text-white mt-4 text-lg font-medium">
          {currentIndex + 1} of {images.length}
        </div>
      </div>
    </div>
  );
}