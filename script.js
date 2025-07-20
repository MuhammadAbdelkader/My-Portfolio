window.onload = () => {
  const name = document.getElementById('name');
  const text = "Mohamed Abdelkader";
  let i = 0;

  function type() {
    if (i < text.length) {
      name.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  }
  type();

  const fadeInEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  fadeInEls.forEach(el => observer.observe(el));
};
