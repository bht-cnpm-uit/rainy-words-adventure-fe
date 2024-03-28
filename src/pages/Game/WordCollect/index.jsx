import React, { useState, useEffect, useMemo, useRef } from "react";
import WordFall from "./WordFall";
const WordCollect = (props) => {
    // const canvasRef = useRef()
    // function resizeCanvas(canvas) {
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    // }
    // const ScrollBG = new Image();
    // ScrollBG.src = 'src/assets/Asset/Map1/ScrollBG.png';
    // const StableBG = new Image();
    // StableBG.src = 'src/assets/Asset/Map1/StableBG.png';
    // class Background {
    //     constructor(image) {
    //         this.x = 0;
    //         this.y = 0;
    //         this.width = 1920;
    //         this.height = 880;
    //         this.image = image;
    //     }
    //     update() {

    //     }
    //     draw(ctx) {
    //         ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    //     }
    // }
    // const layer1 = new Background(ScrollBG);
    // const layer2 = new Background(StableBG);
    // const gameObjects = [layer1, layer2];
    // useEffect(() => {
    //     const canvas = canvasRef.current
    //     resizeCanvas(canvas);
    //     const context = canvas.getContext('2d');
    //     function background() {
    //         context.clearRect(0, 0, canvas.width, canvas.height);
    //         gameObjects.forEach(layer => layer.draw(context));
    //     }
    //     background();
    // })

    return (
        // <>
        //     <canvas ref={canvasRef} {...props} />
        // </>
        <WordFall />
    );
}
export default WordCollect;
