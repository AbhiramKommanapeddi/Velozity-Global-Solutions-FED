import React, { useState, useRef, useEffect, useCallback } from 'react';

interface VirtualListProps<T> {
  items: T[];
  rowHeight: number;
  renderRow: (item: T, index: number) => React.ReactNode;
  buffer?: number;
}

const VirtualList = <T,>({ items, rowHeight, renderRow, buffer = 5 }: VirtualListProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const totalHeight = items.length * rowHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);
  const endIndex = Math.min(items.length, Math.ceil((scrollTop + containerHeight) / rowHeight) + buffer);

  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * rowHeight;

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-full overflow-y-auto custom-scrollbar relative"
    >
      <div style={{ height: totalHeight, width: '100%', pointerEvents: 'none' }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transform: `translateY(${offsetY}px)`,
        }}
      >
        {visibleItems.map((item, index) => renderRow(item, startIndex + index))}
      </div>
    </div>
  );
};

export default VirtualList;
