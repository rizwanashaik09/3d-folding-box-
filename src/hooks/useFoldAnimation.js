import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const FOLD_SPEED = 1.2; // animation speed

export function useFoldAnimation(totalStages) {
  const [foldStage, setFoldStage] = useState(0);
  const targetStage = useRef(0);

  // Runs every rendered frame; nudges foldStage toward targetStage.
  useFrame((_, delta) => {
    const current = foldStage;
    const target = targetStage.current;
    if (current === target) return;

    const step = FOLD_SPEED * delta;
    if (current < target) {
      setFoldStage(Math.min(current + step, target));
    } else {
      setFoldStage(Math.max(current - step, target));
    }
  });

  const fold = () => {
    targetStage.current = totalStages;
  };

  const unfold = () => {
    targetStage.current = 0;
  };

  const reset = () => {
    targetStage.current = 0;
    setFoldStage(0); // reset instantly, no animation
  };

  return { foldStage, fold, unfold, reset };
}


export function getPanelFoldProgress(foldStage, foldGroup) {
  if (foldGroup === 0) return 0;
  const raw = foldStage - (foldGroup - 1);
  return Math.min(Math.max(raw, 0), 1); 
}