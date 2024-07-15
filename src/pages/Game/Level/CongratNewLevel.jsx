import React, { useRef, useEffect } from "react";

const CongratNewLevel = ({ openCongratNewLevel, closeCongratNewLevel, nextLevel }) => {
    // Create a ref for the canvas element
    const canvasRef = useRef(null);
    const animationFrameIdRef = useRef(null); // Ref to store the animation frame ID

    // Effect to draw on the canvas and animate
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Check if the context is available
        if (context) {
            const image = new Image();
            image.src = "public/assets/Asset/new_atlas/Sunflower.png"; // Replace with your image path

            image.onload = () => {
                let frameX = 1;
                let frameY = 1;
                const speed = 2; // Speed of the animation
                let gameFrame = 0;
                let angle = 0;
                let spriteWidth = 858;
                let spriteHeight = 725;

                const draw = () => {
                    // Clear the canvas
                    context.clearRect(0, 0, canvas.width, canvas.height);

                    // Draw the image at the center of the canvas
                    const imgX = (canvas.width - 429) / 2;
                    const imgY = (canvas.height - 362.5) / 2;
                    // Draw the light rays
                    const raysCount = 20;
                    const radius = Math.min(canvas.width, canvas.height) / 2;
                    context.strokeStyle = "orange";
                    context.lineWidth = 1.5;

                    for (let i = 0; i < raysCount; i++) {
                        const theta = (i * 2 * Math.PI) / raysCount + angle;
                        const x1 = imgX + 214.5; // center of the image
                        const y1 = imgY + 181.25; // center of the image
                        const x2 = x1 + radius * Math.cos(theta);
                        const y2 = y1 + radius * Math.sin(theta);
                        context.beginPath();
                        context.moveTo(x1, y1);
                        context.lineTo(x2, y2);
                        context.stroke();
                    }

                    angle += 0.01;
                    context.drawImage(image, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, imgX, imgY, 429, 362.5);

                    if (gameFrame % 20 === 0) {
                        frameX = frameX === 1 ? 0 : 1;
                    }
                    gameFrame++;

                    // Request the next frame
                    animationFrameIdRef.current = requestAnimationFrame(draw);
                };

                // Start the animation
                draw();
            };
        }

        // Clean up the animation on component unmount
        return () => {
            cancelAnimationFrame(animationFrameIdRef.current);
        };
    }, []);

    return (
        <div
            id="ModelContainer"
            onClick={closeCongratNewLevel}
            className="bg-black fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-sm flex-col"
        >
            <div className="relative flex flex-col items-center justify-center p-3">
                {/* Canvas element */}
                <canvas
                    ref={canvasRef}
                    width={500} // Set width of the canvas
                    height={400} // Set height of the canvas
                />
            </div>
            <p className="text-3xl font-bold text-center text-yellow-800 mt-4 mb-4">
                Chúc mừng bạn đã mở khóa level {nextLevel}
            </p>
        </div>
    );
};

export default CongratNewLevel;