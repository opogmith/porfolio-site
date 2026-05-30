const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const closeButton = document.querySelector(".lightbox-close");
const galleryButtons = document.querySelectorAll(".gallery-item");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

function openLightbox(button) {
  const full = button.dataset.full;
  const caption = button.dataset.caption || "";
  const image = button.querySelector("img");

  if (!full || !lightbox || !lightboxImage || !lightboxCaption) {
    return;
  }

  lightboxImage.src = full;
  lightboxImage.alt = image ? image.alt : caption;
  lightboxCaption.textContent = caption;
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
}

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => openLightbox(button));
});

closeButton?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("open")) {
    closeLightbox();
  }
});
