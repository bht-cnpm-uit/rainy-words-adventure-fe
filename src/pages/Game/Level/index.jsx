import React, { useState, useRef, useEffect } from 'react';
import { Background } from './background';
import { Levels } from './level';
import { Player } from './player';
const Level = props => {
    const canvasRef = useRef();
    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    class MainScreen {
        constructor(canvas, ctx, width, height) {
            this.canvas = canvas;
            this.canvas.style.cursor = 'default'
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.levels = new Levels(this);
            this.player = new Player(this);
            this.levels.updatePositionLevel(this.background);
        }
        update(deltaTime) {
            this.player.update()
        }
        draw(context) {
            this.background.draw(context);
            this.levels.draw(context);
            // this.levels.forEach(itemLevel => itemLevel.draw(this.ctx));
            // this.player.draw(context);
        }
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        resizeCanvas(canvas);
        const context = canvas.getContext('2d');
        const mainScreen = new MainScreen(canvas, context, canvas.width, canvas.height);
        function animate(timeStamp) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const deltaTime = timeStamp - lastTime || 0;
            lastTime = timeStamp;
            mainScreen.draw(context);
            mainScreen.update(deltaTime);
            requestAnimationFrame(animate);
        }

        let lastTime = 0; // Initialize lastTime
        animate(0);

        return () => {
            cancelAnimationFrame(animate);
        };
    }, []);

    return (
        <canvas ref={canvasRef} {...props} />
    );

}

export default Level;
