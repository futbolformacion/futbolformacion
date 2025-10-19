import React, { useState, useEffect, useRef } from "react";

const Campograma = ({ modalidad, sistema, jugadores, onLayoutChange }) => {
  const campoRef = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [layout, setLayout] = useState({});
  const [campoDim, setCampoDim] = useState({ width: 600, height: 900 });
  const [invertido, setInvertido] = useState(false);

  useEffect(() => {
    if (campoRef.current) {
      const rect = campoRef.current.getBoundingClientRect();
      setCampoDim({ width: rect.width, height: rect.height });
    }
  }, []);

  useEffect(() => {
    const savedLayouts = JSON.parse(localStorage.getItem("ffd_layouts") || "{}");
    const key = `${modalidad}_${sistema}`;
    if (savedLayouts[key]) setLayout(savedLayouts[key]);
  }, [modalidad, sistema]);

  useEffect(() => {
    const savedLayouts = JSON.parse(localStorage.getItem("ffd_layouts") || "{}");
    const key = `${modalidad}_${sistema}`;
    savedLayouts[key] = layout;
    localStorage.setItem("ffd_layouts", JSON.stringify(savedLayouts));
    onLayoutChange?.(layout);
  }, [layout]);

  const handleMouseDown = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = campoRef.current.getBoundingClientRect();
    const currentPos = layout[id] || getBasePosition(id);
    setOffset({
      x: e.clientX - rect.left - currentPos.x,
      y: e.clientY - rect.top - currentPos.y,
    });
    setDragging(id);
  };

  const handleMouseMove = (e) => {
    if (!dragging || !campoRef.current) return;
    const rect = campoRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left - offset.x;
    let y = e.clientY - rect.top - offset.y;
    
    if (invertido) {
      x = rect.width - x;
    }
    
    setLayout((prev) => ({
      ...prev,
      [dragging]: {
        x: Math.max(0, Math.min(rect.width, x)),
        y: Math.max(0, Math.min(rect.height, y)),
      },
    }));
  };

  const handleMouseUp = () => setDragging(null);

const getBasePosition = (id) => {
  const w = campoDim.width;
  const h = campoDim.height;
  
  // Esquemas según sistema
  const esquemas = {
    // ========== FÚTBOL 11 ==========
    '4-3-3': [
      { x: 0.1 * w, y: 0.5 * h },   // 0: Portero
      { x: 0.25 * w, y: 0.15 * h }, // 1: Lateral derecho
      { x: 0.25 * w, y: 0.38 * h }, // 2: Central derecho
      { x: 0.25 * w, y: 0.62 * h }, // 3: Central izquierdo
      { x: 0.25 * w, y: 0.85 * h }, // 4: Lateral izquierdo
      { x: 0.5 * w, y: 0.3 * h },   // 5: Medio derecho
      { x: 0.5 * w, y: 0.5 * h },   // 6: Medio centro
      { x: 0.5 * w, y: 0.7 * h },   // 7: Medio izquierdo
      { x: 0.75 * w, y: 0.25 * h }, // 8: Extremo derecho
      { x: 0.75 * w, y: 0.5 * h },  // 9: Delantero centro
      { x: 0.75 * w, y: 0.75 * h }, // 10: Extremo izquierdo
    ],
    '4-4-2': [
      { x: 0.1 * w, y: 0.5 * h },
      { x: 0.25 * w, y: 0.15 * h },
      { x: 0.25 * w, y: 0.38 * h },
      { x: 0.25 * w, y: 0.62 * h },
      { x: 0.25 * w, y: 0.85 * h },
      { x: 0.5 * w, y: 0.2 * h },
      { x: 0.5 * w, y: 0.4 * h },
      { x: 0.5 * w, y: 0.6 * h },
      { x: 0.5 * w, y: 0.8 * h },
      { x: 0.75 * w, y: 0.4 * h },
      { x: 0.75 * w, y: 0.6 * h },
    ],
    '4-2-3-1': [
      { x: 0.1 * w, y: 0.5 * h },
      { x: 0.25 * w, y: 0.15 * h },
      { x: 0.25 * w, y: 0.38 * h },
      { x: 0.25 * w, y: 0.62 * h },
      { x: 0.25 * w, y: 0.85 * h },
      { x: 0.45 * w, y: 0.35 * h },
      { x: 0.45 * w, y: 0.65 * h },
      { x: 0.6 * w, y: 0.25 * h },
      { x: 0.6 * w, y: 0.5 * h },
      { x: 0.6 * w, y: 0.75 * h },
      { x: 0.8 * w, y: 0.5 * h },
    ],
    '3-5-2': [
      { x: 0.1 * w, y: 0.5 * h },
      { x: 0.25 * w, y: 0.25 * h },
      { x: 0.25 * w, y: 0.5 * h },
      { x: 0.25 * w, y: 0.75 * h },
      { x: 0.5 * w, y: 0.15 * h },
      { x: 0.5 * w, y: 0.35 * h },
      { x: 0.5 * w, y: 0.5 * h },
      { x: 0.5 * w, y: 0.65 * h },
      { x: 0.5 * w, y: 0.85 * h },
      { x: 0.75 * w, y: 0.4 * h },
      { x: 0.75 * w, y: 0.6 * h },
    ],
    '3-4-3': [
      { x: 0.1 * w, y: 0.5 * h },
      { x: 0.25 * w, y: 0.25 * h },
      { x: 0.25 * w, y: 0.5 * h },
      { x: 0.25 * w, y: 0.75 * h },
      { x: 0.5 * w, y: 0.2 * h },
      { x: 0.5 * w, y: 0.4 * h },
      { x: 0.5 * w, y: 0.6 * h },
      { x: 0.5 * w, y: 0.8 * h },
      { x: 0.75 * w, y: 0.25 * h },
      { x: 0.75 * w, y: 0.5 * h },
      { x: 0.75 * w, y: 0.75 * h },
    ],
    '5-3-2': [
      { x: 0.1 * w, y: 0.5 * h },
      { x: 0.25 * w, y: 0.1 * h },
      { x: 0.25 * w, y: 0.3 * h },
      { x: 0.25 * w, y: 0.5 * h },
      { x: 0.25 * w, y: 0.7 * h },
      { x: 0.25 * w, y: 0.9 * h },
      { x: 0.5 * w, y: 0.3 * h },
      { x: 0.5 * w, y: 0.5 * h },
      { x: 0.5 * w, y: 0.7 * h },
      { x: 0.75 * w, y: 0.4 * h },
      { x: 0.75 * w, y: 0.6 * h },
    ],
    
    // ========== FÚTBOL 9 ==========
    '4-3-1': [
      { x: 0.1 * w, y: 0.5 * h },   // Portero
      { x: 0.28 * w, y: 0.2 * h },  // Defensa derecho
      { x: 0.28 * w, y: 0.42 * h }, // Central derecho
      { x: 0.28 * w, y: 0.58 * h }, // Central izquierdo
      { x: 0.28 * w, y: 0.8 * h },  // Defensa izquierdo
      { x: 0.55 * w, y: 0.3 * h },  // Medio derecho
      { x: 0.55 * w, y: 0.5 * h },  // Medio centro
      { x: 0.55 * w, y: 0.7 * h },  // Medio izquierdo
      { x: 0.8 * w, y: 0.5 * h },   // Delantero
    ],
    '3-4-1': [
      { x: 0.1 * w, y: 0.5 * h },
      { x: 0.28 * w, y: 0.25 * h },
      { x: 0.28 * w, y: 0.5 * h },
      { x: 0.28 * w, y: 0.75 * h },
      { x: 0.55 * w, y: 0.2 * h },
      { x: 0.55 * w, y: 0.4 * h },
      { x: 0.55 * w, y: 0.6 * h },
      { x: 0.55 * w, y: 0.8 * h },
      { x: 0.8 * w, y: 0.5 * h },
    ],
    '3-3-2': [
      { x: 0.1 * w, y: 0.5 * h },
      { x: 0.28 * w, y: 0.25 * h },
      { x: 0.28 * w, y: 0.5 * h },
      { x: 0.28 * w, y: 0.75 * h },
      { x: 0.55 * w, y: 0.3 * h },
      { x: 0.55 * w, y: 0.5 * h },
      { x: 0.55 * w, y: 0.7 * h },
      { x: 0.8 * w, y: 0.4 * h },
      { x: 0.8 * w, y: 0.6 * h },
    ],
    
    // ========== FÚTBOL 8 ==========
    '4-2-1': [
      { x: 0.1 * w, y: 0.5 * h },   // Portero
      { x: 0.3 * w, y: 0.2 * h },   // Defensa 1
      { x: 0.3 * w, y: 0.4 * h },   // Defensa 2
      { x: 0.3 * w, y: 0.6 * h },   // Defensa 3
      { x: 0.3 * w, y: 0.8 * h },   // Defensa 4
      { x: 0.58 * w, y: 0.4 * h },  // Medio derecho
      { x: 0.58 * w, y: 0.6 * h },  // Medio izquierdo
      { x: 0.82 * w, y: 0.5 * h },  // Delantero
    ],
    '3-3-1': [
      { x: 0.1 * w, y: 0.5 * h },   // Portero
      { x: 0.3 * w, y: 0.25 * h },  // Defensa derecho
      { x: 0.3 * w, y: 0.5 * h },   // Central
      { x: 0.3 * w, y: 0.75 * h },  // Defensa izquierdo
      { x: 0.58 * w, y: 0.3 * h },  // Medio derecho
      { x: 0.58 * w, y: 0.5 * h },  // Medio centro
      { x: 0.58 * w, y: 0.7 * h },  // Medio izquierdo
      { x: 0.82 * w, y: 0.5 * h },  // Delantero
    ],
    '3-2-2': [
      { x: 0.1 * w, y: 0.5 * h },
      { x: 0.3 * w, y: 0.25 * h },
      { x: 0.3 * w, y: 0.5 * h },
      { x: 0.3 * w, y: 0.75 * h },
      { x: 0.58 * w, y: 0.35 * h },
      { x: 0.58 * w, y: 0.65 * h },
      { x: 0.82 * w, y: 0.4 * h },
      { x: 0.82 * w, y: 0.6 * h },
    ],
    '3-1-3': [
      { x: 0.1 * w, y: 0.5 * h },   // Portero
      { x: 0.3 * w, y: 0.25 * h },  // Defensa derecho
      { x: 0.3 * w, y: 0.5 * h },   // Central
      { x: 0.3 * w, y: 0.75 * h },  // Defensa izquierdo
      { x: 0.58 * w, y: 0.5 * h },  // Medio centro
      { x: 0.82 * w, y: 0.25 * h }, // Delantero derecho
      { x: 0.82 * w, y: 0.5 * h },  // Delantero centro
      { x: 0.82 * w, y: 0.75 * h }, // Delantero izquierdo
    ],
    '2-4-1': [
      { x: 0.1 * w, y: 0.5 * h },
      { x: 0.3 * w, y: 0.35 * h },
      { x: 0.3 * w, y: 0.65 * h },
      { x: 0.58 * w, y: 0.2 * h },
      { x: 0.58 * w, y: 0.4 * h },
      { x: 0.58 * w, y: 0.6 * h },
      { x: 0.58 * w, y: 0.8 * h },
      { x: 0.82 * w, y: 0.5 * h },
    ],
    
    // ========== FÚTBOL 7 ==========
    '3-2-1': [
      { x: 0.1 * w, y: 0.5 * h },   // Portero
      { x: 0.32 * w, y: 0.25 * h }, // Defensa derecho
      { x: 0.32 * w, y: 0.5 * h },  // Central
      { x: 0.32 * w, y: 0.75 * h }, // Defensa izquierdo
      { x: 0.6 * w, y: 0.35 * h },  // Medio derecho
      { x: 0.6 * w, y: 0.65 * h },  // Medio izquierdo
      { x: 0.83 * w, y: 0.5 * h },  // Delantero
    ],
    '2-3-1': [
      { x: 0.1 * w, y: 0.5 * h },
      { x: 0.32 * w, y: 0.35 * h },
      { x: 0.32 * w, y: 0.65 * h },
      { x: 0.6 * w, y: 0.25 * h },
      { x: 0.6 * w, y: 0.5 * h },
      { x: 0.6 * w, y: 0.75 * h },
      { x: 0.83 * w, y: 0.5 * h },
    ],
    '2-2-2': [
      { x: 0.1 * w, y: 0.5 * h },
      { x: 0.32 * w, y: 0.35 * h },
      { x: 0.32 * w, y: 0.65 * h },
      { x: 0.6 * w, y: 0.35 * h },
      { x: 0.6 * w, y: 0.65 * h },
      { x: 0.83 * w, y: 0.4 * h },
      { x: 0.83 * w, y: 0.6 * h },
    ],
    '3-1-2': [
      { x: 0.1 * w, y: 0.5 * h },   // Portero
      { x: 0.32 * w, y: 0.25 * h }, // Defensa derecho
      { x: 0.32 * w, y: 0.5 * h },  // Central
      { x: 0.32 * w, y: 0.75 * h }, // Defensa izquierdo
      { x: 0.6 * w, y: 0.5 * h },   // Medio centro
      { x: 0.83 * w, y: 0.4 * h },  // Delantero derecho
      { x: 0.83 * w, y: 0.6 * h },  // Delantero izquierdo
    ],
    
    // ========== FÚTBOL 5 ==========
    '2-1-1': [
      { x: 0.12 * w, y: 0.5 * h },  // Portero
      { x: 0.35 * w, y: 0.35 * h }, // Defensa derecho
      { x: 0.35 * w, y: 0.65 * h }, // Defensa izquierdo
      { x: 0.62 * w, y: 0.5 * h },  // Medio
      { x: 0.85 * w, y: 0.5 * h },  // Delantero
    ],
    '1-2-1': [
      { x: 0.12 * w, y: 0.5 * h },
      { x: 0.35 * w, y: 0.5 * h },
      { x: 0.62 * w, y: 0.35 * h },
      { x: 0.62 * w, y: 0.65 * h },
      { x: 0.85 * w, y: 0.5 * h },
    ],
    '1-1-2': [
      { x: 0.12 * w, y: 0.5 * h },
      { x: 0.35 * w, y: 0.5 * h },
      { x: 0.62 * w, y: 0.5 * h },
      { x: 0.85 * w, y: 0.4 * h },
      { x: 0.85 * w, y: 0.6 * h },
    ],
    '3-1-0': [
      { x: 0.12 * w, y: 0.5 * h },  // Portero
      { x: 0.35 * w, y: 0.25 * h }, // Defensa derecho
      { x: 0.35 * w, y: 0.5 * h },  // Central
      { x: 0.35 * w, y: 0.75 * h }, // Defensa izquierdo
      { x: 0.7 * w, y: 0.5 * h },   // Medio (sin delantero puro)
    ],
  };
  
  const posiciones = esquemas[sistema] || esquemas['4-3-3'];
  return posiciones[id] || { x: w / 2, y: h / 2 };
};
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Campograma – {modalidad} ({sistema})
        </h2>
        <button
          onClick={() => setInvertido(!invertido)}
          className="bg-yellow-500 text-black px-3 py-2 rounded text-sm font-semibold"
        >
          🔄 {invertido ? 'Atacar →' : 'Atacar ←'}
        </button>
      </div>

      <div
        ref={campoRef}
        className="relative w-full bg-green-700 rounded-lg border-4 border-white"
        style={{ aspectRatio: '3/4', touchAction: 'none' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Líneas del campo */}
<svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
  {/* Línea de medio campo */}
  <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="2" opacity="0.6" />
  
  {/* Círculo central */}
  <circle cx="50%" cy="50%" r="12%" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
  <circle cx="50%" cy="50%" r="1%" fill="white" opacity="0.6" />
  
  {/* Área grande izquierda */}
  <rect x="0" y="25%" width="18%" height="50%" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
  
  {/* Área pequeña izquierda */}
  <rect x="0" y="37%" width="8%" height="26%" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
  
  {/* Portería izquierda */}
  <rect x="0" y="44%" width="2%" height="12%" fill="none" stroke="white" strokeWidth="3" opacity="0.8" />
  
  {/* Área grande derecha */}
  <rect x="82%" y="25%" width="18%" height="50%" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
  
  {/* Área pequeña derecha */}
  <rect x="92%" y="37%" width="8%" height="26%" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
  
  {/* Portería derecha */}
  <rect x="98%" y="44%" width="2%" height="12%" fill="none" stroke="white" strokeWidth="3" opacity="0.8" />
  
  {/* Punto de penalti izquierdo */}
  <circle cx="12%" cy="50%" r="1%" fill="white" opacity="0.6" />
  
  {/* Punto de penalti derecho */}
  <circle cx="88%" cy="50%" r="1%" fill="white" opacity="0.6" />
</svg>

        {/* Jugadores */}
        {jugadores.map((player, idx) => {
          const pos = layout[player.id] || getBasePosition(idx);
          const flippedX = invertido ? campoDim.width - pos.x : pos.x;

          return (
            <div
              key={player.id}
              onMouseDown={(e) => handleMouseDown(player.id, e)}
              className="absolute flex flex-col items-center text-xs select-none"
              style={{
                left: flippedX,
                top: pos.y,
                transform: "translate(-50%, -50%)",
                cursor: dragging === player.id ? "grabbing" : "grab",
                pointerEvents: "auto",
                zIndex: 10,
              }}
            >
              <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center border-2 border-black shadow-lg font-bold">
                {player.dorsal}
              </div>
              <span className="text-white text-[11px] mt-1 font-semibold drop-shadow-md bg-black bg-opacity-50 px-1 rounded">
                {player.nombre}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Campograma;