import React from "react";
import { Link } from "react-router-dom";
import "./TemplateCard.css";

function TemplateCard({ template }) {
  return (
    <div className="template-card">
      <h3 className="template-card-name">{template.name}</h3>
      <p className="template-card-description">
        {template.description}
      </p>

      <Link to={`/box/${template.id}`} className="template-card-button">
        View in 3D
      </Link>
    </div>
  );
}

export default TemplateCard;