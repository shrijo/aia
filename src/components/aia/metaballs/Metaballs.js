import React, { useRef, useEffect } from 'react';
import './Metaballs.css';

const Metaballs = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = 150;
        const height = 150;
        canvas.width = width;
        canvas.height = height;

        const numBalls = 4;
        const balls = [];

        for (let i = 0; i < numBalls; i++) {
            balls.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 1, // Reduced speed
                vy: (Math.random() - 0.5) * 1, // Reduced speed
                radius: 25 + Math.random() * 20 // Increased radius
            });
        }

        const drawMetaballs = () => {
            ctx.clearRect(0, 0, width, height);
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let sum = 0;

                    for (const ball of balls) {
                        const dx = ball.x - x;
                        const dy = ball.y - y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        sum += (ball.radius * ball.radius) / (dist * dist);
                    }

                    const index = (y * width + x) * 4;
                    const color = sum > 1 ? 255 : 0;
                    data[index] = color;
                    data[index + 1] = color;
                    data[index + 2] = color;
                    data[index + 3] = sum > 1 ? 255 : 0; // Transparent background
                }
            }

            ctx.putImageData(imageData, 0, 0);

            // Create an image mask from the canvas
            const maskImage = canvas.toDataURL();
            containerRef.current.style.maskImage = `url(${maskImage})`;
            containerRef.current.style.webkitMaskImage = `url(${maskImage})`; // For Safari
        };

        const update = () => {
            for (const ball of balls) {
                ball.x += ball.vx;
                ball.y += ball.vy;

                if (ball.x - ball.radius < 0 || ball.x + ball.radius > width) ball.vx *= -1;
                if (ball.y - ball.radius < 0 || ball.y + ball.radius > height) ball.vy *= -1;
            }
        };

        const animate = () => {
            update();
            drawMetaballs();
            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <div className="metaballs-container" ref={containerRef}>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default Metaballs;
