import React, {useState} from "react";

const Summary = ({summary})=>{
    const [isExpanded, setIsExpanded] = useState(false);

    return <div className="summary">
        <div className={isExpanded?'summary__text-expanded':'summary__text-contracted'}>{summary}</div>
        {!isExpanded && <div className="summary__expand-button" onClick={()=>setIsExpanded(true)}>קרא עוד</div>}
        {isExpanded && <div className="summary__contract-button" onClick={()=>setIsExpanded(false)}>סגור</div>}
    </div>
}

export default Summary;