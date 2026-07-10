import React, { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getTemplateById } from "../data/templates";
import BoxScene from "../components/BoxScene";
import FoldControls from "../components/FoldControls";
import "./BoxPage.css";

function BoxPage() {
  const { boxId } = useParams();
  const template = getTemplateById(boxId);

  const boxModelRef = useRef(null);

  if (!template) {
    return (
      <div className="box-page">
        <p>Template not found.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const handleHoverStart = () => boxModelRef.current?.fold();
  const handleHoverEnd = () => boxModelRef.current?.unfold();
  const handleReset = () => boxModelRef.current?.reset();

  return (
    <div className="box-page">
      <Link to="/" className="back-button">
        ← Back
      </Link>

      <h2 className="box-title">{template.name}</h2>

      <FoldControls onReset={handleReset} />

      <div
        className="box-canvas-wrapper"
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        <BoxScene ref={boxModelRef} template={template} />
      </div>
    </div>
  );
}

export default BoxPage;