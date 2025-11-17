import { useState, useEffect } from "react";

export function useMilestones(isSkipped = false) {
  const [progress, setProgress] = useState(0);
  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const milestones = [
    { id: 0, text: "Extracting education and experience…", progress: 30, duration: 3000 },
    { id: 1, text: "Identifying skills and projects…", progress: 60, duration: 4000 },
    { id: 2, text: "Mapping your profile in 3D space…", progress: 90, duration: 3000 },
    { id: 3, text: "Profile ready!", progress: 100, duration: 1000 }
  ];

  useEffect(() => {
    if (isSkipped) {
      setProgress(100);
      setCurrentMilestone(3);
      setIsComplete(true);
      return;
    }

    let timeoutId;
    let startTime = Date.now();
    let currentMilestoneIndex = 0;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const milestone = milestones[currentMilestoneIndex];
      
      if (elapsed < milestone.duration) {
        const milestoneProgress = elapsed / milestone.duration;
        const prevProgress = currentMilestoneIndex > 0 ? milestones[currentMilestoneIndex - 1].progress : 0;
        const targetProgress = milestone.progress;
        setProgress(prevProgress + (targetProgress - prevProgress) * milestoneProgress);
        timeoutId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(milestone.progress);
        setCurrentMilestone(milestone.id);
        
        if (currentMilestoneIndex < milestones.length - 1) {
          currentMilestoneIndex++;
          startTime = Date.now();
          timeoutId = requestAnimationFrame(updateProgress);
        } else {
          setIsComplete(true);
        }
      }
    };

    timeoutId = requestAnimationFrame(updateProgress);

    return () => {
      if (timeoutId) cancelAnimationFrame(timeoutId);
    };
  }, [isSkipped]);

  return {
    progress,
    currentMilestone,
    milestones,
    isComplete
  };
}