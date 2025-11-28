/* ========================================
   Mohamed Abdelkader Portfolio - Scripts
   ======================================== */

// ========================================
// Loading Screen
// ========================================
window.addEventListener('load', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 1000);
});

// ========================================
// Theme Toggle
// ========================================
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const savedTheme = localStorage.getItem('theme') || 'dark';

if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  if (newTheme === 'light') {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  }
});

// ========================================
// Create Particles
// ========================================
// Optimized Particle Creation (reduce from 50 to 20)
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 20; // Reduced for performance

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = Math.random() * 10 + 5 + 's';
    particlesContainer.appendChild(particle);
  }
}

// Use requestAnimationFrame for smooth scrolling
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Your scroll logic here
      ticking = false;
    });
    ticking = true;
  }
});
createParticles();

// ========================================
// Smooth Scrolling
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  });
});

// ========================================
// Navbar Scroll Effect
// ========================================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========================================
// Active Navigation
// ========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ========================================
// Fade In Animation on Scroll
// ========================================
const fadeInElements = document.querySelectorAll('.fade-in');
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

fadeInElements.forEach(element => observer.observe(element));

// ========================================
// Scroll to Top Button
// ========================================
const scrollTopBtn = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================================
// Contact Form with Enhanced Validation
// ========================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const subject = formData.get('subject').trim();
  const message = formData.get('message').trim();

  // Enhanced Validation
  if (!name || !email || !subject || !message) {
    showFormStatus('Please fill in all fields', 'error');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFormStatus('Please enter a valid email address', 'error');
    return;
  }

  const mailtoLink = `mailto:moha7med.abdelkader@gmail.com?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

  window.location.href = mailtoLink;

  showFormStatus('Opening your email client...', 'success');
  this.reset();
});

function showFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
  setTimeout(() => {
    formStatus.className = 'form-status';
  }, 5000);
}

// ========================================
// Real-time Form Validation
// ========================================
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
  input.addEventListener('blur', function () {
    if (this.value.trim() === '') {
      this.style.borderColor = 'rgba(255, 0, 0, 0.5)';
    } else if (this.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.value)) {
        this.style.borderColor = 'rgba(255, 0, 0, 0.5)';
      } else {
        this.style.borderColor = 'rgba(0, 217, 255, 0.5)';
      }
    } else {
      this.style.borderColor = 'rgba(0, 217, 255, 0.5)';
    }
  });

  input.addEventListener('focus', function () {
    this.style.borderColor = 'var(--primary)';
  });
});

// ========================================
// Counter Animation
// ========================================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 16);
}

// Animate counters when stats section is visible
const statsObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numbers = entry.target.querySelectorAll('.stat-number');
        numbers.forEach(num => {
          const target = parseInt(num.textContent);
          animateCounter(num, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const statsSection = document.querySelector('.stats-row');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ========================================
// Tech Badges Hover Effect
// ========================================
document.querySelectorAll('.tech-badge').forEach(badge => {
  badge.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-3px) scale(1.05)';
  });
  badge.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ========================================
// Typing Effect for Hero Greeting
// ========================================
const greetingText = document.querySelector('.hero-greeting');
if (greetingText) {
  const text = greetingText.textContent;
  greetingText.textContent = '';
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      greetingText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  setTimeout(typeWriter, 1000);
}

// ========================================
// Stagger Animations
// ========================================

// Skill cards stagger animation
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// Project cards stagger animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`;
});

// Service cards stagger animation
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.15}s`;
});

// Certification cards stagger animation
const certCards = document.querySelectorAll('.cert-card');
certCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// ========================================
// Keyboard Navigation Enhancement
// ========================================
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }
});

// ========================================
// Lazy Load Images (Performance)
// ========================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// Service Worker Registration (PWA)
// ========================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment when you have a service worker file
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered'))
    //     .catch(err => console.log('Service Worker registration failed'));
  });
}

// ========================================
// Console Easter Egg
// ========================================
console.log(
  "%c🚀 Welcome to Mohamed Abdelkader's Portfolio! ",
  'background: linear-gradient(135deg, #00D9FF 0%, #7B2CBF 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;',
);
console.log("%cLooking to hire? Let's connect! 💼", 'color: #00D9FF; font-size: 16px;');
console.log('%c📧 moha7med.abdelkader@gmail.com', 'color: #7B2CBF; font-size: 14px;');
console.log(
  '%c💡 Tip: Press Ctrl+Shift+I to explore the code!',
  'color: #FF006E; font-size: 12px;',
);

// ========================================
// Prevent Right-Click on Images (Optional)
// ========================================
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('contextmenu', e => {
    e.preventDefault();
  });
});

// ========================================
// Keyboard Navigation Focus Visible
// ========================================
document.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ========================================
// Screen Reader Announcer
// ========================================
const announcer = document.createElement('div');
announcer.setAttribute('role', 'status');
announcer.setAttribute('aria-live', 'polite');
announcer.setAttribute('aria-atomic', 'true');
announcer.style.position = 'absolute';
announcer.style.left = '-10000px';
announcer.style.width = '1px';
announcer.style.height = '1px';
announcer.style.overflow = 'hidden';
document.body.appendChild(announcer);

// Announce page sections for accessibility
const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        const sectionTitle = entry.target.querySelector('.section-title');
        if (sectionTitle) {
          announcer.textContent = `Viewing ${sectionTitle.textContent} section`;
        }
      }
    });
  },
  { threshold: 0.5 },
);

sections.forEach(section => {
  if (section.id && section.id !== 'home') {
    sectionObserver.observe(section);
  }
});

// ========================================
// Reduced Motion Preference
// ========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

prefersReducedMotion.addEventListener('change', e => {
  if (e.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
  } else {
    document.documentElement.style.setProperty('--animation-duration', '1s');
  }
});

// ========================================
// Network Status Indicator
// ========================================
window.addEventListener('online', () => {
  console.log('🟢 Back online');
});

window.addEventListener('offline', () => {
  console.log('🔴 You are offline');
});

// ========================================
// Print Optimization
// ========================================
window.addEventListener('beforeprint', () => {
  document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
  document.body.classList.remove('printing');
});

// ========================================
// Performance Metrics (LCP)
// ========================================
if ('PerformanceObserver' in window) {
  try {
    const perfObserver = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.renderTime || entry.loadTime);
        }
      }
    });
    perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // Browser doesn't support this API
  }
}

// ========================================
// Smooth Reveal on Page Load
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ========================================
// Console Info
// ========================================
console.log(
  '%c✨ Portfolio',
  'background: #000; color: #00D9FF; font-size: 14px; padding: 5px;',
);
