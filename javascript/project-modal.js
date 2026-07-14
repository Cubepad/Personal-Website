// Add a new project by adding an entry here + a matching
// data-project="key" attribute on a details-button.
const projectsData = {
  "arduino-1": {
    title: "Coin Collecting Game",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam.",
    images: ["/images/pureride.webp", "/images/cubepad.webp", "/images/cubepad.webp", "/images/cubepad.webp"],
  },
};

const modal = document.getElementById("project-modal");
const modalImage = modal.querySelector(".gallery-main-image");
const modalTitle = modal.querySelector(".modal-title");
const modalDesc = modal.querySelector(".modal-description");
const prevBtn = modal.querySelector(".gallery-prev");
const nextBtn = modal.querySelector(".gallery-next");
const closeBtn = modal.querySelector(".modal-close");
const modalDots = modal.querySelector(".gallery-dots");


let currentImages = [];
let currentIndex = 0;
let transitionTimeout = null;


function showImage(index) {
  currentIndex = (index + currentImages.length) % currentImages.length;

  modalImage.classList.add("is-changing");

  clearTimeout(transitionTimeout);
  transitionTimeout = setTimeout(() => {
    modalImage.src = currentImages[currentIndex];
    modalImage.alt = `${modalTitle.textContent} - image ${currentIndex + 1}`;
    modalImage.classList.remove("is-changing");
  }, 200);

  modalDots.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function openModal(projectId) {
  const project = projectsData[projectId];
  if (!project) return;

  currentImages = project.images;
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.description;

  modalDots.innerHTML = "";
  currentImages.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot";
    dot.setAttribute("aria-label", `Go to image ${i + 1}`);
    dot.addEventListener("click", () => showImage(i));
    modalDots.appendChild(dot);
  });

  showImage(0);

  modal.classList.remove("hidden");
  void modal.offsetWidth;
  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
  // Wait for the CSS transition to finish before fully hiding
  modal.addEventListener(
    "transitionend",
    () => modal.classList.add("hidden"),
    { once: true }
  );
}

// Event delegation: works for any current or future .details-button
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".details-button");
  if (btn) openModal(btn.dataset.project);
});

closeBtn.addEventListener("click", closeModal);
prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});