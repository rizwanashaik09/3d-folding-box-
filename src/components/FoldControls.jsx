

import React from "react";
import "./FoldControls.css";

function FoldControls({ onReset }) {
  return (
    <div className="fold-controls">
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default FoldControls;