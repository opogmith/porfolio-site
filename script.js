const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const closeButton = document.querySelector(".lightbox-close");
const prevButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");
const galleryButtons = Array.from(document.querySelectorAll(".gallery-item"));
const year = document.querySelector("#year");

let activeGallery = [];
let activeIndex = 0;

if (year) {
  year.textContent = new Date().getFullYear();
}

function getGalleryItems(button) {
  const gallery = button.closest(".gallery");
  return gallery ? Array.from(gallery.querySelectorAll(".gallery-item")) : [button];
}

function updateNavButtons() {
  if (!prevButton || !nextButton) {
    return;
  }

  prevButton.disabled = activeIndex <= 0;
  nextButton.disabled = activeIndex >= activeGallery.length - 1;
}

function renderLightboxImage() {
  const button = activeGallery[activeIndex];
  const full = button?.dataset.full;
  const caption = button?.dataset.caption || "";
  const image = button?.querySelector("img");

  if (!full || !lightboxImage || !lightboxCaption) {
    return;
  }

  lightboxImage.src = full;
  lightboxImage.alt = image ? image.alt : caption;
  lightboxCaption.textContent = caption;
  updateNavButtons();
}

function openLightbox(button) {
  if (!lightbox || !lightboxImage || !lightboxCaption) {
    return;
  }

  activeGallery = getGalleryItems(button);
  activeIndex = Math.max(activeGallery.indexOf(button), 0);
  renderLightboxImage();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeButton?.focus();
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
  activeGallery = [];
  activeIndex = 0;
}

function showNextImage() {
  if (activeIndex < activeGallery.length - 1) {
    activeIndex += 1;
    renderLightboxImage();
  }
}

function showPreviousImage() {
  if (activeIndex > 0) {
    activeIndex -= 1;
    renderLightboxImage();
  }
}

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => openLightbox(button));
});

closeButton?.addEventListener("click", closeLightbox);
nextButton?.addEventListener("click", showNextImage);
prevButton?.addEventListener("click", showPreviousImage);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox?.classList.contains("open")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    showNextImage();
  }

  if (event.key === "ArrowLeft") {
    showPreviousImage();
  }
});
