// Add a new project by adding an entry here + a matching
// data-project="key" attribute on a details-button.
const projectsData = {
  "arduino-1": {
    title: "Arduino Project 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam.",
    images: ["/images/pureride.webp", "/images/cubepad.webp"],
  },
};

const modal = document.getElementById("project-modal");
const modalImage = modal.querySelector(".gallery-main-image");
const modalThumbs = modal.querySelector(".gallery-thumbnails");
const modalTitle = modal.querySelector(".modal-title");
const modalDesc = modal.querySelector(".modal-description");
const prevBtn = modal.querySelector(".gallery-prev");
const nextBtn = modal.querySelector(".gallery-next");
const closeBtn = modal.querySelector(".modal-close");

let currentImages = [];
let currentIndex = 0;

function showImage(index) {
  currentIndex = (index + currentImages.length) % currentImages.length;
  modalImage.src = currentImages[currentIndex];
  modalImage.alt = `${modalTitle.textContent} - image ${currentIndex + 1}`;
  modalThumbs.querySelectorAll("img").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === currentIndex);
  });
}

function openModal(projectId) {
  const project = projectsData[projectId];
  if (!project) return;

  currentImages = project.images;
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.description;

  modalThumbs.innerHTML = "";
  currentImages.forEach((src, i) => {
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.alt = `Thumbnail ${i + 1}`;
    thumb.addEventListener("click", () => showImage(i));
    modalThumbs.appendChild(thumb);
  });

  showImage(0);

  modal.classList.remove("hidden");
  // Force a reflow so the browser registers "hidden" removal
  // before "active" is added, so the transition actually plays.
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