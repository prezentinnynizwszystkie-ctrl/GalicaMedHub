import React, { useRef, useEffect } from 'react';

const MountainPulse: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const lineColor = '#C5A065'; // Gold
    const lineWidth = 1.5;
    const speed = 1.5; // Scroll speed
    const baseLineYRatio = 0.7; // Position from top (0.7 = 70% down)
    
    // State
    let points: { x: number; y: number }[] = [];
    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let baseLineY = 0;
    
    // Generator State
    let tick = 0;
    let nextFeatureTick = 0;
    let currentFeature: 'idle' | 'ekg' | 'mountain' = 'idle';
    let featureProgress = 0;

    // Resize Handler
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      // Handle High DPI displays for crisp lines
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      baseLineY = height * baseLineYRatio;
      
      // Reset points to fill screen initially
      points = [];
      for (let x = 0; x <= width + 100; x += speed) {
        points.push({ x: x, y: baseLineY });
      }
    };

    // Feature Generators
    const getTargetY = () => {
      tick++;
      
      // If we are currently drawing a feature
      if (currentFeature !== 'idle') {
        featureProgress++;
        
        if (currentFeature === 'ekg') {
          // Simple QRS complex simulation
          const progress = featureProgress;
          if (progress < 10) return baseLineY; // P-wave start
          if (progress < 15) return baseLineY - 10; // P-wave up
          if (progress < 20) return baseLineY; // P-wave down
          if (progress < 25) return baseLineY; // segment
          if (progress < 30) return baseLineY + 10; // Q-wave down
          if (progress < 35) return baseLineY - 80; // R-wave up (spike)
          if (progress < 40) return baseLineY + 20; // S-wave down
          if (progress < 45) return baseLineY; // ST segment
          if (progress < 55) return baseLineY - 15; // T-wave
          if (progress < 65) return baseLineY; // End
          
          currentFeature = 'idle'; // Finished
          nextFeatureTick = tick + 100 + Math.random() * 200;
          featureProgress = 0;
          return baseLineY;
        }

        if (currentFeature === 'mountain') {
          // Sine-based mountain shape
          const duration = 150; // Width of mountain
          if (featureProgress > duration) {
            currentFeature = 'idle';
            nextFeatureTick = tick + 100 + Math.random() * 100;
            featureProgress = 0;
            return baseLineY;
          }
          
          // Normalized progress 0 to 1
          const t = featureProgress / duration; 
          // Bell curve ish shape: sin(0..PI)
          const heightMap = Math.sin(t * Math.PI);
          // Add some jaggedness (rocky texture)
          const noise = (Math.random() - 0.5) * 10;
          
          const mountainHeight = 150; // Max height in px
          return baseLineY - (heightMap * mountainHeight) + noise;
        }
      }

      // Idle State logic
      if (tick > nextFeatureTick) {
        // Randomly choose next feature
        currentFeature = Math.random() > 0.5 ? 'ekg' : 'mountain';
        featureProgress = 0;
      }

      // Small noise for "alive" baseline
      return baseLineY + (Math.random() - 0.5) * 2;
    };

    const animate = () => {
      if (!ctx) return;

      // 1. Update State
      // Shift all points left
      for (let i = 0; i < points.length; i++) {
        points[i].x -= speed;
      }

      // Remove off-screen points
      if (points.length > 0 && points[0].x < -50) {
        points.shift();
      }

      // Add new point at the end
      const lastX = points[points.length - 1].x;
      points.push({ x: lastX + speed, y: getTargetY() });

      // 2. Draw
      ctx.clearRect(0, 0, width, height);

      // Draw Gradient Fill
      ctx.beginPath();
      ctx.moveTo(points[0].x, height); // Start bottom-left
      ctx.lineTo(points[0].x, points[0].y); // To first point
      
      for (let i = 1; i < points.length; i++) {
        // Use quadratic curve for smoother lines, or lineTo for sharp EKG feel.
        // Mixing both is hard, simple lineTo works best for EKG sharpness.
        ctx.lineTo(points[i].x, points[i].y);
      }
      
      ctx.lineTo(points[points.length - 1].x, height); // To bottom-right
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, baseLineY - 100, 0, height);
      gradient.addColorStop(0, 'rgba(197, 160, 101, 0.15)'); // Gold low opacity
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');   // Transparent
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw The Line
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    // Init
    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default MountainPulse;