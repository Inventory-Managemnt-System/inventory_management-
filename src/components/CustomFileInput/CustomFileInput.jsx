import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CustomFileInput.css";

function CustomFileInput({fieldName, title, CustomFileInputicon}) {
  return (
    <label
      htmlFor={fieldName}
      className= "btn AttachFile"
    >
      <FontAwesomeIcon icon={CustomFileInputicon} className="me-2" />
      <span id="fileLabel" style={{ marginLeft: "10px" }}>
        {title}
      </span>
    </label>
  );
}

export default CustomFileInput;
