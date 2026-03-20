import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function ImageModal({ images, currentIndex, isOpen, onClose, onNavigate }: ImageModalProps) {
  // 1. REGLA DE ORO: El useEffect SIEMPRE debe ir hasta arriba,
  // antes de cualquier "return" condicional.
  useEffect(() => {
    // Si el modal no está abierto, no hacemos nada y salimos del hook.
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
    };

    // Bloquear scroll del fondo
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup: restaurar scroll y quitar listener
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  // 2. AHORA SÍ, si el modal está cerrado, detenemos el renderizado de la interfaz visual.
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Solo cerramos si el clic fue directamente en el fondo negro
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Botón Cerrar */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/20 hover:text-white z-50"
        onClick={onClose}
      >
        <X className="h-8 w-8" />
        <span className="sr-only">Cerrar modal</span>
      </Button>

      {/* Contador de Imágenes */}
      <div className="absolute top-4 left-4 text-white/80 font-medium z-50 bg-black/50 px-3 py-1 rounded-full">
        {currentIndex + 1} of {images.length}
      </div>

      {/* Botón Anterior */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white z-50 h-12 w-12 rounded-full"
          onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
        >
          <ChevronLeft className="h-8 w-8" />
          <span className="sr-only">Imagen anterior</span>
        </Button>
      )}

      {/* Imagen Principal Central */}
      <div className="relative max-w-5xl w-full max-h-[90vh] p-4 flex justify-center items-center">
        <img
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Botón Siguiente */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white z-50 h-12 w-12 rounded-full"
          onClick={() => onNavigate((currentIndex + 1) % images.length)}
        >
          <ChevronRight className="h-8 w-8" />
          <span className="sr-only">Siguiente imagen</span>
        </Button>
      )}
    </div>
  );
}