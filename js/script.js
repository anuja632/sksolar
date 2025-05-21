
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add 'animate' class to all .sk-progress-fill inside this block
        const progressFills = entry.target.querySelectorAll(".sk-progress-fill");
        progressFills.forEach(el => el.classList.add("animate"));

        // You can add other visual animations here if needed
        entry.target.classList.add("visible"); 
        observer.unobserve(entry.target); // Optional: only animate once
      }
    });
  }, {
    threshold: 0.3 // Trigger when 30% visible
  });

  animatedElements.forEach(el => {
    observer.observe(el);
  });
});

const currentPath = window.location.pathname.split("/").pop();

// Highlight subpage in sidebar (tab buttons)
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(button => {
  const buttonPath = button.getAttribute('href').split("/").pop();
  if (buttonPath === currentPath) {
    button.classList.add('active');
  } else {
    button.classList.remove('active');
  }
});


// Highlight main nav link (only "services.html" stays active for service subpages)
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  const linkPath = link.getAttribute('href').split("/").pop();

  const isServiceSubpage = [
    "services.html", "after.html", "amc.html", "power.html", "installation.html"
  ].includes(currentPath);

  if (linkPath === "services.html" && isServiceSubpage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});


// Optional: Re-highlight nav if tabs change without page reload
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    // If using dynamic tabs (no reload), force navbar to highlight services
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href').split("/").pop();
      if (linkPath === "services.html") {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
  
});


const strip = document.querySelector('.trust-strip');
const slides = document.querySelectorAll('.trust-slide');

let currentIndex = 0;
const visibleSlides = 3;
const totalSlides = slides.length;
let autoplayInterval;

function updateSlide() {
  const slideWidth = slides[0].offsetWidth;
  strip.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function moveNext() {
  currentIndex++;
  if (currentIndex > totalSlides - visibleSlides) {
    currentIndex = 0;
  }
  updateSlide();
}

function startAutoplay() {
  autoplayInterval = setInterval(moveNext, 3000); // Change every 3 seconds
}

window.addEventListener('resize', updateSlide);

window.addEventListener('load', () => {
  updateSlide();
  startAutoplay();
});

// Get the button
let mybutton = document.getElementById("scrollToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Pages that belong to "Our Services"
  const servicePages = [
    "service.html", "solarservice.html", "fabrication.html",
    "services.html", "after.html", "amc.html", "power.html", "installation.html"
  ];

  // Get current filename
  const currentPath = window.location.pathname.split("/").pop();

  // Get all nav links
  const navLinks = document.querySelectorAll('.nav-link');

  // Get "Our Services" link specifically by ID
  const ourServicesLink = document.getElementById("ourServicesDropdown");

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href')?.split("/").pop();

    // If current page is a service subpage, make "Our Services" active
    if (servicePages.includes(currentPath)) {
      if (link === ourServicesLink) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    } else {
      // If it's not a service page, highlight the exact matching link
      if (linkPath === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
});

// Smooth Scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
});

