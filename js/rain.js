// 中雨特效 - 清晰可见但不影响阅读
(function() {
  'use strict';
  
  const canvas = document.createElement('canvas');
  canvas.id = 'rain-canvas';
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
  `;
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  let w, h;
  
  const raindrops = [];
  const maxRaindrops = 150; // 中雨数量
  
  class Raindrop {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * -h;
      this.length = Math.random() * 25 + 20; // 较长的雨滴
      this.speed = Math.random() * 6 + 8; // 较快速度
      this.opacity = Math.random() * 0.3 + 0.2; // 适中透明度
      this.width = Math.random() * 1.2 + 0.8;
    }
    
    fall() {
      this.y += this.speed;
      
      if (this.y > h) {
        this.reset();
        this.y = -this.length;
      }
    }
    
    draw() {
      const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
      gradient.addColorStop(0, `rgba(200, 220, 255, 0)`);
      gradient.addColorStop(0.5, `rgba(200, 220, 255, ${this.opacity})`);
      gradient.addColorStop(1, `rgba(200, 220, 255, ${this.opacity * 0.3})`);
      
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.length);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = this.width;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  }
  
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  
  function init() {
    resize();
    for (let i = 0; i < maxRaindrops; i++) {
      raindrops.push(new Raindrop());
    }
  }
  
  function animate() {
    // 完全清除画布，不影响背景
    ctx.clearRect(0, 0, w, h);
    
    raindrops.forEach(drop => {
      drop.fall();
      drop.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  window.addEventListener('resize', resize);
  
  init();
  animate();
})();

