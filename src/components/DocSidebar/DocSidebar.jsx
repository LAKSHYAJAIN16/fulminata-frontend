import React, { useState } from 'react';
import "../DocSidebar/DocSidebar.css";

export default function DocSidebar({ data, onClick }) {
    const [selected, setSelected] = useState("");
    const [length] = useState(data.length);
    //Hover callback
    const hover = (e, event) => {
        if (e.id === selected) return;
        const style = e.style;
        if (event === true) {
            style.borderLeftColor = `green`;
        }
        else if (event === false) {
            style.borderLeftColor = `white`;
        }
    }

    const clickInternal = (e) => {
        const x = e.id;
        for (let i = 1; i < length; i++) {
            document.getElementById(i.toString()).style.borderLeftColor = `white`;
            
        }
        setSelected(e.id);
        document.getElementById(x).style.borderLeftColor = `green`;
    }

    return (
        <>
            {
                data.map((f) => (
                    f.isHead
                        ? <p className="dsHeader" id={f.id.toString()}>{f.text}</p>
                        : <p className="dsHeaderContent" id={f.id.toString()}
                            onMouseEnter={(e) => hover(e.currentTarget, true)}
                            onMouseLeave={(e) => hover(e.currentTarget, false)}
                            onClick={(e) => {
                                onClick(e.currentTarget);
                                clickInternal(e.currentTarget);
                            }}>{f.text}</p>
                ))
            }
        </>
    )
}
