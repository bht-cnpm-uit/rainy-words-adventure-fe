import { useState, useEffect } from "react";
import FallingWords from "./WordFall";
function WordCollect() {
    const [position, setPosition] = useState({ x: 132, y: 700 });

    useEffect(() => {
        const handleKeyDown = (event) => {
            let newX = position.x;
            let newY = position.y;
            switch (event.key) {
                case "ArrowLeft":
                    if (newX <= 50) return;
                    newX -= 10;
                    break;
                case "ArrowRight":
                    if (newX >= 1700) return;
                    newX += 10;
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
    }, [position]);

    return (
        <div className="absolute inset-0 h-full w-full bg-white"
            style={{
                backgroundImage: 'linear-gradient(to right, #808080 2px, transparent 2px), linear-gradient(to bottom, #808080 2px, transparent 2px)',
                backgroundSize: '128px 128px'
            }}>
            <FallingWords style={{ position: 'absolute', width: '100%', height: '100%' }} />
            <div className="figure"
                style={{ position: 'absolute', left: position.x, top: position.y, width: 120, height: 120, backgroundColor: "red" }}>
            </div>
        </div>
    );
}

export default WordCollect;
