import React, { forwardRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BoxModel from "./BoxModel";

const BoxScene = forwardRef(function BoxScene({ template }, boxModelRef) {
  return (
    <Canvas camera={{ position: [4, 3, 5], fov: 45 }}>
      
      <ambientLight intensity={0.6} />

      
      <directionalLight position={[5, 6, 4]} intensity={1} />

      <BoxModel ref={boxModelRef} template={template} />

      
      <OrbitControls enablePan={false} autoRotate autoRotateSpeed={1.2} 
      minDistance={3}
      maxDistance={8} />
    </Canvas>
  );
});

export default BoxScene;