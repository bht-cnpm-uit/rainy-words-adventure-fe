import { useMemo, useEffect, useState } from "react";

function Figure({ gameState }) {
    const [position, setPosition] = useState({ x: 700, y: 600 });
    const [xSpeed, setXSpeed] = useState(0);
    const [ySpeed, setYSpeed] = useState(0);
    const [friction, setFriction] = useState(0.6);
    const [maxSpeed, setMaxSpeed] = useState(10);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (gameState) {
                let newX = position.x;
                let newY = position.y;
                switch (event.key) {
                    // move left
                    case "ArrowLeft":
                        if (newX <= 50) return;
                        setXSpeed(xSpeed--);
                        newX += this.xSpeed;
                        break;
                    // move right
                    case "ArrowRight":
                        setXSpeed(this.xSpeed++);
                        if (newX >= 1700) return;
                        newX += this.xSpeed;
                        break;
                    default:
                        setXSpeed(this.xSpeed *= this.friction);
                        return;
                }
                setPosition({ x: newX, y: newY });
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });
    return (
        <div className="figure"
            style={{ position: 'fixed', left: position.x, top: position.y, width: 120, height: 120, backgroundColor: "red" }}>
        </div>
    )
}

export default Figure;