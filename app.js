const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
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
  } else {
    logo.src = "logo/personal-logo-white-no-detail.svg";
    logo_enlarged.src = "logo/personal-logo-white-no-detail-v2.svg";
  }
};
