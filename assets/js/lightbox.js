document.addEventListener("DOMContentLoaded", () => {
    const images = Array.from(
        document.querySelectorAll(".photo-grid img, .article-figure img")
    );

    if (!images.length) return;

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";

    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Zamknij">&times;</button>
        <button class="lightbox-previous" aria-label="Poprzednie zdjęcie">&#10094;</button>
        <img class="lightbox-image" src="" alt="">
        <button class="lightbox-next" aria-label="Następne zdjęcie">&#10095;</button>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const closeButton = lightbox.querySelector(".lightbox-close");
    const previousButton = lightbox.querySelector(".lightbox-previous");
    const nextButton = lightbox.querySelector(".lightbox-next");

    let currentIndex = 0;
    let touchStartX = 0;

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;

        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt || "";

        lightboxImage.classList.remove("slide-left", "slide-right");
    }

    function openLightbox(index) {
        showImage(index);
        lightbox.classList.add("is-open");
        document.body.classList.add("lightbox-open");
    }

    function closeLightbox() {
        lightbox.classList.remove("is-open");
        document.body.classList.remove("lightbox-open");
    }

    function showNext() {
        showImage(currentIndex + 1);
    }

    function showPrevious() {
        showImage(currentIndex - 1);
    }

    images.forEach((image, index) => {
        image.style.cursor = "zoom-in";
        image.addEventListener("click", () => openLightbox(index));
    });

    closeButton.addEventListener("click", closeLightbox);
    nextButton.addEventListener("click", showNext);
    previousButton.addEventListener("click", showPrevious);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("is-open")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showNext();
        }

        if (event.key === "ArrowLeft") {
            showPrevious();
        }
    });

    lightbox.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener("touchend", (event) => {
        const touchEndX = event.changedTouches[0].screenX;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                showNext();
            } else {
                showPrevious();
            }
        }
    }, { passive: true });
});
