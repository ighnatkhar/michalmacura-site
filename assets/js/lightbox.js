/* =====================================================
   LIGHTBOX – galeria + zdjęcia w artykułach
   Zastąp tym plikiem zawartość assets/js/lightbox.js
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const images = Array.from(
        document.querySelectorAll(".photo-grid img, .article-figure img")
    );

    if (!images.length) return;

    let currentIndex = 0;
    let touchStartX = 0;

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Powiększone zdjęcie");

    const lightboxImage = document.createElement("img");
    lightboxImage.className = "lightbox-image";
    lightboxImage.alt = "";

    const closeButton = document.createElement("button");
    closeButton.className = "lightbox-close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Zamknij");
    closeButton.innerHTML = "&times;";

    const previousButton = document.createElement("button");
    previousButton.className = "lightbox-prev";
    previousButton.type = "button";
    previousButton.setAttribute("aria-label", "Poprzednie zdjęcie");
    previousButton.innerHTML = "&#10094;";

    const nextButton = document.createElement("button");
    nextButton.className = "lightbox-next";
    nextButton.type = "button";
    nextButton.setAttribute("aria-label", "Następne zdjęcie");
    nextButton.innerHTML = "&#10095;";

    lightbox.append(lightboxImage, closeButton, previousButton, nextButton);
    document.body.appendChild(lightbox);

    function updateLightbox(direction = null) {
        lightboxImage.classList.remove("slide-left", "slide-right");
        void lightboxImage.offsetWidth;

        const selectedImage = images[currentIndex];
        lightboxImage.src = selectedImage.currentSrc || selectedImage.src;
        lightboxImage.alt = selectedImage.alt || "";

        if (direction === "next") lightboxImage.classList.add("slide-left");
        if (direction === "previous") lightboxImage.classList.add("slide-right");

        const hasMultiple = images.length > 1;
        previousButton.style.display = hasMultiple ? "" : "none";
        nextButton.style.display = hasMultiple ? "" : "none";
    }

    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add("active");
        document.body.classList.add("lightbox-open");
        closeButton.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.classList.remove("lightbox-open");
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox("next");
    }

    function previousImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox("previous");
    }

    images.forEach((image, index) => {
        image.addEventListener("click", () => openLightbox(index));
        image.setAttribute("tabindex", "0");
        image.setAttribute("role", "button");
        image.setAttribute("aria-label", "Otwórz zdjęcie w powiększeniu");

        image.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(index);
            }
        });
    });

    closeButton.addEventListener("click", closeLightbox);
    previousButton.addEventListener("click", previousImage);
    nextButton.addEventListener("click", nextImage);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("active")) return;
        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") nextImage();
        if (event.key === "ArrowLeft") previousImage();
    });

    lightbox.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener("touchend", (event) => {
        const difference = event.changedTouches[0].screenX - touchStartX;
        if (Math.abs(difference) < 50) return;
        if (difference < 0) nextImage();
        else previousImage();
    }, { passive: true });
});
