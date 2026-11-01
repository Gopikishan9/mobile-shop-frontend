import React from "react";

const Specification = ({ keyName, valueName }) => {

  return (
    <div className="specification">
      <span>{keyName.charAt(0).toUpperCase() + keyName.slice(1)}:</span>
      <span>{valueName.charAt(0).toUpperCase()}{valueName.slice(1)}</span>
    </div>
  );
};

export default Specification;