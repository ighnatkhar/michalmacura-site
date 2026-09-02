/*
==========================================================
LIGHTBOX – MICHAŁ MACURA
==========================================================

ZAŁOŻENIA:

- jedno zdjęcie = jeden plik
- brak osobnych miniaturek
- zdjęcia przygotowane do internetu: około 1624 × 1080 px
- miniatura na stronie jest tym samym zdjęciem
- po kliknięciu zdjęcie otwiera się w lightboxie
- lightbox wykorzystuje ten sam plik zdjęcia
- maksymalny rozmiar zdjęcia = rozmiar dostępnego ekranu
- zdjęcie zachowuje proporcje
- przechodzenie LEWO / PRAWO
- galeria jest zapętlona:
      ostatnie → pierwsze
      pierwsze ← ostatnie
- klawisz ESC zamyka lightbox
- strzałki na klawiaturze zmieniają zdjęcia
- przesunięcie palcem na telefonie zmienia zdjęcie
- brak zewnętrznych bibliotek

==========================================================
*/


document.addEventListener("DOMContentLoaded", () => {

    /*
    ------------------------------------------------------
    ZNAJDŹ WSZYSTKIE ZDJĘCIA GALERII
    ------------------------------------------------------
    */

    const images = Array.from(
        document.querySelectorAll(".photo-grid img")
    );

    // Jeżeli na stronie nie ma galerii, nic nie rób.
    if (images.length === 0) {
        return;
    }


    /*
    ------------------------------------------------------
    UTWORZENIE LIGHTBOXA
    ------------------------------------------------------
    */

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";


    /*
    ------------------------------------------------------
    PRZYCISK ZAMKNIĘCIA
    ------------------------------------------------------
    */

    const closeButton = document.createElement("button");
    closeButton.className = "lightbox-close";
    closeButton.setAttribute("aria-label", "Zamknij");

    closeButton.innerHTML = "&times;";


    /*
    ------------------------------------------------------
    PRZYCISK POPRZEDNIEGO ZDJĘCIA
    ------------------------------------------------------
    */

    const previousButton = document.createElement("button");
    previousButton.className = "lightbox-previous";
    previousButton.setAttribute("aria-label", "Poprzednie zdjęcie");

    previousButton.innerHTML = "&#10094;";


    /*
    ------------------------------------------------------
    PRZYCISK NASTĘPNEGO ZDJĘCIA
    ------------------------------------------------------
    */

    const nextButton = document.createElement("button");
    nextButton.className = "lightbox-next";
    nextButton.setAttribute("aria-label", "Następne zdjęcie");

    nextButton.innerHTML = "&#10095;";


    /*
    ------------------------------------------------------
    ZDJĘCIE W LIGHTBOXIE
    ------------------------------------------------------
    */

    const lightboxImage = document.createElement("img");

    lightboxImage.className = "lightbox-image";

    lightboxImage.alt = "";


    /*
    ------------------------------------------------------
    UMIESZCZENIE ELEMENTÓW W LIGHTBOXIE
    ------------------------------------------------------
    */

    lightbox.appendChild(closeButton);
    lightbox.appendChild(previousButton);
    lightbox.appendChild(lightboxImage);
    lightbox.appendChild(nextButton);

    document.body.appendChild(lightbox);


    /*
    ------------------------------------------------------
    AKTUALNY NUMER ZDJĘCIA
    ------------------------------------------------------
    */

    let currentIndex = 0;


    /*
    ------------------------------------------------------
    FUNKCJA OTWIERAJĄCA LIGHTBOX
    ------------------------------------------------------
    */

    function openLightbox(index) {

        currentIndex = index;

        updateLightbox();

        lightbox.classList.add("is-open");

        document.body.classList.add("lightbox-open");
    }


    /*
    ------------------------------------------------------
    FUNKCJA ZAMYKAJĄCA LIGHTBOX
    ------------------------------------------------------
    */

    function closeLightbox() {

        lightbox.classList.remove("is-open");

        document.body.classList.remove("lightbox-open");

        lightboxImage.src = "";
    }


    /*
    ------------------------------------------------------
    AKTUALIZACJA ZDJĘCIA
    ------------------------------------------------------
    */

    function updateLightbox() {

        const image = images[currentIndex];

        lightboxImage.src = image.src;

        lightboxImage.alt = image.alt;
    }


    /*
    ------------------------------------------------------
    NASTĘPNE ZDJĘCIE
    ------------------------------------------------------
    */

    function nextImage() {

        currentIndex++;

        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        updateLightbox();
    }


    /*
    ------------------------------------------------------
    POPRZEDNIE ZDJĘCIE
    ------------------------------------------------------
    */

    function previousImage() {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }

        updateLightbox();
    }


    /*
    ------------------------------------------------------
    KLIKNIĘCIA W MINIATURY
    ------------------------------------------------------
    */

    images.forEach((image, index) => {

        image.addEventListener("click", () => {
            openLightbox(index);
        });

    });


    /*
    ------------------------------------------------------
    PRZYCISKI LIGHTBOXA
    ------------------------------------------------------
    */

    closeButton.addEventListener("click", closeLightbox);

    nextButton.addEventListener("click", nextImage);

    previousButton.addEventListener("click", previousImage);


    /*
    ------------------------------------------------------
    KLIKNIĘCIE W TŁO
    ------------------------------------------------------
    
    Kliknięcie poza zdjęciem zamyka lightbox.
    */

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    /*
    ------------------------------------------------------
    KLAWIATURA
    ------------------------------------------------------
    */

    document.addEventListener("keydown", (event) => {

        if (!lightbox.classList.contains("is-open")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            nextImage();
        }

        if (event.key === "ArrowLeft") {
            previousImage();
        }

    });


    /*
    ------------------------------------------------------
    OBSŁUGA SWIPE NA TELEFONIE
    ------------------------------------------------------
    */

    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener("touchstart", (event) => {

        touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });


    lightbox.addEventListener("touchend", (event) => {

        touchEndX = event.changedTouches[0].screenX;

        handleSwipe();

    }, { passive: true });


    function handleSwipe() {

        const minimumSwipeDistance = 50;

        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) < minimumSwipeDistance) {
            return;
        }

        if (distance < 0) {
            nextImage();
        } else {
            previousImage();
        }

    }


});
