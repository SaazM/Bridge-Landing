import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Sparkles, TrendingUp } from "lucide-react";

export default function AIAnalysisVisual() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const nodesRef = useRef([]);
  const linesRef = useRef([]);
  
  const [analysisStep, setAnalysisStep] = useState(0);
  const [matchFound, setMatchFound] = useState(false);

  const analysisSteps = [
    { text: "Analyzing GitHub repo...", skills: [] },
    { text: "Extracted skills:", skills: ["async workflows", "REST APIs", "React hooks"] },
    { text: "Project type:", skills: ["Web app"] },
    { text: "Proficiency:", skills: ["Intermediate+"] }
  ];

  const skillNodes = [
    { label: "Python", position: { x: -8, y: 5, z: 2 }, connections: [1, 3] },
    { label: "React", position: { x: 8, y: 6, z: -2 }, connections: [2, 4] },
    { label: "APIs", position: { x: 0, y: 8, z: 0 }, connections: [1, 5] },
    { label: "Data Structures", position: { x: -6, y: -4, z: 3 }, connections: [0, 4] },
    { label: "TypeScript", position: { x: 6, y: -3, z: -1 }, connections: [1, 5] },
    { label: "ML Basics", position: { x: 0, y: -6, z: 2 }, connections: [2, 3] }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(
      50,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 30;

    // Create skill nodes
    const nodes = [];
    const nodeObjects = [];

    skillNodes.forEach((skill, index) => {
      const geometry = new THREE.SphereGeometry(0.4, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0x4F8BFF,
        transparent: true,
        opacity: 0.9
      });
      const node = new THREE.Mesh(geometry, material);
      node.position.set(skill.position.x, skill.position.y, skill.position.z);

      // Glow effect
      const glowGeometry = new THREE.SphereGeometry(0.6, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x4F8BFF,
        transparent: true,
        opacity: 0.2
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      node.add(glow);

      node.userData = {
        originalPos: skill.position,
        pulsePhase: Math.random() * Math.PI * 2,
        baseScale: 1,
        glow: glow
      };

      scene.add(node);
      nodes.push(node);
      nodeObjects.push(node);
    });

    nodesRef.current = nodeObjects;

    // Create connections
    skillNodes.forEach((skill, i) => {
      skill.connections.forEach((targetIndex) => {
        if (targetIndex > i) {
          const points = [
            nodes[i].position.clone(),
            nodes[targetIndex].position.clone()
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({
            color: 0x4F8BFF,
            transparent: true,
            opacity: 0.2
          });
          const line = new THREE.Line(geometry, material);
          line.userData = { start: nodes[i], end: nodes[targetIndex] };
          scene.add(line);
          linesRef.current.push(line);
        }
      });
    });

    // Animation loop
    let time = 0;
    function animate() {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotate scene gently
      scene.rotation.y = Math.sin(time * 0.2) * 0.3;
      scene.rotation.x = Math.cos(time * 0.15) * 0.1;

      // Animate nodes
      nodes.forEach((node, i) => {
        const userData = node.userData;
        
        // Pulsing effect
        const pulse = 1 + Math.sin(time * 2 + userData.pulsePhase) * 0.15;
        node.scale.setScalar(pulse);
        
        // Glow pulsing
        if (userData.glow) {
          userData.glow.scale.setScalar(1 + Math.sin(time * 2 + userData.pulsePhase) * 0.2);
          userData.glow.material.opacity = 0.1 + Math.sin(time * 2 + userData.pulsePhase) * 0.1;
        }

        // Gentle floating
        node.position.y = userData.originalPos.y + Math.sin(time + i) * 0.3;
        node.position.x = userData.originalPos.x + Math.cos(time * 0.7 + i) * 0.2;
      });

      // Update line positions
      linesRef.current.forEach((line) => {
        const positions = line.geometry.attributes.position.array;
        positions[0] = line.userData.start.position.x;
        positions[1] = line.userData.start.position.y;
        positions[2] = line.userData.start.position.z;
        positions[3] = line.userData.end.position.x;
        positions[4] = line.userData.end.position.y;
        positions[5] = line.userData.end.position.z;
        line.geometry.attributes.position.needsUpdate = true;

        // Pulse line opacity
        line.material.opacity = 0.2 + Math.sin(time * 2) * 0.1;
      });

      renderer.render(scene, camera);
    }
    animate();

    // Analysis step cycle
    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => {
        const next = (prev + 1) % analysisSteps.length;
        if (next === 0) setMatchFound(false);
        return next;
      });
    }, 2000);

    // Match found cycle
    const matchInterval = setInterval(() => {
      setMatchFound(true);
      setTimeout(() => setMatchFound(false), 3000);
    }, 8000);

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(stepInterval);
      clearInterval(matchInterval);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#0B1121] via-[#111827] to-[#1E3A8A] overflow-hidden">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
      }} />

      {/* Left Bubble - AI Code Analysis */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-10 w-80 md:w-96"
      >
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-[#4F8BFF]/30 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#4F8BFF]/20 flex items-center justify-center">
              <Code className="w-5 h-5 text-[#4F8BFF]" />
            </div>
            <h3 className="text-white font-semibold text-sm">AI Code Analysis</h3>
          </div>

          {/* Code snippet preview */}
          <div className="bg-[#0B1121]/60 rounded-lg p-4 mb-4 font-mono text-xs border border-[#4F8BFF]/20">
            <div className="text-gray-400 mb-1">// src/api/users.js</div>
            <div className="text-blue-300">const fetchUsers = async () =&gt; {'{'}</div>
            <div className="text-gray-300 ml-4">const response = await fetch(</div>
            <div className="text-green-300 ml-8">'/api/users'</div>
            <div className="text-gray-300 ml-4">);</div>
            <div className="text-blue-300">{'}'}</div>
          </div>

          {/* Analysis results */}
          <AnimatePresence mode="wait">
            <motion.div
              key={analysisStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-2"
            >
              <div className="text-gray-300 text-sm font-medium">
                {analysisSteps[analysisStep].text}
              </div>
              {analysisSteps[analysisStep].skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {analysisSteps[analysisStep].skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-3 py-1 bg-[#4F8BFF]/20 text-[#4F8BFF] text-xs rounded-full border border-[#4F8BFF]/30"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Center - 3D Skill Graph */}
      <div className="absolute inset-0 flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full" />
        
        {/* Floating skill labels */}
        {skillNodes.map((skill, i) => (
          <motion.div
            key={skill.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            className="absolute pointer-events-none"
            style={{
              left: `${50 + skill.position.x * 2.5}%`,
              top: `${50 - skill.position.y * 2.5}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="bg-[#111827]/90 backdrop-blur-sm border border-[#4F8BFF]/40 rounded-lg px-3 py-1.5 shadow-lg">
              <span className="text-white text-xs font-medium">{skill.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right Bubble - AI Role Matching */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-10 w-80 md:w-96"
      >
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-[#FFFF00]/30 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#FFFF00]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#FFFF00]" />
            </div>
            <h3 className="text-white font-semibold text-sm">AI Role Matching</h3>
          </div>

          {/* Job role */}
          <div className="mb-4">
            <div className="text-gray-400 text-xs mb-2">Target Role</div>
            <div className="text-white font-semibold">Full-Stack Intern</div>
          </div>

          {/* Match score */}
          <AnimatePresence mode="wait">
            {matchFound && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                <div className="flex items-end gap-3">
                  <div className="text-5xl font-bold text-[#FFFF00]">89%</div>
                  <div className="text-gray-400 text-sm mb-2">Fit Score</div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#0B1121]/60 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "89%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#4F8BFF] to-[#FFFF00]"
                  />
                </div>

                {/* Reasons */}
                <div className="space-y-2 pt-2">
                  <div className="text-gray-400 text-xs font-medium">Match Reasons:</div>
                  {[
                    "Strong API design",
                    "React fundamentals",
                    "Past project alignment"
                  ].map((reason, i) => (
                    <motion.div
                      key={reason}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFFF00]" />
                      <span className="text-gray-300 text-sm">{reason}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Sparkline */}
                <div className="pt-4">
                  <div className="flex items-end gap-1 h-12">
                    {[40, 55, 60, 72, 68, 85, 89].map((val, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${val}%` }}
                        transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                        className="flex-1 bg-gradient-to-t from-[#4F8BFF] to-[#FFFF00] rounded-t"
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 text-center mt-2">
                    Match confidence over time
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!matchFound && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-8"
            >
              <div className="flex items-center gap-3 text-gray-400">
                <TrendingUp className="w-5 h-5 animate-pulse" />
                <span className="text-sm">Analyzing match...</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4F8BFF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFFF00]/5 rounded-full blur-3xl" />
    </div>
  );
}