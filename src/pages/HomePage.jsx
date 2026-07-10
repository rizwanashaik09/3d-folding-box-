import React from "react";
import { BOX_TEMPLATES } from "../data/templates";
import TemplateCard from "../components/TemplateCard";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <h1 className="home-title">3D Box Folding Simulator</h1>

      <p className="home-subtitle">
        Choose a cardboard template below to watch it fold into a 3D box.
      </p>

      <div className="template-grid">
        {BOX_TEMPLATES.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;