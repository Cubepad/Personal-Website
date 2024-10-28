const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Stop observing once the class has been added
      }
    });
  },
  {
    root: null, // Use the viewport as the root
    rootMargin: "0px", // No margin
    threshold: 0.5, // Trigger when 50% of the element is visible
  }
);

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));


// Dark and Light Theme
const theme = {
  btn: document.getElementById("theme_btn"),
  logo: document.getElementById("logo"),
  logoEnlarged: document.getElementById("logo_enlarged"),
  
  toggle() {
    const isLight = document.body.classList.toggle("light-theme");
    this.updateUI(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  },

  updateUI(isLight) {
    this.logo.src = `logo/personal-logo-${isLight ? 'black' : 'white'}-no-detail.svg`;
    this.logoEnlarged.src = `logo/personal-logo-${isLight ? 'black' : 'white'}-no-detail${isLight ? '-outline' : '-v2'}.svg`;
    this.btn.textContent = `${isLight ? 'light' : 'dark'}_mode`;
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
