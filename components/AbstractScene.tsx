import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Define R3F intrinsic elements as constants to bypass JSX namespace errors
// DO NOT add any new files, classes, or namespaces.
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const BoxGeometry = 'boxGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const Color = 'color' as any;
const AmbientLight = 'ambientLight' as any;
const SpotLight = 'spotLight' as any;
const PointLight = 'pointLight' as any;

const GoldenKeyPiece = ({ position, rotationSpeed = 1, scale = 1 }: { position: [number, number, number], rotationSpeed?: number, scale?: number }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.y = t * 0.2 * rotationSpeed;
      ref.current.rotation.x = t * 0.1 * rotationSpeed;
      ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    /* Fix: Property 'group' does not exist on type 'JSX.IntrinsicElements' */
    <Group ref={ref} position={position} scale={scale}>
      {/* Elemento Geométrico Abstrato (A Peça) */}
      {/* Fix: Property 'mesh' does not exist on type 'JSX.IntrinsicElements' */}
      <Mesh>
        {/* Fix: Property 'boxGeometry' does not exist on type 'JSX.IntrinsicElements' */}
        <BoxGeometry args={[1, 1, 1]} />
        {/* Fix: Property 'meshStandardMaterial' does not exist on type 'JSX.IntrinsicElements' */}
        <MeshStandardMaterial 
          color="#800020" 
          metalness={0.9} 
          roughness={0.1} 
          emissive="#800020"
          emissiveIntensity={0.1}
        />
      </Mesh>
      <Torus args={[0.8, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
         {/* Fix: Property 'meshStandardMaterial' does not exist on type 'JSX.IntrinsicElements' */}
         <MeshStandardMaterial color="#800020" metalness={1} roughness={0.1} />
      </Torus>
    </Group>
  );
};

const AmbientFloatingBits = () => {
    const points = Array.from({ length: 20 }, (_, i) => ({
        pos: [
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        ] as [number, number, number],
        scale: Math.random() * 0.05
    }));

    return (
        <>
            {points.map((p, i) => (
                <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1}>
                    <Sphere position={p.pos} args={[1, 16, 16]} scale={p.scale}>
                        {/* Fix: Property 'meshStandardMaterial' does not exist on type 'JSX.IntrinsicElements' */}
                        <MeshStandardMaterial color="#800020" metalness={1} emissive="#800020" emissiveIntensity={0.2} />
                    </Sphere>
                </Float>
            ))}
        </>
    );
}

export const AbstractScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Fix: Property 'color' does not exist on type 'JSX.IntrinsicElements' */}
        <Color attach="background" args={['#000000']} />
        {/* Fix: Property 'ambientLight' does not exist on type 'JSX.IntrinsicElements' */}
        <AmbientLight intensity={0.5} />
        {/* Fix: Property 'spotLight' does not exist on type 'JSX.IntrinsicElements' */}
        <SpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#800020" />
        {/* Fix: Property 'pointLight' does not exist on type 'JSX.IntrinsicElements' */}
        <PointLight position={[-10, -10, -10]} intensity={0.5} color="#800020" />
        
        <Environment preset="night" />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <GoldenKeyPiece position={[2, 0, 0]} scale={1.5} />
        </Float>

        <AmbientFloatingBits />
      </Canvas>
    </div>
  );
};
