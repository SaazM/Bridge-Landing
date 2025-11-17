import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillMapVisual() {
  const canvasRef = useRef(null);
  const [currentLabel, setCurrentLabel] = useState(null);
  const sceneRef = useRef(null);
  const nodesRef = useRef([]);
  const linesRef = useRef([]);

  const labels = [
    { text: "Python", cluster: 0, position: { x: -30, y: 20 } },
    { text: "React", cluster: 1, position: { x: 30, y: 30 } },
    { text: "SQL", cluster: 2, position: { x: -35, y: -20 } },
    { text: "APIs", cluster: 3, position: { x: 40, y: -10 } },
    { text: "Data Structures", cluster: 4, position: { x: 0, y: 40 } },
    { text: "Machine Learning", cluster: 0, position: { x: -25, y: 25 } },
    { text: "Frontend UI", cluster: 1, position: { x: 35, y: 35 } },
    { text: "Backend Service", cluster: 2, position: { x: -30, y: -25 } },
    { text: "Mobile App", cluster: 3, position: { x: 35, y: -15 } },
    { text: "Capstone", cluster: 4, position: { x: 5, y: 45 } },
    { text: "Hackathon Project", cluster: 1, position: { x: 25, y: 25 } }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 50;

    // Create node clusters
    const clusterCenters = [
      new THREE.Vector3(-15, 10, 0),
      new THREE.Vector3(15, 15, -5),
      new THREE.Vector3(-15, -10, 5),
      new THREE.Vector3(18, -8, 0),
      new THREE.Vector3(0, 20, -3)
    ];

    const nodes = [];
    const nodeObjects = [];
    
    // Create nodes for each cluster
    clusterCenters.forEach((center, clusterIndex) => {
      const nodesInCluster = 12;
      for (let i = 0; i < nodesInCluster; i++) {
        const theta = (i / nodesInCluster) * Math.PI * 2;
        const radius = 3 + Math.random() * 4;
        const phi = Math.random() * Math.PI;
        
        const x = center.x + radius * Math.sin(phi) * Math.cos(theta);
        const y = center.y + radius * Math.sin(phi) * Math.sin(theta);
        const z = center.z + radius * Math.cos(phi);

        const geometry = new THREE.SphereGeometry(0.15, 16, 16);
        const material = new THREE.MeshBasicMaterial({ 
          color: 0x4F8BFF,
          transparent: true,
          opacity: 0.8
        });
        const node = new THREE.Mesh(geometry, material);
        node.position.set(x, y, z);
        
        // Store original position and add velocity for floating
        node.userData = {
          originalPos: new THREE.Vector3(x, y, z),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02
          ),
          cluster: clusterIndex,
          baseScale: 1
        };
        
        scene.add(node);
        nodes.push(node);
        nodeObjects.push(node);
      }
    });

    nodesRef.current = nodeObjects;

    // Create connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x4F8BFF, 
      transparent: true, 
      opacity: 0.15 
    });

    nodes.forEach((node, i) => {
      // Connect to nearby nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = node.position.distanceTo(nodes[j].position);
        if (distance < 8 && Math.random() > 0.7) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            node.position.clone(),
            nodes[j].position.clone()
          ]);
          const line = new THREE.Line(geometry, lineMaterial);
          line.userData = { start: node, end: nodes[j], opacity: 0.15 };
          scene.add(line);
          linesRef.current.push(line);
        }
      }
    });

    // Animation
    let time = 0;
    let activeCluster = -1;

    function animate() {
      requestAnimationFrame(animate);
      time += 0.005;

      // Rotate entire scene slowly
      scene.rotation.y = time * 0.1;
      scene.rotation.x = Math.sin(time * 0.05) * 0.1;

      // Update nodes with subtle floating motion
      nodes.forEach((node) => {
        const userData = node.userData;
        
        // Gentle floating
        node.position.x += userData.velocity.x;
        node.position.y += userData.velocity.y;
        node.position.z += userData.velocity.z;

        // Bounce back toward original position
        const distFromOriginal = node.position.distanceTo(userData.originalPos);
        if (distFromOriginal > 2) {
          node.position.lerp(userData.originalPos, 0.02);
        }

        // Pulse effect for active cluster
        if (userData.cluster === activeCluster) {
          const pulse = 1 + Math.sin(time * 3) * 0.3;
          node.scale.setScalar(pulse);
          node.material.opacity = 0.8 + Math.sin(time * 3) * 0.2;
        } else {
          node.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
          node.material.opacity = 0.8;
        }
      });

      // Update lines
      linesRef.current.forEach((line) => {
        const positions = line.geometry.attributes.position.array;
        positions[0] = line.userData.start.position.x;
        positions[1] = line.userData.start.position.y;
        positions[2] = line.userData.start.position.z;
        positions[3] = line.userData.end.position.x;
        positions[4] = line.userData.end.position.y;
        positions[5] = line.userData.end.position.z;
        line.geometry.attributes.position.needsUpdate = true;

        // Animate line opacity
        const bothInCluster = line.userData.start.userData.cluster === activeCluster || 
                             line.userData.end.userData.cluster === activeCluster;
        const targetOpacity = bothInCluster ? 0.4 : 0.15;
        line.material.opacity += (targetOpacity - line.material.opacity) * 0.1;
      });

      renderer.render(scene, camera);
    }
    animate();

    // Label rotation cycle
    let labelIndex = 0;
    const labelInterval = setInterval(() => {
      activeCluster = labels[labelIndex].cluster;
      setCurrentLabel(labels[labelIndex]);
      labelIndex = (labelIndex + 1) % labels.length;
    }, 2500);

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(labelInterval);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Gradient background with noise */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1121] to-[#111827]">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>

      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Labels */}
      <AnimatePresence mode="wait">
        {currentLabel && (
          <motion.div
            key={currentLabel.text}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="absolute pointer-events-none"
            style={{
              left: `${50 + currentLabel.position.x}%`,
              top: `${50 - currentLabel.position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="bg-[#111827]/80 backdrop-blur-sm border border-[#4F8BFF]/30 rounded-lg px-4 py-2">
              <span className="text-white text-sm font-medium">{currentLabel.text}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at center, transparent 40%, rgba(11, 17, 33, 0.4) 100%)'
      }} />
    </div>
  );
}