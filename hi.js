// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate counters
      const counters = entry.target.querySelectorAll('[data-count]');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        animateCounter(counter, target);
      });
      
      // Add animation classes
      entry.target.classList.add('animate-in');
      
      // Stop observing this element
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.hero-stats, .feature-card, .support-card').forEach(el => {
  observer.observe(el);
});

// Enhanced scroll effects with throttling
let ticking = false;

function updateScrollEffects() {
  const scrolled = window.pageYOffset;
  
  // Navbar effect
  const navbar = document.querySelector('.navbar');
  if (scrolled > 50) {
    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
  } else {
    navbar.style.background = 'rgba(10, 10, 10, 0.8)';
  }
  
  // Parallax effect for background orbs
  const rate = scrolled * -0.5;
  document.querySelectorAll('.gradient-orb').forEach((orb, index) => {
    const speed = (index + 1) * 0.3;
    orb.style.transform = `translate3d(0, ${rate * speed}px, 0)`;
  });
  
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
});

// Add floating particles effect
function createFloatingParticles() {
  const particlesContainer = document.querySelector('.floating-particles');
  if (!particlesContainer) return;
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(99, 102, 241, 0.5);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${5 + Math.random() * 10}s infinite ease-in-out;
      animation-delay: ${Math.random() * 5}s;
      pointer-events: none;
    `;
    particlesContainer.appendChild(particle);
  }
}

// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px) scale(1.02)';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Smooth reveal animations for cards
const revealCards = () => {
  const cards = document.querySelectorAll('.feature-card, .support-card');
  
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    card.style.animationDelay = `${index * 0.1}s`;
  });
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
      }
    });
  }, { threshold: 0.1 });
  
  cards.forEach(card => cardObserver.observe(card));
};

// Enhanced scroll-triggered animations
const addScrollAnimations = () => {
  const elements = document.querySelectorAll('.section-title, .section-description, .download-title');
  
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.8s ease';
  });
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => scrollObserver.observe(el));
};

// Add click ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Executor interface interactions
document.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
  
  // Execute button
  const executeBtn = document.querySelector('.execute-btn');
  const status = document.querySelector('.status');
  
  if (executeBtn && status) {
    executeBtn.addEventListener('click', () => {
      status.textContent = 'Executing...';
      status.style.color = '#f59e0b';
      
      setTimeout(() => {
        status.textContent = 'Executed Successfully';
        status.style.color = '#10b981';
        
        setTimeout(() => {
          status.textContent = 'Ready';
          status.style.color = '#10b981';
        }, 2000);
      }, 1000);
    });
  }
  
  // Clear button
  const clearBtn = document.querySelector('.clear-btn');
  const codeContent = document.querySelector('.code-content');
  
  if (clearBtn && codeContent) {
    clearBtn.addEventListener('click', () => {
      const codeLines = codeContent.querySelectorAll('.code-line');
      codeLines.forEach((line, index) => {
        if (index > 0) { // Keep the first comment line
          setTimeout(() => {
            line.style.opacity = '0';
            setTimeout(() => line.remove(), 300);
          }, index * 100);
        }
      });
      
      if (status) {
        status.textContent = 'Cleared';
        status.style.color = '#ef4444';
        setTimeout(() => {
          status.textContent = 'Ready';
          status.style.color = '#10b981';
        }, 1500);
      }
    });
  }
});

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
  createFloatingParticles();
  revealCards();
  addScrollAnimations();
  
  // Add loading animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .particle {
    pointer-events: none;
  }
`;
document.head.appendChild(style);
