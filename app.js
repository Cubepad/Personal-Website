const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting) {
      entry.target.classList.add('show');

      }
  });
});
  
  
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));

  let btn = document.getElementById("btn");

  btn.onclick = function(){
    document.body.classList.toggle("light-theme");
  }


  