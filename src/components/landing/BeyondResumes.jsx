import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { Code, Brain } from "lucide-react";

export default function BeyondResumes() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const nodesRef = useRef([]);
  const graphGroupRef = useRef(null);
  const cardConnectionsRef = useRef([]);
  const visibleNodesRef = useRef(new Set());
  const sectionRef = useRef(null);
  const animationStartedRef = useRef(false);
  const animationStepRef = useRef(0); // Changed: Renamed from internalAnimationStepRef to animationStepRef

  const [analysisStep, setAnalysisStep] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [rightTypingText, setRightTypingText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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
    "}"],

    connectedNodes: [0, 1, 2]
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
    "}"],

    connectedNodes: [1, 2, 4]
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
    "})"],

    connectedNodes: [0, 2, 3]
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
    "}"],

    connectedNodes: [3, 4, 5]
  }];


  const understandingSteps = [
  {
    text: "Analyzing project documentation...",
    metrics: ["Problem-solving ability", "Communication & clarity", "Product thinking"],
    connectedNodes: [8, 7, 10]
  },
  {
    text: "Evaluating team collaboration...",
    metrics: ["Leadership & ownership", "Collaboration patterns", "Consistency & growth trajectory"],
    connectedNodes: [6, 9, 15]
  },
  {
    text: "Reviewing case studies...",
    metrics: ["Research & analytical reasoning", "Design & UX intuition", "Problem-solving ability"],
    connectedNodes: [11, 14, 8]
  },
  {
    text: "Assessing portfolio content...",
    metrics: ["Product thinking", "Communication & clarity", "Design & UX intuition"],
    connectedNodes: [10, 7, 13]
  }];


  const skillNodes = [
  { label: "Python", type: "technical", position: { x: -10, y: 8, z: 3 } },
  { label: "React", type: "technical", position: { x: 10, y: 8, z: -3 } },
  { label: "APIs", type: "technical", position: { x: 0, y: 10, z: 0 } },
  { label: "Data Structures", type: "technical", position: { x: -8, y: 0, z: 5 } },
  { label: "TypeScript", type: "technical", position: { x: 8, y: 0, z: -5 } },
  { label: "ML", type: "technical", position: { x: -5, y: -8, z: 2 } },
  { label: "Leadership", type: "soft", position: { x: -10, y: -3, z: -4 } },
  { label: "Communication", type: "soft", position: { x: 10, y: -3, z: 4 } },
  { label: "Problem Solving", type: "soft", position: { x: 0, y: 5, z: 8 } },
  { label: "Collaboration", type: "soft", position: { x: -5, y: -5, z: -8 } },
  { label: "Product Thinking", type: "soft", position: { x: 5, y: -5, z: 8 } },
  { label: "Research", type: "soft", position: { x: 0, y: -10, z: 0 } },
  { label: "Ownership", type: "soft", position: { x: -8, y: 3, z: -6 } },
  { label: "Design Intuition", type: "soft", position: { x: 8, y: 3, z: 6 } },
  { label: "Analytical Reasoning", type: "soft", position: { x: 3, y: 8, z: -5 } },
  { label: "Growth Mindset", type: "soft", position: { x: -3, y: -8, z: -5 } }];


  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationStartedRef.current) {
            setIsVisible(true);
            animationStartedRef.current = true;
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Typing effect for left card
  useEffect(() => {
    if (!isVisible) return;

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
  }, [analysisStep, isVisible]);

  // Typing effect for right card
  useEffect(() => {
    if (!isVisible) return;

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
  }, [analysisStep, isVisible]);

  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;

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
    camera.position.z = 35;

    const graphGroup = new THREE.Group();
    scene.add(graphGroup);
    graphGroupRef.current = graphGroup;

    const nodes = [];
    const nodeObjects = [];

    skillNodes.forEach((skill, index) => {
      const isTechnical = skill.type === "technical";
      const geometry = new THREE.SphereGeometry(0.6, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: isTechnical ? 0x3B82F6 : 0xFFFF00,
        transparent: true,
        opacity: 0
      });
      const node = new THREE.Mesh(geometry, material);
      node.position.set(skill.position.x, skill.position.y, skill.position.z);

      const glowGeometry = new THREE.SphereGeometry(0.9, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: isTechnical ? 0x3B82F6 : 0xFFFF00,
        transparent: true,
        opacity: 0
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      node.add(glow);

      node.userData = {
        originalPos: { ...skill.position },
        pulsePhase: Math.random() * Math.PI * 2,
        baseScale: 0,
        targetScale: 0,
        glow: glow,
        type: skill.type,
        index: index,
        baseColor: isTechnical ? 0x3B82F6 : 0xFFFF00
      };

      graphGroup.add(node);
      nodes.push(node);
      nodeObjects.push(node);
    });

    nodesRef.current = nodeObjects;

    function showNodes(nodeIndices) {
      nodeIndices.forEach((index) => {
        if (!visibleNodesRef.current.has(index) && nodes[index]) {
          visibleNodesRef.current.add(index);
          nodes[index].userData.targetScale = 1;
        }
      });
    }

    function hideAllNodes() {
      visibleNodesRef.current.clear();
      nodes.forEach((node) => {
        node.userData.targetScale = 0;
      });
    }

    function updateCardConnections(step) {
      cardConnectionsRef.current.forEach((line) => scene.remove(line));
      cardConnectionsRef.current = [];

      const canvas = canvasRef.current;
      if (!canvas) return;

      const leftCardPos = new THREE.Vector3(-18, 12, 0);
      const rightCardPos = new THREE.Vector3(18, -12, 0);

      const leftNodes = analysisSteps[step].connectedNodes;
      const rightNodes = understandingSteps[step].connectedNodes;
      showNodes([...leftNodes, ...rightNodes]);

      leftNodes.forEach((nodeIndex) => {
        const node = nodes[nodeIndex];
        if (!node) return;

        const worldPos = new THREE.Vector3();
        node.getWorldPosition(worldPos);

        const points = [worldPos.clone(), leftCardPos];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: 0x3B82F6,
          transparent: true,
          opacity: 0,
          linewidth: 2
        });
        const line = new THREE.Line(geometry, material);
        line.userData = { node: node, cardPos: leftCardPos, type: 'left', targetOpacity: 0.5, currentOpacity: 0 };
        scene.add(line);
        cardConnectionsRef.current.push(line);
      });

      rightNodes.forEach((nodeIndex) => {
        const node = nodes[nodeIndex];
        if (!node) return;

        const worldPos = new THREE.Vector3();
        node.getWorldPosition(worldPos);

        const points = [worldPos.clone(), rightCardPos];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: 0xFFFF00,
          transparent: true,
          opacity: 0,
          linewidth: 2
        });
        const line = new THREE.Line(geometry, material);
        line.userData = { node: node, cardPos: rightCardPos, type: 'right', targetOpacity: 0.5, currentOpacity: 0 };
        scene.add(line);
        cardConnectionsRef.current.push(line);
      });
    }

    let time = 0;
    function animate() {
      requestAnimationFrame(animate);
      time += 0.005;

      if (graphGroupRef.current) {
        graphGroupRef.current.rotation.y = time * 0.3;
        graphGroupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
      }

      nodes.forEach((node, i) => {
        const userData = node.userData;

        userData.baseScale += (userData.targetScale - userData.baseScale) * 0.1;

        // Changed: Use animationStepRef.current instead of internalAnimationStepRef.current
        const currentStep = animationStepRef.current;
        const isConnectedLeft = analysisSteps[currentStep].connectedNodes.includes(i);
        const isConnectedRight = understandingSteps[currentStep].connectedNodes.includes(i);
        const isConnected = isConnectedLeft || isConnectedRight;

        const pulseMagnitude = isConnected ? 0.15 : 0.08;
        const pulse = 1 + Math.sin(time * 2 + userData.pulsePhase) * pulseMagnitude;
        const finalScale = userData.baseScale * pulse;
        node.scale.setScalar(finalScale);

        const targetOpacity = userData.baseScale > 0.1 ? 0.95 : 0;
        node.material.opacity += (targetOpacity - node.material.opacity) * 0.1;

        if (userData.glow) {
          const glowScale = isConnected ? 1.3 : 1;
          userData.glow.scale.setScalar(glowScale + Math.sin(time * 2 + userData.pulsePhase) * 0.2);
          const baseOpacity = isConnected ? 0.3 : 0.15;
          const targetGlowOpacity = userData.baseScale > 0.1 ? baseOpacity + Math.sin(time * 2 + userData.pulsePhase) * 0.1 : 0;
          userData.glow.material.opacity += (targetGlowOpacity - userData.glow.material.opacity) * 0.1;
        }
      });

      cardConnectionsRef.current.forEach((line) => {
        const worldPos = new THREE.Vector3();
        line.userData.node.getWorldPosition(worldPos);

        const positions = line.geometry.attributes.position.array;
        positions[0] = worldPos.x;
        positions[1] = worldPos.y;
        positions[2] = worldPos.z;
        positions[3] = line.userData.cardPos.x;
        positions[4] = line.userData.cardPos.y;
        positions[5] = line.userData.cardPos.z;
        line.geometry.attributes.position.needsUpdate = true;

        line.userData.currentOpacity += (line.userData.targetOpacity - line.userData.currentOpacity) * 0.1;

        const pulse = Math.sin(time * 3) * 0.15;
        line.material.opacity = line.userData.currentOpacity + pulse;
      });

      renderer.render(scene, camera);
    }
    animate();

    const stepInterval = setInterval(() => {
      setAnalysisStep((prevStep) => {
        const nextStep = (prevStep + 1) % analysisSteps.length;
        animationStepRef.current = nextStep; // Changed: Use animationStepRef.current

        if (nextStep === 0) {
          hideAllNodes();
        }
        updateCardConnections(nextStep);
        return nextStep;
      });
    }, 3000);

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
      // Ensure all objects are removed from the scene when component unmounts or effect re-runs
      scene.children.forEach((child) => {
        if (child instanceof THREE.Group) {// Remove graphGroup and its children
          child.children.forEach((grandchild) => {
            if (grandchild.geometry) grandchild.geometry.dispose();
            if (grandchild.material) grandchild.material.dispose();
          });
        }
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
        scene.remove(child);
      });
      nodesRef.current = [];
      cardConnectionsRef.current = [];
      visibleNodesRef.current.clear();
      sceneRef.current = null;
      graphGroupRef.current = null;
    };
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="relative py-16 md:py-20 px-4 md:px-6 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24">

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-6">
            <span className="text-[#0B1121]">Beyond</span>{" "}
            <span className="text-[#1E3A8A]">Resumes</span>
          </h2>
          <p className="text-base md:text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed font-normal">Resumes are static. You're not. Bridge reads your code, understands projects, and turns them into a dynamic map of your skills and growth.

          </p>
        </motion.div>

        <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B1121] via-[#1a1f35] to-[#1E3A8A] border-2 border-gray-300 shadow-2xl">
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
          }} />

          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#3B82F6]/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#FFFF00]/4 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -60 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="absolute left-4 md:left-8 top-8 md:top-12 z-20 w-[280px] md:w-[320px]">

            <div className="bg-[#0f1419]/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 md:p-5 shadow-2xl">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#3B82F6]/15 flex items-center justify-center border border-[#3B82F6]/20">
                  <Code className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#3B82F6]" />
                </div>
                <h3 className="text-white/90 font-medium text-xs md:text-sm tracking-tight">AI Code Analysis</h3>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={analysisStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#0B1121]/70 rounded-xl p-3 mb-4 font-mono text-[10px] md:text-[11px] border border-white/5 leading-relaxed">

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
                        }>

                        {line}
                      </div>);

                  })}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={analysisStep}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3">

                  <div className="text-gray-200 text-[11px] md:text-[12px] font-normal min-h-[18px]">
                    {typingText}
                    {isVisible && <span className="inline-block w-0.5 h-3 bg-[#FFFF00] ml-0.5 animate-pulse" />}
                  </div>
                  {analysisSteps[analysisStep].skills.length > 0 &&
                  <div className="flex flex-wrap gap-1.5 mt-2">
                      {analysisSteps[analysisStep].skills.map((skill, i) =>
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.12, duration: 0.3 }}
                      className="px-2 py-0.5 bg-[#3B82F6]/15 text-[#3B82F6] text-[10px] rounded-md border border-[#3B82F6]/25 font-medium">

                          {skill}
                        </motion.div>
                    )}
                    </div>
                  }
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 60 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="absolute right-4 md:right-8 bottom-8 md:bottom-12 z-20 w-[280px] md:w-[320px]">

            <div className="bg-[#0f1419]/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 md:p-5 shadow-2xl">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#FFFF00]/15 flex items-center justify-center border border-[#FFFF00]/20">
                  <Brain className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#FFFF00]" />
                </div>
                <h3 className="text-white/90 font-medium text-xs md:text-sm tracking-tight">AI Soft Skill Analysis</h3>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={analysisStep}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3">

                  <div className="text-gray-200 text-[11px] md:text-[12px] font-normal min-h-[18px]">
                    {rightTypingText}
                    {isVisible && <span className="inline-block w-0.5 h-3 bg-[#FFFF00] ml-0.5 animate-pulse" />}
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {understandingSteps[analysisStep].metrics.map((metric, i) =>
                    <motion.div
                      key={metric}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.12, duration: 0.3 }}
                      className="px-2 py-0.5 bg-[#FFFF00]/15 text-[#FFFF00] text-[10px] rounded-md border border-[#FFFF00]/25 font-medium">

                        {metric}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="pt-3 mt-3 border-t border-white/10">
                <div className="text-gray-500 text-[10px] font-medium uppercase tracking-wide mb-1.5">Measured from</div>
                <p className="text-gray-400 text-[10px] leading-relaxed">
                  Project descriptions • Case studies • Documentation • Coursework • Portfolio content • Team projects • Writing samples
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 md:mt-24 text-center">

          <div className="max-w-3xl mx-auto rounded-3xl p-6 md:p-8 border border-gray-300 bg-gray-50">
            <p className="text-base md:text-lg text-[#0B1121] leading-relaxed font-normal">
              <span className="font-semibold text-[#1E3A8A]">The result? </span> 
               No more getting filtered out by keywords. Bridge understands your actual abilities, so you're matched to roles based on what you can do, not the buzzwords on your resume.
            </p>
          </div>
        </motion.div>
      </div>
    </div>);

}