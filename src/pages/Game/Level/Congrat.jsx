import React, { useRef, useEffect, useState } from "react";

const Congrat = ({ openCongrat, closeCongrat, nextLevel, gift, setGift, congratType, setCongratType }) => {
    const canvasRef = useRef(null);
    const animationFrameIdRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const spriteWidthMedal = 197;
        const spriteHeightMedal = 196;
        const gap = 20;
        const loadImages = (callback) => {
            const image_medals1 = new Image();
            const image_medals2 = new Image();
            const image_medals3 = new Image();
            const image_medals4 = new Image();
            const image_medals5 = new Image();
            const image_medals6 = new Image();
            const image_frames1 = new Image();
            const image_frames2 = new Image();
            const image_frames3 = new Image();
            const image_frames4 = new Image();
            const image_frames5 = new Image();
            const image_frames6 = new Image();

            let imagesLoaded = 0;
            const totalImages = 12;

            const onImageLoad = () => {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    callback({
                        image_medals1,
                        image_medals2,
                        image_medals3,
                        image_medals4,
                        image_medals5,
                        image_medals6,
                        image_frames1,
                        image_frames2,
                        image_frames3,
                        image_frames4,
                        image_frames5,
                        image_frames6
                    });
                }
            };

            image_medals1.src = "public/assets/Asset/medals/1.png";
            image_medals2.src = "public/assets/Asset/medals/2.png";
            image_medals3.src = "public/assets/Asset/medals/3.png";
            image_medals4.src = "public/assets/Asset/medals/4.png";
            image_medals5.src = "public/assets/Asset/medals/5.png";
            image_medals6.src = "public/assets/Asset/medals/6.png";
            image_frames1.src = "public/assets/Asset/frames/1.png";
            image_frames2.src = "public/assets/Asset/frames/2.png";
            image_frames3.src = "public/assets/Asset/frames/3.png";
            image_frames4.src = "public/assets/Asset/frames/4.png";
            image_frames5.src = "public/assets/Asset/frames/5.png";
            image_frames6.src = "public/assets/Asset/frames/6.png";

            [
                image_medals1, image_medals2, image_medals3, image_medals4, image_medals5, image_medals6,
                image_frames1, image_frames2, image_frames3, image_frames4, image_frames5, image_frames6
            ].forEach(image => image.onload = onImageLoad);
        };

        const animate = (images) => {
            let frameX = 0;
            const frameX1 = ((nextLevel.level - 1) % 5) * 2;
            const frameX2 = frameX1 + 1;
            const frameY = 1 + Math.floor((nextLevel.level - 1) / 5);
            let gameFrame = 0;

            const animateFrame = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                let h = 0
                // Render itemCup items
                if (gift.itemCup && gift.itemCup.length > 0) {
                    const numItems = gift.itemCup.length;
                    const scale = 1.8;
                    const itemWidth = spriteWidthMedal / scale;
                    const totalWidth = (itemWidth * numItems) + (gap * (numItems - 1));
                    const startX = (canvas.width - totalWidth) / 2;
                    const imgY = (canvas.height - spriteHeightMedal / scale) / 4;
                    h = spriteHeightMedal / scale
                    gift.itemCup.forEach((item, index) => {
                        const imgX = startX + index * (itemWidth + gap);
                        const image = images[`image_medals${item.id}`];
                        context.drawImage(image, imgX, imgY, spriteWidthMedal / scale, spriteHeightMedal / scale);
                    });
                }

                // Render achievements
                if (gift.achievements && gift.achievements.length > 0) {
                    const spriteShape = [[315, 315], [315, 315], [315, 315], [335, 315], [350, 320], [352, 323], [359, 338]];
                    const numItems = gift.achievements.length;
                    const scale = 2.9;
                    const gap = 10; // Assuming gap value, you can adjust as needed
                    const itemWidths = spriteShape.slice(0, numItems).map(([width]) => width / scale);
                    const totalWidth = itemWidths.reduce((a, b) => a + b, 0) + (gap * (numItems - 1));
                    const startX = (canvas.width - totalWidth) / 2;
                    const maxHeight = Math.max(...spriteShape.slice(0, numItems).map(([_, height]) => height));
                    const imgY = h * 1.2 + (canvas.height - (maxHeight / scale)) / 4;

                    gift.achievements.forEach((achievement, index) => {
                        const [itemWidth, itemHeight] = spriteShape[index];
                        const imgX = startX + itemWidths.slice(0, index).reduce((a, b) => a + b + gap, 0);
                        const image = images[`image_frames${achievement.id}`];
                        context.drawImage(image, imgX, imgY, itemWidth / scale, itemHeight / scale);
                    });
                }


                if (gameFrame % 20 === 0) {
                    frameX = frameX === frameX2 ? frameX1 : frameX2;
                }
                gameFrame++;
                animationFrameIdRef.current = requestAnimationFrame(animateFrame);
            };

            animateFrame();
        };
        if (context) {
            if (congratType === 'next-level') {
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
            else if (congratType === 'gift') {
                loadImages((images) => {
                    animate(images);
                });
            }
            else {
                closeCongrat();
            }
        }

        return () => {
            cancelAnimationFrame(animationFrameIdRef.current);
        };
    }, [nextLevel, congratType]);
    const handleCloseGift = () => {
        setGift(null);
        if (nextLevel) {
            setCongratType('next-level')
        }
    }
    return (
        <div
            id="ModelContainer"
            className="bg-black fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-sm flex-col"
        >
            {
                congratType === 'next-level' ?
                    <>
                        <div className="relative flex flex-col items-center justify-center p-3">
                            <canvas
                                ref={canvasRef}
                                width={500}
                                height={400}
                            />
                        </div>
                        <p className="text-3xl font-bold text-center text-yellow-800 mt-4 mb-4">
                            Chúc mừng bạn đã mở khóa level {nextLevel.level}
                        </p>
                        <button
                            className="bg-transparent hover:bg-yellow-700 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-800 hover:border-transparent rounded"
                            onClick={closeCongrat}
                        >
                            Đóng
                        </button>
                    </>
                    :
                    <>
                        <p className="text-3xl font-bold text-center text-yellow-800">
                            Chúc mừng bạn đã nhận được
                        </p>
                        <div className="relative flex flex-col items-center justify-center">
                            <canvas
                                ref={canvasRef}
                                width={800}
                                height={300}
                            />
                        </div>
                        <button
                            className="bg-transparent hover:bg-yellow-700 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-800 hover:border-transparent rounded mt-2"
                            onClick={handleCloseGift}
                        >
                            Đóng
                        </button>
                    </>
            }
        </div>
    );
};

export default Congrat;
