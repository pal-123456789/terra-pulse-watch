import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const GlobePoints = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(8000 * 3);
    
    for (let i = 0; i < 8000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 1.05 + Math.random() * 0.05;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.03;
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#00ffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const AnimatedGlobe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.05;
    }
    
    if (glowRef.current) {
      glowRef.current.rotation.y = -state.clock.getElapsedTime() * 0.1;
      const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.05 + 1;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.4}
    >
      <group>
        {/* Main globe */}
        <Sphere ref={meshRef} args={[1, 128, 128]}>
          <MeshDistortMaterial
            color="#0a4d4d"
            attach="material"
            distort={0.15}
            speed={1.5}
            roughness={0.3}
            metalness={0.9}
            emissive="#00ffff"
            emissiveIntensity={0.3}
          />
        </Sphere>
        
        {/* Inner glow */}
        <Sphere args={[1.05, 64, 64]}>
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </Sphere>
        
        {/* Outer glow ring */}
        <Sphere ref={glowRef} args={[1.2, 32, 32]}>
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
        
        {/* Data points */}
        <GlobePoints />
      </group>
    </Float>
  );
};

export const Globe3D = ({ className = "" }: { className?: string }) => {
  return (
    <div 
      className={`w-full h-full ${className}`} 
      style={{ touchAction: 'none', WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <Canvas 
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        onPointerMissed={(e) => e.stopPropagation()}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.5}
        />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} color="#aa00ff" intensity={0.8} />
        <spotLight 
          position={[0, 5, 0]} 
          intensity={0.5} 
          angle={0.3} 
          penumbra={1}
          color="#00ffff"
        />
        <AnimatedGlobe />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2.5}
          maxDistance={6}
          autoRotate
          autoRotateSpeed={0.3}
          enableDamping
          dampingFactor={0.05}
          makeDefault
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
          }}
        />
      </Canvas>
    </div>
  );
};
