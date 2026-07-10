import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Panel from "./Panel";
import { useFrame } from "@react-three/fiber";
import { useFoldAnimation, getPanelFoldProgress } from "../hooks/useFoldAnimation";

const BoxModel = forwardRef(function BoxModel({ template }, ref) {
  // find total fold stages
  
  const totalStages = Math.max(...template.panels.map((panel) => panel.foldGroup));

  const { foldStage, fold, unfold, reset } = useFoldAnimation(totalStages);

  // expose animation controls to the parent
  useImperativeHandle(ref, () => ({ fold, unfold, reset }));

const groupRef = useRef(null);

useFrame(({ clock }) => {
  if (!groupRef.current) return;
  const bobOffset = Math.sin(clock.elapsedTime * 1.5) * 0.05;
  groupRef.current.position.y = liftHeight + bobOffset;
});

  // render a panel and its child panel
  function renderPanel(panel) {
    const progress = getPanelFoldProgress(foldStage, panel.foldGroup);
    const childPanel = template.panels.find((p) => p.parentPanelId === panel.id);

    return (
      <Panel key={panel.id} panel={panel} foldProgress={progress}>
        {childPanel ? renderPanel(childPanel) : null}
      </Panel>
    );
  }

  // render only root parents
  const rootPanels = template.panels.filter((panel) => panel.parentPanelId === null);

  // Lift the whole box slightly as folding begins 
  const liftHeight = Math.min(foldStage, 1) * 0.6;

  return (
    <group ref={groupRef}>
  {rootPanels.map((panel) => renderPanel(panel))}
</group>
  );
});

export default BoxModel;