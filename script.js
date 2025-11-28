// ========================
// CONFIGURATION
// ========================
const CONFIG = {
  matrix: {
    fontSize: 16,
    letters: "01",
    animationSpeed: 33,
    fadeOpacity: 0.1
  },
  animation: {
    threshold: 0.1
  }
};

// ========================
// FADE-IN ANIMATION
// ========================
const initFadeInAnimation = () => {
  const sections = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: CONFIG.animation.threshold }
  );
  
  sections.forEach(section => observer.observe(section));
};

// ========================
// SMOOTH SCROLL NAVIGATION
// ========================
const initSmoothScroll = () => {
  const navLinks = document.querySelectorAll('.navbar a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// ========================
// MATRIX ANIMATION
// ========================
class MatrixAnimation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.fontSize = CONFIG.matrix.fontSize;
    this.letters = CONFIG.matrix.letters;
    this.drops = [];
    
    this.init();
  }
  
  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = 300;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    
    // Initialize drops array
    this.drops = Array(this.columns).fill(1);
  }
  
  draw() {
    // Fade effect
    this.ctx.fillStyle = `rgba(0, 0, 0, ${CONFIG.matrix.fadeOpacity})`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw characters
    this.ctx.fillStyle = '#0f0';
    this.ctx.font = `${this.fontSize}px monospace`;
    
    for (let i = 0; i < this.drops.length; i++) {
      const text = this.letters[Math.floor(Math.random() * this.letters.length)];
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;
      
      this.ctx.fillText(text, x, y);
      
      // Reset drop randomly
      if (y > this.canvas.height && Math.random() > 0.95) {
        this.drops[i] = 0;
      }
      
      this.drops[i]++;
    }
  }
  
  animate() {
    this.draw();
    setTimeout(() => this.animate(), CONFIG.matrix.animationSpeed);
  }
}

// ========================
// FOOTER YEAR
// ========================
const updateFooterYear = () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
};

// ========================
// INITIALIZATION
// ========================
const init = () => {
  initFadeInAnimation();
  initSmoothScroll();
  new MatrixAnimation('matrix');
  updateFooterYear();
};

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}