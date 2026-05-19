import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Stage, Layer, Line, Circle, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

interface Point {
  x: number;
  y: number;
}

interface PolylineCanvasProps {
  imageUrl: string;
  onSave?: (polylines: Point[][]) => void;
}

export default function PolylineCanvas({ imageUrl, onSave }: PolylineCanvasProps) {
  const [image] = useImage(imageUrl);
  const [polylines, setPolylines] = useState<Point[][]>([]);
  const [currentPolyline, setCurrentPolyline] = useState<Point[]>([]);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive stage resizing
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth } = containerRef.current;
        const aspect = 4 / 3;
        setStageSize({
          width: clientWidth,
          height: clientWidth / aspect,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStageClick = (e: any) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    
    // If clicking on an existing point, maybe we want to select it 
    // for now just add to current polyline
    setCurrentPolyline([...currentPolyline, point]);
  };

  const finishPolyline = () => {
    if (currentPolyline.length > 1) {
      setPolylines([...polylines, currentPolyline]);
      setCurrentPolyline([]);
    }
  };

  const undo = () => {
    if (currentPolyline.length > 0) {
      setCurrentPolyline(currentPolyline.slice(0, -1));
    } else if (polylines.length > 0) {
      const last = polylines[polylines.length - 1];
      setPolylines(polylines.slice(0, -1));
      setCurrentPolyline(last);
    }
  };

  const clear = () => {
    setPolylines([]);
    setCurrentPolyline([]);
  };

  const handlePointDrag = (pIdx: number, pointIdx: number, e: any) => {
    const { x, y } = e.target.position();
    const newPolylines = [...polylines];
    newPolylines[pIdx][pointIdx] = { x, y };
    setPolylines(newPolylines);
  };

  const handleCurrentPointDrag = (pointIdx: number, e: any) => {
    const { x, y } = e.target.position();
    const newCurrent = [...currentPolyline];
    newCurrent[pointIdx] = { x, y };
    setCurrentPolyline(newCurrent);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
        <button
          onClick={finishPolyline}
          disabled={currentPolyline.length < 2}
          className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium disabled:opacity-50 transition-all hover:bg-zinc-800"
        >
          Finish Polyline (Enter)
        </button>
        <button
          onClick={undo}
          className="px-4 py-2 border border-zinc-200 rounded-lg text-sm font-medium transition-all hover:bg-zinc-50"
        >
          Undo (Ctrl+Z)
        </button>
        <button
          onClick={clear}
          className="px-4 py-2 border border-zinc-200 text-red-600 rounded-lg text-sm font-medium transition-all hover:bg-red-50"
        >
          Clear All
        </button>
        <div className="flex-1" />
        <button
          onClick={() => onSave?.(polylines)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium transition-all hover:bg-emerald-700"
        >
          Save Annotation
        </button>
      </div>

      <div 
        ref={containerRef} 
        className="relative aspect-[4/3] w-full bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-200 shadow-inner cursor-crosshair"
      >
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          onClick={handleStageClick}
        >
          <Layer>
            {image && (
              <KonvaImage
                image={image}
                width={stageSize.width}
                height={stageSize.height}
                opacity={1}
              />
            )}
            
            {/* Finished Polylines */}
            {polylines.map((poly, pIdx) => (
              <React.Fragment key={pIdx}>
                <Line
                  points={poly.flatMap(p => [p.x, p.y])}
                  stroke="#10b981"
                  strokeWidth={3}
                  lineJoin="round"
                  lineCap="round"
                />
                {poly.map((p, ptIdx) => (
                  <Circle
                    key={ptIdx}
                    x={p.x}
                    y={p.y}
                    radius={5}
                    fill="white"
                    stroke="#10b981"
                    strokeWidth={2}
                    draggable
                    onDragEnd={(e) => handlePointDrag(pIdx, ptIdx, e)}
                  />
                ))}
              </React.Fragment>
            ))}

            {/* In-progress Polyline */}
            {currentPolyline.length > 0 && (
              <>
                <Line
                  points={currentPolyline.flatMap(p => [p.x, p.y])}
                  stroke="#3b82f6"
                  strokeWidth={3}
                  lineJoin="round"
                  lineCap="round"
                />
                {currentPolyline.map((p, idx) => (
                  <Circle
                    key={idx}
                    x={p.x}
                    y={p.y}
                    radius={6}
                    fill="#3b82f6"
                    stroke="white"
                    strokeWidth={2}
                    draggable
                    onDragEnd={(e) => handleCurrentPointDrag(idx, e)}
                  />
                ))}
              </>
            )}
          </Layer>
        </Stage>
        
        <div className="absolute bottom-4 left-4 flex gap-2">
            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white border border-white/20">
                Polylines: {polylines.length}
            </div>
            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white border border-white/20">
                Current Points: {currentPolyline.length}
            </div>
        </div>
      </div>
      
      <div className="bg-zinc-900 text-zinc-100 p-6 rounded-2xl">
        <h4 className="font-bold flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Instructions
        </h4>
        <ul className="text-sm space-y-1 text-zinc-400">
            <li>• Click anywhere on the image to add a point.</li>
            <li>• Points connect automatically in the order they are created.</li>
            <li>• Drag existing points to adjust their position.</li>
            <li>• Press "Finish Polyline" to complete the current path.</li>
        </ul>
      </div>
    </div>
  );
}
