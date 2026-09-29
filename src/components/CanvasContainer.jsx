import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Center, Float } from '@react-three/drei';

// --- Procedural 3D Robot with Continuous Dancing & Running Animations ---
function ProceduralRobot({ actionState }) {
  const groupRef = useRef();
  const headRef = useRef();
  const bodyRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (actionState === 'typing') {
      // --- TYPING ACTION ---
      if (headRef.current) {
        headRef.current.rotation.x = 0.35;
        headRef.current.rotation.y = Math.sin(t * 6) * 0.1;
      }
      // Fast typing arm motion
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = -1.2 + Math.sin(t * 20) * 0.15;
        leftArmRef.current.rotation.z = 0.2;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -1.2 + Math.cos(t * 20) * 0.15;
        rightArmRef.current.rotation.z = -0.2;
      }
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0;
      if (bodyRef.current) bodyRef.current.position.y = 0.5;

    } else if (actionState === 'submitted') {
      // --- FAST SPRINTING / RUNNING AWAY ACTION ---
      if (groupRef.current) {
        groupRef.current.position.z -= delta * 10; // Rapid sprint into the distance
        groupRef.current.rotation.y = Math.PI;    // Turn 180 degrees to run away
        groupRef.current.rotation.x = 0.35;       // Forward athletic lean
      }

      const runSpeed = 24; // High frequency stride
      if (leftLegRef.current) leftLegRef.current.rotation.x = Math.sin(t * runSpeed) * 1.3;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -Math.sin(t * runSpeed) * 1.3;

      if (leftArmRef.current) leftArmRef.current.rotation.x = -Math.sin(t * runSpeed) * 1.3;
      if (rightArmRef.current) rightArmRef.current.rotation.x = Math.sin(t * runSpeed) * 1.3;

      // Sprinting bounce height
      if (bodyRef.current) bodyRef.current.position.y = 0.5 + Math.abs(Math.sin(t * runSpeed)) * 0.18;

    } else {
      // --- DANCING ACTION (Default State) ---
      const danceSpeed = 5;

      if (groupRef.current) {
        // Hip-sway and side-to-side body dance motion
        groupRef.current.position.x = Math.sin(t * danceSpeed) * 0.35;
        groupRef.current.rotation.y = Math.sin(t * (danceSpeed * 0.5)) * 0.3;
        groupRef.current.rotation.x = 0;
      }

      // Vertical rhythmic bounce
      if (bodyRef.current) {
        bodyRef.current.position.y = 0.5 + Math.abs(Math.sin(t * danceSpeed)) * 0.12;
      }

      // Head bopping along with the music rhythm
      if (headRef.current) {
        headRef.current.rotation.x = Math.sin(t * danceSpeed * 2) * 0.15;
        headRef.current.rotation.z = -Math.sin(t * danceSpeed) * 0.12;
      }

      // Dynamic arm dance waves & raising movements
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = Math.sin(t * danceSpeed) * 0.8 - 0.4;
        leftArmRef.current.rotation.z = Math.cos(t * danceSpeed) * 0.4 + 0.3;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -Math.sin(t * danceSpeed) * 0.8 - 0.4;
        rightArmRef.current.rotation.z = -Math.cos(t * danceSpeed) * 0.4 - 0.3;
      }

      // Leg groove / stepping
      if (leftLegRef.current) leftLegRef.current.rotation.x = Math.sin(t * danceSpeed) * 0.4;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -Math.sin(t * danceSpeed) * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Robot Head */}
      <group ref={headRef} position={[0, 1.45, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.7, 0.55, 0.6]} />
          <meshStandardMaterial color="#6366f1" roughness={0.15} metalness={0.85} />
        </mesh>
        {/* Visor & Eyes */}
        <mesh position={[0, 0.05, 0.31]}>
          <planeGeometry args={[0.55, 0.25]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        <mesh position={[-0.15, 0.05, 0.32]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0.15, 0.05, 0.32]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* Robot Torso */}
      <group ref={bodyRef} position={[0, 0.5, 0]}>
        <mesh>
          <cylinderGeometry args={[0.48, 0.38, 1.1, 24]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.15, 0.42]}>
          <circleGeometry args={[0.14, 32]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
      </group>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.65, 0.85, 0]}>
        <mesh position={[0, -0.35, 0]}>
          <capsuleGeometry args={[0.09, 0.65, 8, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.65, 0.85, 0]}>
        <mesh position={[0, -0.35, 0]}>
          <capsuleGeometry args={[0.09, 0.65, 8, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.25, -0.1, 0]}>
        <mesh position={[0, -0.4, 0]}>
          <capsuleGeometry args={[0.1, 0.7, 8, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.25, -0.1, 0]}>
        <mesh position={[0, -0.4, 0]}>
          <capsuleGeometry args={[0.1, 0.7, 8, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// --- GLB Model Loader ---
function LoadedGLBModel({ actionState, onError }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/robot.glb', true, true, (err) => {
    onError();
  });

  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions || names.length === 0) return;

    const runningClip = actions[names.find(n => n.toLowerCase().includes('run'))] || actions[names[0]];
    const danceClip = actions[names.find(n => n.toLowerCase().includes('dance'))] || actions[names[1]] || actions[names[0]];
    const typingClip = actions[names.find(n => n.toLowerCase().includes('type'))] || actions[names[0]];

    if (actionState === 'submitted') {
      runningClip?.reset().fadeIn(0.2).play();
    } else if (actionState === 'typing') {
      typingClip?.reset().fadeIn(0.2).play();
    } else {
      danceClip?.reset().fadeIn(0.2).play();
    }

    return () => {
      Object.values(actions).forEach((a) => a?.fadeOut(0.2));
    };
  }, [actionState, actions, names]);

  useFrame((state, delta) => {
    if (actionState === 'submitted' && group.current) {
      group.current.position.z -= delta * 10;
    }
  });

  return (
    <Center>
      <primitive ref={group} object={scene} scale={1.3} />
    </Center>
  );
}

// --- High Resolution Canvas Container ---
export default function CanvasContainer({ actionState }) {
  const [hasGLBError, setHasGLBError] = useState(false);

  return (
    <div className="canvas-container">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
        }}
        camera={{ position: [0, 1, 4.2], fov: 45 }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={1.2} color="#38bdf8" />
        <pointLight position={[0, -2, 2]} intensity={1.8} color="#a855f7" />

        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.15}>
          <Suspense fallback={<ProceduralRobot actionState={actionState} />}>
            {!hasGLBError ? (
              <LoadedGLBModel actionState={actionState} onError={() => setHasGLBError(true)} />
            ) : (
              <ProceduralRobot actionState={actionState} />
            )}
          </Suspense>
        </Float>
      </Canvas>
    </div>
  );
}