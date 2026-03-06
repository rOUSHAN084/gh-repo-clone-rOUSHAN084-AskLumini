const typingElement = document.getElementById('typing');
const words = ['React & Next.js', 'Node.js APIs', 'Cloud & DevOps', 'AI-Powered Apps'];
let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function runTyping() {
  const current = words[wordIndex];
  typingElement.textContent = current.slice(0, letterIndex);

  if (!deleting && letterIndex < current.length) {
    letterIndex += 1;
  } else if (deleting && letterIndex > 0) {
    letterIndex -= 1;
  } else {
    deleting = !deleting;
    if (!deleting) wordIndex = (wordIndex + 1) % words.length;
  }

  const speed = deleting ? 55 : 95;
  setTimeout(runTyping, letterIndex === current.length ? 1200 : speed);
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    projects.forEach((project) => {
      const visible = filter === 'all' || project.dataset.category === filter;
      project.style.display = visible ? 'block' : 'none';
    });
  });
});

const testimonials = [
  {
    text: '“Roushan consistently ships high-quality software with exceptional attention to detail.”',
    author: '— Product Manager, Lumini Labs',
  },
  {
    text: '“A strong engineer who understands both code and product outcomes.”',
    author: '— Engineering Lead, NovaTech',
  },
  {
    text: '“Reliable, collaborative, and always focused on delivering value.”',
    author: '— Startup Founder',
  },
];

let testimonialIndex = 0;
const testimonialText = document.getElementById('testimonial-text');
const testimonialAuthor = document.getElementById('testimonial-author');

setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  testimonialText.textContent = testimonials[testimonialIndex].text;
  testimonialAuthor.textContent = testimonials[testimonialIndex].author;
}, 4000);

const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
});

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thanks! Your message has been captured. I will get back to you soon.');
  event.target.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
runTyping();
