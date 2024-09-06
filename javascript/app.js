const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target); // Stop observing once the class has been added
    }
  });
}, {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No margin
  threshold: 0.5 // Trigger when 50% of the element is visible
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

let btn = document.getElementById("btn");
let logo = document.getElementById("logo");
let logo_enlarged = document.getElementById("logo_enlarged");

btn.onclick = function () {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    logo.src = "logo/personal-logo-black-no-detail.svg";
    logo_enlarged.src = "logo/personal-logo-black-no-detail-outline.svg";
    btn.textContent = "light_mode";
  } else {
    logo.src = "logo/personal-logo-white-no-detail.svg";
    logo_enlarged.src = "logo/personal-logo-white-no-detail-v2.svg";
    btn.textContent = "dark_mode";
  }
};

document.getElementById("year").textContent = new Date().getFullYear();
