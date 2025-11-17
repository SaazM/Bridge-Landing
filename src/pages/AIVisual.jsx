import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Brain } from "lucide-react";

export default function AIVisualPage() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const nodesRef = useRef([]);
  const linesRef = useRef([]);
  const pointCloudRef = useRef(null);
  
  const [analysisStep, setAnalysisStep] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [rightTypingText, setRightTypingText] = useState("");

  const analysisSteps = [
    { 
      text: "Analyzing GitHub repo...", 
      skills: [],
      code: [
        "// src/api/users.js",
        "const fetchUsers = async () => {",
        "  const response = await fetch(",
        "    '/api/users'",
        "  );",
        "  return response.json();",
        "}"
      ]
    },
    { 
      text: "Extracted skills:", 
      skills: ["async workflows", "REST APIs", "React hooks"],
      code: [
        "// components/UserList.jsx",
        "const UserList = () => {",
        "  const [users, setUsers] = useState([]);",
        "  useEffect(() => {",
        "    fetchUsers().then(setUsers);",
        "  }, []);",
        "}"
      ]
    },
    { 
      text: "Project type:", 
      skills: ["Web app"],
      code: [
        "// server/routes.js",
        "app.get('/api/users', async (req, res) => {",
        "  const users = await db.query(",
        "    'SELECT * FROM users'",
        "  );",
        "  res.json(users);",
        "})"
      ]
    },
    { 
      text: "Proficiency:", 
      skills: ["Intermediate+"],
      code: [
        "// utils/dataProcessor.js",
        "export const processData = (raw) => {",
        "  return raw.map(item => ({",
        "    ...item,",
        "    timestamp: new Date(item.date)",
        "  }));",
        "}"
      ]
    }
  ];

  const understandingSteps = [
    {
      text: "Analyzing project documentation...",
      metrics: ["Problem-solving ability", "Communication & clarity", "Product thinking"]
    },
    {
      text: "Evaluating team collaboration...",
      metrics: ["Leadership & ownership", "Collaboration patterns", "Consistency & growth trajectory"]
    },
    {
      text: "Reviewing case studies...",
      metrics: ["Research & analytical reasoning", "Design & UX intuition", "Problem-solving ability"]
    },
    {
      text: "Assessing portfolio content...",
      metrics: ["Product thinking", "Communication & clarity", "Design & UX intuition"]
    }
  ];

  const skillNodes = [
    { label: "Python", position: { x: -8, y: 5, z: 2 }, connections: [1, 3] },
    { label: "React", position: { x: 8, y: 6, z: -2 }, connections: [2, 4] },
    { label: "APIs", position: { x: 0, y: 8, z: 0 }, connections: [1, 5] },
    { label: "Data Structures", position: { x: -6, y: -4, z: 3 }, connections: [0, 4] },
    { label: "TypeScript", position: { x: 6, y: -3, z: -1 }, connections: [1, 5] },
    { label: "ML Basics", position: { x: 0, y: -6, z: 2 }, connections: [2, 3] }
  ];

  // Typing effect for left card
  useEffect(() => {
    const currentText = analysisSteps[analysisStep].text;
    let currentIndex = 0;
    setTypingText("");

    const typingInterval = setInterval(() => {
      if (currentIndex <= currentText.length) {
        setTypingText(currentText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [analysisStep]);

  // Typing effect for right card
  useEffect(() => {
    const currentText = understandingSteps[analysisStep].text;
    let currentIndex = 0;
    setRightTypingText("");

    const typingInterval = setInterval(() => {
      if (currentIndex <= currentText.length) {
        setRightTypingText(currentText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [analysisStep]);

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

    // Create point cloud background
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;

      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.1, 0.7, 0.5);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const pointCloud = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(pointCloud);
    pointCloudRef.current = pointCloud;

    // Create skill nodes
    const nodes = [];
    const nodeObjects = [];

    skillNodes.forEach((skill, index) => {
      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0x3B82F6,
        transparent: true,
        opacity: 0.95
      });
      const node = new THREE.Mesh(geometry, material);
      node.position.set(skill.position.x, skill.position.y, skill.position.z);

      // Glow effect
      const glowGeometry = new THREE.SphereGeometry(0.8, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x3B82F6,
        transparent: true,
        opacity: 0.15
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      node.add(glow);

      node.userData = {
        originalPos: { ...skill.position },
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
            color: 0x3B82F6,
            transparent: true,
            opacity: 0.25
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
      time += 0.008;

      // Rotate point cloud
      if (pointCloudRef.current) {
        pointCloudRef.current.rotation.y = time * 0.15;
        pointCloudRef.current.rotation.x = time * 0.05;
      }

      // Gentle scene rotation
      scene.rotation.y = Math.sin(time * 0.3) * 0.15;
      scene.rotation.x = Math.cos(time * 0.2) * 0.08;

      // Animate nodes
      nodes.forEach((node, i) => {
        const userData = node.userData;
        
        // Subtle pulsing
        const pulse = 1 + Math.sin(time * 2.5 + userData.pulsePhase) * 0.12;
        node.scale.setScalar(pulse);
        
        // Glow pulsing
        if (userData.glow) {
          userData.glow.scale.setScalar(1 + Math.sin(time * 2.5 + userData.pulsePhase) * 0.25);
          userData.glow.material.opacity = 0.08 + Math.sin(time * 2.5 + userData.pulsePhase) * 0.08;
        }

        // Very gentle floating
        node.position.y = userData.originalPos.y + Math.sin(time + i) * 0.25;
        node.position.x = userData.originalPos.x + Math.cos(time * 0.6 + i) * 0.2;
        node.position.z = userData.originalPos.z + Math.sin(time * 0.4 + i * 0.5) * 0.15;
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

        // Subtle pulse
        line.material.opacity = 0.25 + Math.sin(time * 2) * 0.05;
      });

      renderer.render(scene, camera);
    }
    animate();

    // Analysis step cycle
    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => (prev + 1) % analysisSteps.length);
    }, 3000);

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
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#0B1121] via-[#1a1f35] to-[#1E3A8A] overflow-hidden">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
      }} />

      {/* Ambient glow effects */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#3B82F6]/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#FFFF00]/4 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Left Bubble - AI Code Analysis */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        className="absolute left-4 md:left-12 lg:left-20 top-1/2 -translate-y-1/2 z-20 w-[340px] md:w-[400px]"
      >
        <div className="bg-[#0f1419]/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-lg bg-[#3B82F6]/15 flex items-center justify-center border border-[#3B82F6]/20">
              <Code className="w-4.5 h-4.5 text-[#3B82F6]" />
            </div>
            <h3 className="text-white/90 font-medium text-sm tracking-tight">AI Code Analysis</h3>
          </div>

          {/* Code snippet preview - changes with analysis step */}
          <AnimatePresence mode="wait">
            <motion.div
              key={analysisStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0B1121]/70 rounded-xl p-4 mb-5 font-mono text-[11px] border border-white/5 leading-relaxed"
            >
              {analysisSteps[analysisStep].code.map((line, idx) => {
                const isComment = line.trim().startsWith('//');
                const isKeyword = line.includes('const ') || line.includes('async ') || line.includes('await ') || line.includes('export ') || line.includes('return ') || line.includes('useEffect') || line.includes('useState');
                const isString = line.includes("'") || line.includes('"');
                
                return (
                  <div 
                    key={idx} 
                    className={
                      isComment ? "text-gray-500" :
                      isKeyword ? "text-blue-400" :
                      isString ? "text-emerald-400" :
                      "text-gray-300"
                    }
                  >
                    {line}
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Analysis results with typing effect */}
          <AnimatePresence mode="wait">
            <motion.div
              key={analysisStep}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <div className="text-gray-200 text-[13px] font-normal min-h-[20px]">
                {typingText}
                <span className="inline-block w-0.5 h-4 bg-[#FFFF00] ml-0.5 animate-pulse" />
              </div>
              {analysisSteps[analysisStep].skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {analysisSteps[analysisStep].skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.12, duration: 0.3 }}
                      className="px-2.5 py-1 bg-[#3B82F6]/15 text-[#3B82F6] text-[11px] rounded-md border border-[#3B82F6]/25 font-medium"
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

      {/* Center - 3D Skill Graph with Point Cloud Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full" />
        
        {/* Floating skill labels */}
        {skillNodes.map((skill, i) => (
          <motion.div
            key={skill.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.08, duration: 0.6, ease: "easeOut" }}
            className="absolute pointer-events-none"
            style={{
              left: `${50 + skill.position.x * 2.8}%`,
              top: `${50 - skill.position.y * 2.8}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="bg-[#0f1419]/85 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5 shadow-xl">
              <span className="text-white/90 text-xs font-medium tracking-tight">{skill.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right Bubble - AI Understanding Beyond Code */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        className="absolute right-4 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 z-20 w-[340px] md:w-[400px]"
      >
        <div className="bg-[#0f1419]/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-lg bg-[#FFFF00]/15 flex items-center justify-center border border-[#FFFF00]/20">
              <Brain className="w-4.5 h-4.5 text-[#FFFF00]" />
            </div>
            <h3 className="text-white/90 font-medium text-sm tracking-tight">AI Understanding Beyond Code</h3>
          </div>

          {/* Dynamic typing text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={analysisStep}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <div className="text-gray-200 text-[13px] font-normal min-h-[20px]">
                {rightTypingText}
                <span className="inline-block w-0.5 h-4 bg-[#FFFF00] ml-0.5 animate-pulse" />
              </div>
              
              {/* Dynamic metrics list */}
              <div className="flex flex-wrap gap-2 mt-3">
                {understandingSteps[analysisStep].metrics.map((metric, i) => (
                  <motion.div
                    key={metric}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.12, duration: 0.3 }}
                    className="px-2.5 py-1 bg-[#FFFF00]/15 text-[#FFFF00] text-[11px] rounded-md border border-[#FFFF00]/25 font-medium"
                  >
                    {metric}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Measured from section */}
          <div className="pt-5 mt-5 border-t border-white/10">
            <div className="text-gray-500 text-[11px] font-medium uppercase tracking-wide mb-2">Measured from</div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Project descriptions • Case studies • Documentation • Coursework • Portfolio content • Team projects • Writing samples
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}