import React, { useState, useCallback, useEffect } from 'react';

interface ResizablePanelProps {
  children: React.ReactNode;
  width: number;
  minWidth: number;
  maxWidth: number;
  onResize: (newWidth: number) => void;
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  width,
  minWidth,
  maxWidth,
  onResize,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newWidth = e.clientX;
        if (newWidth >= minWidth && newWidth <= maxWidth) {
          onResize(newWidth);
        }
      }
    },
    [isDragging, minWidth, maxWidth, onResize]
  );

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="relative" style={{ width: `${width}px` }}>
      {children}
      <div
        className="absolute top-0 right-0 w-1 h-full bg-gray-600 cursor-col-resize hover:bg-indigo-500 transition-colors"
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};

export default ResizablePanel;