// 下雨特效
(function() {
  'use strict';
  
  // 创建画布
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
  
  // 雨滴数组
  const raindrops = [];
  const maxRaindrops = 150; // 雨滴数量
  
  // 雨滴类
  class Raindrop {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * -h;
      this.length = Math.random() * 15 + 10; // 雨滴长度
      this.speed = Math.random() * 3 + 4; // 下落速度
      this.opacity = Math.random() * 0.3 + 0.3; // 透明度
      this.width = Math.random() * 0.5 + 0.5; // 宽度
    }
    
    fall() {
      this.y += this.speed;
      
      // 如果雨滴落到底部，重置位置
      if (this.y > h) {
        this.reset();
        this.y = -this.length;
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.length);
      ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`;
      ctx.lineWidth = this.width;
      ctx.stroke();
    }
  }
  
  // 调整画布大小
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  
  // 初始化雨滴
  function init() {
    resize();
    for (let i = 0; i < maxRaindrops; i++) {
      raindrops.push(new Raindrop());
    }
  }
  
  // 动画循环
  function animate() {
    ctx.clearRect(0, 0, w, h);
    
    raindrops.forEach(drop => {
      drop.fall();
      drop.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  // 监听窗口大小变化
  window.addEventListener('resize', resize);
  
  // 启动
  init();
  animate();
})();
