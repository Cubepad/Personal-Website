const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Stop observing once the class has been added
      }
    });
  },
  {
    root: null, // Use the viewport as the root
    rootMargin: "0px", // No margin
    threshold: 0.4, // Trigger when 40% of the element is visible
  }
);

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));


// Dark and Light Theme
const theme = {
  btn:            null,
  moonIcon:       null,
  sunIcon:        null,
  logo:           null,
  logoEnlarged:   null,
  themeColorMeta: null,

  toggle() {
    const isLight = document.body.classList.toggle("light-theme");
    this.updateUI(isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
  },

  updateUI(isLight) {
    // only swap logo if it exists
    if (this.logo) {
      this.logo.src = `logo/logo-${isLight ? "black" : "white"}.svg`;
    }
    if (this.logoEnlarged) {
      this.logoEnlarged.src = `logo/logo-${isLight ? "black" : "white"}-outline.svg`;
    }

    // toggle icons
    if (this.moonIcon) this.moonIcon.style.display = isLight ? "block" : "none";
    if (this.sunIcon)  this.sunIcon.style.display  = isLight ? "none"  : "block";

    if (this.themeColorMeta) {
      const bg = isLight ? "rgb(195, 202, 236)" : "rgb(8, 8, 16)";
      this.themeColorMeta.setAttribute("content", bg);
    }
  },

  init() {
    // grab everything *after* DOM is ready
    document.addEventListener("DOMContentLoaded", () => {
      this.btn            = document.getElementById("theme_btn");
      this.moonIcon       = document.getElementById("moon_icon");
      this.sunIcon        = document.getElementById("sun_icon");
      this.logo           = document.getElementById("logo");
      this.logoEnlarged   = document.getElementById("logo_enlarged");
      this.themeColorMeta = document.getElementById("theme-color-meta");

      // read stored or system preference
      const stored = localStorage.getItem("theme");
      const isLight = stored
        ? stored === "light"
        : !matchMedia("(prefers-color-scheme: dark)").matches;

      if (isLight) document.body.classList.add("light-theme");
      this.updateUI(isLight);

      // only hook up the button if it actually exists
      if (this.btn) this.btn.addEventListener("click", () => this.toggle());
    });
  }
};

// kick it off
theme.init();


document.addEventListener('DOMContentLoaded', () => theme.init());

// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-button');
  const dropdownContent = document.querySelector('.dropdown-content');
  const hamburgerIcon = document.getElementById('hamburger_icon');
  const closeIcon = document.getElementById('close_icon');
 
  const toggleMenu = () => {
    const isActive = dropdownContent.classList.toggle('active');
    
    // Toggle icon visibility
    hamburgerIcon.style.display = isActive ? 'none' : 'block';
    closeIcon.style.display = isActive ? 'block' : 'none';
  };
  
  menuBtn.addEventListener('click', toggleMenu);
 
  // Close menu when clicking outside or on a link
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !dropdownContent.contains(e.target) ||
        e.target.closest('a')) {
      dropdownContent.classList.remove('active');
      
      // Reset to hamburger icon
      hamburgerIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.dropdown-content a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        const link = document.querySelector(`.dropdown-content a[href="#${id}"]`);

        if (entry.isIntersecting && link) {
          // remove .active from all
          navLinks.forEach((a) => a.classList.remove('active'));
          // add it only if we found the link
          link.classList.add('active');
        }
      });
    },
    { root: null, threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));
});



document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section'); // Select all sections
  const header = document.querySelector('.header');

  // Set up an IntersectionObserver to watch all sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Check if the current section is #home
          if (entry.target.id === 'home') {
            header.style.maxWidth = '1280px'; // Reset to default width for #home
          } else {
            header.style.maxWidth = '760px'; // Set to 860px for all other sections
          }
        }
      });
    },
    {
      root: null, // Observe in the viewport
      threshold: 0.4, // Trigger when even a small portion of the section is visible
    }
  );

  // Observe each section
  sections.forEach((section) => {
    observer.observe(section);
  });
});


// Set the start date when you began web development
const startDate = new Date('2024-07-01'); // Replace with your actual start date (YYYY-MM-DD)

// Get today's date
const today = new Date();

// Calculate the difference in months
const monthsOfExperience =
  (today.getFullYear() - startDate.getFullYear()) * 12 +
  (today.getMonth() - startDate.getMonth());

// Determine what to display
let experienceText;
if (monthsOfExperience < 12) {
  experienceText = `${monthsOfExperience}+ month${monthsOfExperience !== 1 ? 's' : ''}`;
} else {
  const years = Math.floor(monthsOfExperience / 12);
  experienceText = `${years}+ year${years > 1 ? 's' : ''}`;
}

// Update the text on your website
document.getElementById('experience').textContent = experienceText;


// Fix for mobile viewport height issues
window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
});
// Initial call
document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);