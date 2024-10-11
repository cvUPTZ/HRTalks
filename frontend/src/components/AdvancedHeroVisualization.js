import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { noise } from '@chriscourses/perlin-noise';

const AdvancedHeroVisualization = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [springs, api] = useSpring(() => ({
    scale: 1,
    rotation: 0,
    config: config.wobbly,
  }));

  const particles = useMemo(() => {
    return Array.from({ length: 100 }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      radius: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
    }));
  }, [dimensions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawParticle = (particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    };

    const drawConnection = (p1, p2) => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
        ctx.stroke();
      }
    };

    const drawFlowField = () => {
      const resolution = 20;
      const cols = Math.floor(dimensions.width / resolution);
      const rows = Math.floor(dimensions.height / resolution);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const angle = noise(x / 20, y / 20, time / 100) * Math.PI * 2;
          ctx.save();
          ctx.translate(x * resolution, y * resolution);
          ctx.rotate(angle);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(resolution / 2, 0);
          ctx.stroke();
          ctx.restore();
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw flow field
      drawFlowField();

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Apply flow field force
        const angle = noise(particle.x / 200, particle.y / 200, time / 100) * Math.PI * 2;
        particle.vx += Math.cos(angle) * 0.1;
        particle.vy += Math.sin(angle) * 0.1;

        // Apply mouse attraction
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
          particle.vx += dx / distance * 0.5;
          particle.vy += dy / distance * 0.5;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check
        if (particle.x < 0 || particle.x > dimensions.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > dimensions.height) particle.vy *= -1;

        drawParticle(particle);

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          drawConnection(particle, particles[j]);
        }
      });

      time += 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, mousePos, particles]);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    api.start({ scale: 1.2, rotation: e.clientX / dimensions.width * 360 });
  };

  const handleMouseLeave = () => {
    api.start({ scale: 1, rotation: 0 });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ position: 'absolute', top: 0, left: 0 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      <animated.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: springs.scale.to(s => `translate(-50%, -50%) scale(${s}) rotate(${springs.rotation.to(r => r)}deg)`),
          color: 'white',
          fontSize: '2rem',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        #HRtalksDZ
      </animated.div>
    </div>
  );
};

export default AdvancedHeroVisualization;