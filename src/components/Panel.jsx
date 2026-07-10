import React, { useMemo } from "react";
import * as THREE from "three";

function getRotation(axis, angle) {
  if (axis === "x") return [angle, 0, 0];
  if (axis === "z") return [0, 0, angle];
  return [0, 0, 0];
}

function buildFlatGeometry(points) {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  points.forEach(([x, z]) => vertices.push(x, 0, z));
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3));
  const indices = [];
  for (let i = 1; i < points.length - 1; i++) indices.push(0, i, i + 1);
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function FlatPanelMesh({ points, color }) {
  const geometry = useMemo(() => buildFlatGeometry(points), [points]);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Panel({ panel, foldProgress, children }) {
  const { size, hingePosition, hingeAxis, localOffset, foldedRotation, color, flatShapePoints } = panel;

  const currentAngle = foldedRotation * foldProgress;
  const rotation = getRotation(hingeAxis, currentAngle);

  return (
    <group position={hingePosition} rotation={rotation}>
      {flatShapePoints ? (
        <FlatPanelMesh points={flatShapePoints} color={color} />
      ) : (
        <mesh position={localOffset}>
          <boxGeometry args={size} />
          <meshStandardMaterial color={color} />
        </mesh>
      )}
      {children}
    </group>
  );
}

export default Panel;