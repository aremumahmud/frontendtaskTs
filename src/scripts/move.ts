export default function move(scale: number = 1) {
    const wrapperElement = document.getElementById('constraint');
    const draggableElement = document.getElementById('wrapper') as HTMLElement | null;
    let isDragging = false;
    let offsetX: number | undefined, offsetY: number | undefined;
    let currentScale = 1;
  
    if (!draggableElement) {
      // Handle the case where 'draggableElement' is null (not found)
      return;
    }
  
    draggableElement.addEventListener('mousedown', (e: MouseEvent) => {
      isDragging = true;
      offsetX =
        (e.clientX - draggableElement.getBoundingClientRect().left) / currentScale;
      offsetY =
        (e.clientY - draggableElement.getBoundingClientRect().top) / currentScale;
      draggableElement.style.zIndex = '1';
    });
  
    document.addEventListener('mousemove', (e: MouseEvent) => {
      if (isDragging) {
        const left = (e.clientX - (offsetX || 0)) * currentScale;
        const top = (e.clientY - (offsetY || 0)) * currentScale;
  
        // Calculate the boundaries
        const minX = 0;
        const minY = 0;
        const maxX =
          (wrapperElement?.clientWidth || 0) -
          (draggableElement?.clientWidth || 0) * currentScale;
        const maxY =
          (wrapperElement?.clientHeight || 0) -
          (draggableElement?.clientHeight || 0) * currentScale;
  
        // Ensure the element stays within the boundaries
        const boundedLeft = Math.min(maxX, Math.max(minX, left));
        const boundedTop = Math.min(maxY, Math.max(minY, top));
  
        draggableElement.style.left = boundedLeft + 'px';
        draggableElement.style.top = boundedTop + 'px';
      }
    });
  
    document.addEventListener('mouseup', () => {
      isDragging = false;
      draggableElement.style.zIndex = '0';
    });
  }
  