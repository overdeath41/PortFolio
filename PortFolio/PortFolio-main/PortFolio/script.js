// Fade-in animation au scroll
const sections = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Scroll smooth et bouton contact
const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    if(targetId === "contact") {
      const contactSection = document.getElementById('contact');
      contactSection.classList.toggle('hidden');
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      const targetSection = document.getElementById(targetId);
      if(targetSection){
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
