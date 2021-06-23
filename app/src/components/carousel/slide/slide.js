import { useState } from "react";

import "./slide.css";
export default function Slide(props) {
  const [showDef, setShowDef] = useState(false);

  return (
    <div className={`slide-container ${props.visible ? "" : "hidden-card"}`}>
      <div
        className={` slide-content-container${!showDef ? "" : " back-side"}`}
        onClick={() => {
          setShowDef(!showDef);
        }}
      >
        <div className="slide-term-content">
            <div dangerouslySetInnerHTML={{__html: props.term}}/>
        </div>
        <div className="slide-definition-content">
          <div dangerouslySetInnerHTML={{__html: props.definition}}/>
        </div>
      </div>
    </div>
  );
}
