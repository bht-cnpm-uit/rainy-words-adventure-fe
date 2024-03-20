import React, { useState, useEffect, useRef, useMemo } from 'react';
import "./style.scss"

const FallItem = ({ word, meaningVN, startPosition, onRemove }) => {
    const [position, setPosition] = useState({ x: startPosition[0], y: startPosition[1] });
    const itemRef = useRef(null);

    useEffect(() => {
        const fallInterval = setInterval(() => {
            setPosition(prevPosition => ({ x: prevPosition.x, y: prevPosition.y + 2 }));
        }, 16);

        const checkOutOfBoundsInterval = setInterval(() => {
            const windowHeight = window.innerHeight;
            const itemRect = itemRef.current.getBoundingClientRect();
            if (itemRect.bottom > windowHeight) {
                onRemove();
            }
        }, 1000);
        return () => {
            clearInterval(fallInterval);
            clearInterval(checkOutOfBoundsInterval);
        };
    }, [onRemove]);

    return (
        <div
            className="word-item"
            style={{
                width: 100,
                height: 100,
                backgroundColor: "yellow",
                position: "fixed",
                left: position.x,
                top: position.y,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column"
            }}
            ref={itemRef}
        >
            <p>{word}</p>
            ----
            <p>{meaningVN}</p>
        </div>
    );
};

export default FallItem;
