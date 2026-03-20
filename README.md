# Lab 02 - Real Estate Web App (Parte 2: Image Gallery & Accesibilidad) 🚀

## Funcionalidades Implementadas (Con respecto al Definition of Done)
Se implementó una Galería de Imágenes interactiva cumpliendo estrictamente con la rúbrica y aplicando principios de Clean Code y buena UX:

*   **Thumbnails Grid & Main Image:** Refactorización del diseño para mostrar la imagen principal a gran escala (clickeable) junto con una cuadrícula responsiva de miniaturas (`ImageGallery`).
*   **Modal Opens:** Vista a pantalla completa (`ImageModal`) que se activa al interactuar con cualquier imagen de la galería.
*   **Navigation & Image Counter:** Botones laterales para avanzar/retroceder y un indicador de posición dinámica (ej. "2 of 5").
*   **Keyboard Support (Accesibilidad):** Implementación de un `useEffect` optimizado para escuchar eventos globales (`keydown`). Permite navegación con flechas (`⬅️ ➡️`) y cierre con `Escape`.
*   **Close & Backdrop:** Cierre del modal habilitado mediante el botón "X" y haciendo clic en el fondo oscuro.
*   **UX Avanzada (Extras implementados):** 
    * Bloqueo del scroll del fondo (`body overflow: hidden`) mientras el modal está abierto.
    * Inyección dinámica de dependencias (React Nodes) para renderizar las etiquetas de estado (Venta/Alquiler) sobre la galería sin romper el encapsulamiento de los componentes.

---
**Video de demostración (Parte 2):** [https://youtu.be/HGOw51h4zFQ]
