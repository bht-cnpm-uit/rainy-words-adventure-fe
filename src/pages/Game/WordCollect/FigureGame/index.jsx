import { useMemo, useEffect, useState } from "react";

function Figure() {
    const [position, setPosition] = useState({ x: 700, y: 600 });

    const memoizedPosition = useMemo(() => position, [position]);
    useEffect(() => {
        const handleKeyDown = (event) => {
            let newX = memoizedPosition.x;
            let newY = memoizedPosition.y;
            switch (event.key) {
                case "ArrowLeft":
                    if (newX <= 50) return;
                    newX -= 20;
                    break;
                case "ArrowRight":
                    if (newX >= 1700) return;
                    newX += 20;
                    break;
                default:
                    return;
            }
            setPosition({ x: newX, y: newY });
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [memoizedPosition]);
    return (
        <div className="figure"
            style={{ position: 'fixed', left: memoizedPosition.x, top: memoizedPosition.y, width: 120, height: 120, backgroundColor: "red" }}>
        </div>
    )
}

export default Figure;