import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SkillNetwork({ currentMilestone }) {
  const groupRef = useRef();
  const pointsRef = useRef();
  const linesRef = useRef();

  // Generate skill nodes
  const nodes = useMemo(() => {
    const skillClusters = [
      { center: [-2, 1, 0], skills: ["React", "JavaScript", "TypeScript"] },
      { center: [2, 1, 0], skills: ["Python", "Data Science", "ML"] },
      { center: [0, -1, 2], skills: ["Design", "Figma", "UI/UX"] },
      { center: [0, 0, -2], skills: ["Communication", "Leadership", "Team"] }
    ];

    return skillClusters.flatMap((cluster, clusterIdx) =>
      cluster.skills.map((skill, idx) => ({
        position: new THREE.Vector3(
          cluster.center[0] + (Math.random() - 0.5) * 0.8,
          cluster.center[1] + (Math.random() - 0.5) * 0.8,
          cluster.center[2] + (Math.random() - 0.5) * 0.8
        ),
        cluster: clusterIdx,
        skill,
        id: `${clusterIdx}-${idx}`
      }))
    );
  }, []);

  // Generate connections between nodes
  const connections = useMemo(() => {
    const conns = [];
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach((otherNode) => {
        if (node.cluster === otherNode.cluster || Math.random() > 0.7) {
          conns.push([node.position, otherNode.position]);
        }
      });
    });
    return conns;
  }, [nodes]);

  // Animation
  useFrame((state) => {
    if (groupRef.current && currentMilestone >= 2) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }

    if (pointsRef.current) {
      const visibility = Math.min(currentMilestone / 3, 1);
      pointsRef.current.material.opacity = visibility * 0.8;
    }

    if (linesRef.current) {
      const visibility = currentMilestone >= 2 ? Math.min((currentMilestone - 2) * 2, 1) : 0;
      linesRef.current.material.opacity = visibility * 0.4;
    }
  });

  // Points geometry
  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodes.length * 3);
    const colors = new Float32Array(nodes.length * 3);

    nodes.forEach((node, i) => {
      positions[i * 3] = node.position.x;
      positions[i * 3 + 1] = node.position.y;
      positions[i * 3 + 2] = node.position.z;

      const color = node.cluster === 0 ? new THREE.Color(0xec4899) :
                   node.cluster === 1 ? new THREE.Color(0x38bdf8) :
                   node.cluster === 2 ? new THREE.Color(0x8b5cf6) :
                   new THREE.Color(0x10b981);

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, [nodes]);

  // Lines geometry
  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];

    connections.forEach(([start, end]) => {
      positions.push(start.x, start.y, start.z);
      positions.push(end.x, end.y, end.z);
    });

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [connections]);

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial color={0xec4899} transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}

export default function Viz3D({ currentMilestone }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (prefersReducedMotion) {
    return null; // Will use fallback
  }

  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <SkillNetwork currentMilestone={currentMilestone} />
      </Canvas>
    </div>
  );
}