import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Orbit, Disc, Dna, Waves, Sparkles } from 'lucide-react';

const SHAPES = [
  { id: 'sphere', name: 'Sphere', icon: Orbit },
  { id: 'saturn', name: 'Saturn', icon: Disc },
  { id: 'dna', name: 'Helix', icon: Dna },
  { id: 'wave', name: 'Wave', icon: Waves },
];

export default function ThreeCanvas() {
  const mountRef = useRef(null);
  const [activeShape, setActiveShape] = useState('sphere');

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const pointsRef = useRef(null);
  const targetPosRef = useRef(null);
  const currentPosRef = useRef(null);
  const colorsRef = useRef(null);
  const mouseRef = useRef({ 
    x: 0, y: 0, targetX: 0, targetY: 0, 
    isDragging: false, lastMouseX: 0, lastMouseY: 0,
    rotX: 0, rotY: 0, rotVelX: 0, rotVelY: 0 
  });
  const animFrameRef = useRef(null);
  const shockwaveRef = useRef(0);

  const PARTICLE_COUNT = 2100;

  // Generate target coordinates for each shape
  const generateShapePositions = useCallback((shapeType) => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      if (shapeType === 'sphere') {
        const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
        const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
        const radius = 2.1 + (Math.random() - 0.5) * 0.35;

        positions[i3] = radius * Math.cos(theta) * Math.sin(phi);
        positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
        positions[i3 + 2] = radius * Math.cos(phi);
      } else if (shapeType === 'saturn') {
        if (i < PARTICLE_COUNT * 0.38) {
          const phi = Math.acos(-1 + (2 * i) / (PARTICLE_COUNT * 0.38));
          const theta = Math.sqrt((PARTICLE_COUNT * 0.38) * Math.PI) * phi;
          const radius = 1.05 + (Math.random() - 0.5) * 0.15;
          positions[i3] = radius * Math.cos(theta) * Math.sin(phi);
          positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
          positions[i3 + 2] = radius * Math.cos(phi);
        } else {
          const angle = Math.random() * Math.PI * 2;
          const ringRad = 1.65 + Math.random() * 1.35;
          const tilt = 0.45;
          const x = ringRad * Math.cos(angle);
          const z = ringRad * Math.sin(angle);
          const y = (Math.random() - 0.5) * 0.06;

          positions[i3] = x;
          positions[i3 + 1] = y * Math.cos(tilt) - z * Math.sin(tilt);
          positions[i3 + 2] = y * Math.sin(tilt) + z * Math.cos(tilt);
        }
      } else if (shapeType === 'dna') {
        const t = (i / PARTICLE_COUNT) * 16 - 8;
        const strand = i % 2 === 0 ? 0 : Math.PI;
        const radius = 1.3;
        const angle = t * 1.45 + strand;

        positions[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.2;
        positions[i3 + 1] = t * 0.44;
        positions[i3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.2;
      } else if (shapeType === 'wave') {
        const gridDim = Math.floor(Math.sqrt(PARTICLE_COUNT));
        const row = Math.floor(i / gridDim);
        const col = i % gridDim;
        const x = (col / gridDim - 0.5) * 5.8;
        const z = (row / gridDim - 0.5) * 5.8;
        const dist = Math.sqrt(x * x + z * z);
        const y = Math.sin(dist * 2.4) * 0.55;

        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;
      }
    }
    return positions;
  }, []);

  const changeShape = (shapeId) => {
    setActiveShape(shapeId);
    targetPosRef.current = generateShapePositions(shapeId);
  };

  const triggerShockwave = () => {
    shockwaveRef.current = 1.0;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // PARTICLE GEOMETRY
    const geometry = new THREE.BufferGeometry();
    const initialPos = generateShapePositions('sphere');
    const positions = new Float32Array(initialPos);
    const targetPos = new Float32Array(initialPos);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    currentPosRef.current = positions;
    targetPosRef.current = targetPos;
    colorsRef.current = colors;

    // Elegant dual gradient: Subtle Gold & Cyan highlights
    const c1 = new THREE.Color('#e2b76e'); // Refined champagne gold
    const c2 = new THREE.Color('#38bdf8'); // Precision cyan
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const ratio = (i % 100) / 100;
      const mixed = c1.clone().lerp(c2, ratio * 0.4);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Glow disc particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.35, 'rgba(255,255,255,0.75)');
    grad.addColorStop(0.75, 'rgba(255,255,255,0.12)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(canvas);

    // MATERIAL
    const material = new THREE.PointsMaterial({
      size: 0.082,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    // ANIMATION LOOP
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Mouse inertia and smooth follow
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.05;
      m.y += (m.targetY - m.y) * 0.05;

      m.rotY += m.rotVelY;
      m.rotX += m.rotVelX;
      m.rotVelX *= 0.94;
      m.rotVelY *= 0.94;

      if (pointsRef.current) {
        pointsRef.current.rotation.y = elapsedTime * 0.1 + m.x * 0.45 + m.rotY;
        pointsRef.current.rotation.x = Math.sin(elapsedTime * 0.07) * 0.15 + m.y * 0.35 + m.rotX;

        const current = currentPosRef.current;
        const target = targetPosRef.current;
        const posAttr = pointsRef.current.geometry.attributes.position;

        if (shockwaveRef.current > 0.001) {
          shockwaveRef.current *= 0.93;
        } else {
          shockwaveRef.current = 0;
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const i3 = i * 3;

          current[i3] += (target[i3] - current[i3]) * 0.065;
          current[i3 + 1] += (target[i3 + 1] - current[i3 + 1]) * 0.065;
          current[i3 + 2] += (target[i3 + 2] - current[i3 + 2]) * 0.065;

          const wave = Math.sin(elapsedTime * 1.4 + i * 0.07) * 0.012;
          current[i3 + 1] += wave;

          if (shockwaveRef.current > 0.01) {
            const mag = Math.sqrt(current[i3] * current[i3] + current[i3 + 1] * current[i3 + 1] + current[i3 + 2] * current[i3 + 2]) || 1;
            current[i3] += (current[i3] / mag) * shockwaveRef.current * 0.35;
            current[i3 + 1] += (current[i3 + 1] / mag) * shockwaveRef.current * 0.35;
            current[i3 + 2] += (current[i3 + 2] / mag) * shockwaveRef.current * 0.35;
          }
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    const handlePointerDown = (e) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.lastMouseX = e.clientX;
      mouseRef.current.lastMouseY = e.clientY;
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;

      if (mouseRef.current.isDragging) {
        const deltaX = e.clientX - mouseRef.current.lastMouseX;
        const deltaY = e.clientY - mouseRef.current.lastMouseY;
        mouseRef.current.rotVelY = deltaX * 0.004;
        mouseRef.current.rotVelX = deltaY * 0.004;
        mouseRef.current.lastMouseX = e.clientX;
        mouseRef.current.lastMouseY = e.clientY;
      }
    };

    const handlePointerUp = () => {
      mouseRef.current.isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [generateShapePositions]);

  return (
    <div
      className="three-canvas-container"
      onClick={triggerShockwave}
      title="Click or drag to interact with the 3D particle simulation"
    >
      <div ref={mountRef} className="three-mount" />

      {/* Minimalist Professional Geometry Switcher */}
      <div className="three-minimal-nav" onClick={(e) => e.stopPropagation()}>
        {SHAPES.map((shape) => {
          const Icon = shape.icon;
          const isActive = activeShape === shape.id;
          return (
            <button
              key={shape.id}
              onClick={() => changeShape(shape.id)}
              className={`three-nav-pill ${isActive ? 'active' : ''}`}
              title={`Morph to ${shape.name}`}
            >
              <Icon size={12} />
              <span>{shape.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
