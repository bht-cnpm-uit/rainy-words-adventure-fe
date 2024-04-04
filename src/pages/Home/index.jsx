import { Player } from './player';
import { Background } from './background';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Guide, start } from './button';
const Home = (props) => {
    const canvasRef = useRef();
    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    class Home {
        constructor(canvas, ctx, width, height) {
            this.canvas = canvas;
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.player = new Player(this);
            this.Guide = new Guide(this);
            this.start = new start(this);
            this.canvas.addEventListener('click', this.onClick.bind(this));
        }

        draw(context) {
            this.background.draw(context)
            this.player.draw(context);
            this.Guide.draw(context);
            this.start.draw(context);

        }
        
        onClick(event){
            
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        resizeCanvas(canvas);
        const context = canvas.getContext('2d');
        const home = new Home(canvas, context, canvas.width, canvas.height);
        function animate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            home.draw(context);
            requestAnimationFrame(animate);
        }
        animate();
    }, []);
    return <canvas ref={canvasRef} {...props} />;
};

export default Home;
