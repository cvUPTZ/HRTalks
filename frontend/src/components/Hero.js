// import React, { useEffect, useRef, useState, useMemo } from 'react';
// import styled from 'styled-components';
// import { useSpring, animated, config } from 'react-spring';
// import { noise } from '@chriscourses/perlin-noise';
// import podcastAudio from '../assets/Podcast.mp3';

// const HeroWrapper = styled.section`
//   position: relative;
//   width: 100%;
//   height: 100vh;
//   overflow: hidden;
//   background-color: ${props => props.theme.colors.tertiary};
//   color: ${props => props.theme.colors.background};
// `;

// const Canvas = styled.canvas`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// `;

// const ContentWrapper = styled.div`
//   position: relative;
//   z-index: 2;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100%;
//   padding: 2rem;
// `;

// const Title = styled(animated.h1)`
//   font-size: 4rem;
//   font-weight: bold;
//   margin-bottom: 1rem;
//   text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
// `;

// const Subtitle = styled(animated.h2)`
//   font-size: 1.5rem;
//   margin: 1rem 0;
//   color: ${props => props.theme.colors.primary};
//   text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
// `;

// const Button = styled(animated.button)`
//   padding: 1rem 2rem;
//   font-size: 1rem;
//   background-color: ${props => props.theme.colors.primary};
//   color: ${props => props.theme.colors.background};
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-top: 2rem;
//   transition: transform 0.3s ease;

//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// function Hero() {
//   const canvasRef = useRef(null);
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

//   const [titleSpring, titleApi] = useSpring(() => ({
//     opacity: 0,
//     transform: 'translateY(-50px)',
//     config: config.molasses,
//   }));

//   const [subtitleSpring, subtitleApi] = useSpring(() => ({
//     opacity: 0,
//     transform: 'translateY(50px)',
//     config: config.molasses,
//   }));

//   const [buttonSpring, buttonApi] = useSpring(() => ({
//     scale: 1,
//     config: config.wobbly,
//   }));

//   const particles = useMemo(() => {
//     return Array.from({ length: 100 }, () => ({
//       x: Math.random() * dimensions.width,
//       y: Math.random() * dimensions.height,
//       radius: Math.random() * 2 + 1,
//       color: `hsl(${Math.random() * 360}, 70%, 60%)`,
//       vx: Math.random() * 2 - 1,
//       vy: Math.random() * 2 - 1,
//     }));
//   }, [dimensions]);

//   useEffect(() => {
//     titleApi.start({ opacity: 1, transform: 'translateY(0)' });
//     subtitleApi.start({ opacity: 1, transform: 'translateY(0)', delay: 300 });

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let animationFrameId;
//     let time = 0;

//     const resizeCanvas = () => {
//       setDimensions({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener('resize', resizeCanvas);
//     resizeCanvas();

//     const drawParticle = (particle) => {
//       ctx.beginPath();
//       ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
//       ctx.fillStyle = particle.color;
//       ctx.fill();
//     };

//     const drawConnection = (p1, p2) => {
//       const dx = p2.x - p1.x;
//       const dy = p2.y - p1.y;
//       const distance = Math.sqrt(dx * dx + dy * dy);

//       if (distance < 100) {
//         ctx.beginPath();
//         ctx.moveTo(p1.x, p1.y);
//         ctx.lineTo(p2.x, p2.y);
//         ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
//         ctx.stroke();
//       }
//     };

//     const drawFlowField = () => {
//       const resolution = 20;
//       const cols = Math.floor(dimensions.width / resolution);
//       const rows = Math.floor(dimensions.height / resolution);

//       for (let y = 0; y < rows; y++) {
//         for (let x = 0; x < cols; x++) {
//           const angle = noise(x / 20, y / 20, time / 100) * Math.PI * 2;
//           ctx.save();
//           ctx.translate(x * resolution, y * resolution);
//           ctx.rotate(angle);
//           ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
//           ctx.beginPath();
//           ctx.moveTo(0, 0);
//           ctx.lineTo(resolution / 2, 0);
//           ctx.stroke();
//           ctx.restore();
//         }
//       }
//     };

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       drawFlowField();

//       particles.forEach((particle, i) => {
//         const angle = noise(particle.x / 200, particle.y / 200, time / 100) * Math.PI * 2;
//         particle.vx += Math.cos(angle) * 0.1;
//         particle.vy += Math.sin(angle) * 0.1;

//         const dx = mousePos.x - particle.x;
//         const dy = mousePos.y - particle.y;
//         const distance = Math.sqrt(dx * dx + dy * dy);
//         if (distance < 200) {
//           particle.vx += dx / distance * 0.5;
//           particle.vy += dy / distance * 0.5;
//         }

//         particle.x += particle.vx;
//         particle.y += particle.vy;

//         if (particle.x < 0 || particle.x > dimensions.width) particle.vx *= -1;
//         if (particle.y < 0 || particle.y > dimensions.height) particle.vy *= -1;

//         drawParticle(particle);

//         for (let j = i + 1; j < particles.length; j++) {
//           drawConnection(particle, particles[j]);
//         }
//       });

//       time += 1;
//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       window.removeEventListener('resize', resizeCanvas);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [dimensions, mousePos, particles, titleApi, subtitleApi]);

//   const handleMouseMove = (e) => {
//     setMousePos({ x: e.clientX, y: e.clientY });
//   };

//   const handlePlayClick = () => {
//     const audio = audioRef.current;
//     if (!isPlaying) {
//       audio.play().then(() => {
//         setIsPlaying(true);
//         console.log('Audio started playing');
//       }).catch(error => {
//         console.error('Error playing audio:', error);
//       });
//     } else {
//       audio.pause();
//       setIsPlaying(false);
//       console.log('Audio paused');
//     }
//   };

//   return (
//     <HeroWrapper onMouseMove={handleMouseMove}>
//       <Canvas 
//         ref={canvasRef}
//         width={dimensions.width}
//         height={dimensions.height}
//       />
//       <ContentWrapper>
//         <Title style={titleSpring}>#HRtalksDZ</Title>
//         <Subtitle style={subtitleSpring}>
//           Le Podcast dédié aux professionnels RH Algériens
//         </Subtitle>
//         <Button 
//           onClick={handlePlayClick}
//           onMouseEnter={() => buttonApi.start({ scale: 1.1 })}
//           onMouseLeave={() => buttonApi.start({ scale: 1 })}
//           style={buttonSpring}
//         >
//           {isPlaying ? 'Pause' : 'Écoutez maintenant'}
//         </Button>
//       </ContentWrapper>
//       <audio ref={audioRef} src={podcastAudio} />
//     </HeroWrapper>
//   );
// }

// export default Hero;


// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import styled from 'styled-components';
// import { useSpring, animated, config } from 'react-spring';


import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import podcastAudio from '../assets/Podcast.mp3';

const HeroWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 50vh;
  overflow: hidden;
  background-color: ${props => props.theme.colors.tertiary || 'black'}; // Fallback color for debugging
  color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
`;

const Title = styled(animated.h1)`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled(animated.h2)`
  font-size: 1.5rem;
  margin: 1rem 0;
  color: ${props => props.theme.colors.primary};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const Button = styled(animated.button)`
  padding: 1rem 2rem;
  font-size: 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

function Hero() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  const [titleSpring, titleApi] = useSpring(() => ({
    opacity: 0,
    transform: 'translateY(-50px)',
    config: config.molasses,
  }));

  const [subtitleSpring, subtitleApi] = useSpring(() => ({
    opacity: 0,
    transform: 'translateY(50px)',
    config: config.molasses,
  }));

  const [buttonSpring, buttonApi] = useSpring(() => ({
    scale: 1,
    config: config.wobbly,
  }));

  const setupAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
      analyserRef.current.fftSize = 256;
    }
  }, []);
  
  const colors = {
    primary: '#d3100a',
    secondary: '#8b8b8b',
    tertiary: '#363636',
    background: '#000000'
  };

  const draw = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Create an off-screen canvas for the particle system
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;
    const offscreenCtx = offscreenCanvas.getContext('2d');

    // Particle system
    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        color: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.tertiary,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
      });
    }

    const drawFrame = () => {
      animationRef.current = requestAnimationFrame(drawFrame);

      analyserRef.current.getByteFrequencyData(dataArray);

      // Clear both canvases
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, width, height);
      offscreenCtx.clearRect(0, 0, width, height);

      // Draw abstract "HR network" background
      ctx.strokeStyle = `rgba(139, 139, 139, 0.1)`; // Using secondary color
      ctx.lineWidth = 1;
      for (let i = 0; i < bufferLength; i += 4) {
        const x1 = (i / bufferLength) * width;
        const y1 = height - (dataArray[i] / 256) * height;
        const x2 = ((i + 2) / bufferLength) * width;
        const y2 = height - (dataArray[i + 2] / 256) * height;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Update and draw particles
      const avgFrequency = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
      particles.forEach((particle, index) => {
        particle.x += particle.vx * (1 + avgFrequency / 128);
        particle.y += particle.vy * (1 + avgFrequency / 128);

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        offscreenCtx.beginPath();
        offscreenCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        offscreenCtx.fillStyle = particle.color;
        offscreenCtx.fill();

        // Connect particles
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            offscreenCtx.beginPath();
            offscreenCtx.moveTo(particle.x, particle.y);
            offscreenCtx.lineTo(particles[j].x, particles[j].y);
            offscreenCtx.strokeStyle = `rgba(211, 16, 10, ${0.1 - distance / 1000})`; // Using primary color
            offscreenCtx.stroke();
          }
        }
      });

      // Draw flowing "data streams"
      const streamCount = 3;
      const streamColors = [colors.primary, colors.secondary, colors.tertiary];
      for (let i = 0; i < streamCount; i++) {
        const streamY = (height / (streamCount + 1)) * (i + 1);
        ctx.beginPath();
        ctx.moveTo(0, streamY);

        for (let x = 0; x < width; x += 20) {
          const dataIndex = Math.floor((x / width) * bufferLength);
          const y = streamY + (dataArray[dataIndex] / 256) * 50 - 25;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `${streamColors[i]}80`; // 50% opacity
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Combine the main canvas and the particle system
      ctx.globalCompositeOperation = 'lighter';
      ctx.drawImage(offscreenCanvas, 0, 0);
      ctx.globalCompositeOperation = 'source-over';

      // Draw pulsating central "core"
      const coreRadius = 50 + (avgFrequency / 256) * 30;
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, coreRadius);
      gradient.addColorStop(0, `${colors.primary}cc`); // 80% opacity
      gradient.addColorStop(1, `${colors.primary}00`); // 0% opacity

      ctx.beginPath();
      ctx.arc(width/2, height/2, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    drawFrame();
  }, [colors]);

  useEffect(() => {
    titleApi.start({ opacity: 1, transform: 'translateY(0)' });
    subtitleApi.start({ opacity: 1, transform: 'translateY(0)', delay: 300 });

    const resizeCanvas = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [titleApi, subtitleApi]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
    }
  }, [dimensions]);

  const handlePlayClick = () => {
    if (!audioContextRef.current) {
      setupAudio();
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const audio = audioRef.current;
    if (!isPlaying) {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          draw();
          console.log('Audio started playing');
        })
        .catch((error) => {
          console.error('Error playing audio:', error);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      console.log('Audio paused');
    }
  };
  return (
    <HeroWrapper style={{ backgroundColor: colors.background }}>
      <Canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
      />
      <ContentWrapper>
        <Title style={{ ...titleSpring, color: colors.primary }}>#HRtalksDZ</Title>
        <Subtitle style={{ ...subtitleSpring, color: colors.secondary }}>
          Le Podcast dédié aux professionnels RH Algériens
        </Subtitle>
        <Button
          onClick={handlePlayClick}
          onMouseEnter={() => buttonApi.start({ scale: 1.1 })}
          onMouseLeave={() => buttonApi.start({ scale: 1 })}
          style={{ ...buttonSpring, backgroundColor: colors.primary, color: colors.background }}
        >
          {isPlaying ? 'Pause' : 'Écoutez maintenant'}
        </Button>
      </ContentWrapper>
      <audio ref={audioRef} src={podcastAudio} />
    </HeroWrapper>
  );
}

export default Hero;