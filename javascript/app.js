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
  btn: document.getElementById("theme_btn"),
  btnIcon: document.getElementById("theme_btn_icon"),
  logo: document.getElementById("logo"),
  logoEnlarged: document.getElementById("logo_enlarged"),
  heroImage: document.getElementById("hero_image"),
  
  toggle() {
    const isLight = document.body.classList.toggle("light-theme");
    this.updateUI(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  },

  updateUI(isLight) {
    this.logo.src = `logo/logo-${isLight ? 'black' : 'white'}.svg`;
    this.logoEnlarged.src = `logo/logo-${isLight ? 'black' : 'white'}-outline.svg`;
    this.btnIcon.textContent = `${isLight ? 'dark' : 'light'}_mode`;
    this.heroImage.src = `images/hero-image${isLight ? '-light' : ''}.webp`;
  },

  init() {
    const stored = localStorage.getItem('theme');
    const isLight = stored ? stored === 'light' 
                  : !matchMedia('(prefers-color-scheme: dark)').matches;
    
    isLight && document.body.classList.add('light-theme');
    this.updateUI(isLight);
    this.btn.onclick = () => this.toggle();
  }
};

document.addEventListener('DOMContentLoaded', () => theme.init());

// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-button');
  const dropdownContent = document.querySelector('.dropdown-content');
  
  const toggleMenu = () => {
    dropdownContent.classList.toggle('active');
      menuBtn.querySelector('.menu-icon').textContent = 
      dropdownContent.classList.contains('active') ? 'close' : 'menu';
  };

  menuBtn.addEventListener('click', toggleMenu);
  
  // Close menu when clicking outside or on a link
  document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !dropdownContent.contains(e.target) ||
          e.target.closest('a')) {
          dropdownContent.classList.remove('active');
          menuBtn.querySelector('.menu-icon').textContent = 'menu';
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
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.dropdown-content a[href="#${id}"]`);

        if (entry.isIntersecting) {
          navLinks.forEach((navLink) => navLink.classList.remove('active'));
          link.classList.add('active');
        }
      });
    },
    {
      root: null, // Viewport as the container
      threshold: 0.5, // Trigger when 50% of the section is visible
    }
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


