/*
========================================
LIGHTBOX – MICHAŁ MACURA (SETUP)
========================================

DECYZJE PROJEKTOWE:

- jeden plik zdjęcia (brak miniatur)
- zdjęcia w galerii = 1624×1080 px
- brak dodatkowych wersji eksportu
- lightbox używa tego samego pliku
- priorytet: prosty workflow + minimalizm

ZALETY:
✔ brak podwójnego eksportu
✔ szybka publikacja zdjęć
✔ prosty system folderów
✔ lekkie i stabilne rozwiązanie

STRUKTURA:
- HTML pokazuje obraz w gridzie
- JS otwiera ten sam obraz w overlay
- brak zewnętrznych bibliotek

========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    // Tworzymy overlay lightboxa
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.style.position = "fixed";
    lightbox.style.top = "0";
    lightbox.style.left = "0";
    lightbox.style.width = "100%";
    lightbox.style.height = "100%";
    lightbox.style.background = "rgba(0,0,0,0.9)";
    lightbox.style.display = "none";
    lightbox.style.alignItems = "center";
    lightbox.style.justifyContent = "center";
    lightbox.style.zIndex = "1000";
    lightbox.style.cursor = "zoom-out";

    // Obraz w lightboxie
    const img = document.createElement("img");
    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    img.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";

    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    // Kliknięcie w dowolne zdjęcie z galerii
    const images = document.querySelectorAll(".photo-grid img");

    images.forEach(image => {
        image.style.cursor = "pointer";

        image.addEventListener("click", () => {
            img.src = image.src;
            lightbox.style.display = "flex";
        });
    });

    // Zamknięcie lightboxa
    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
        img.src = "";
    });

    // ESC zamyka lightbox
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            lightbox.style.display = "none";
            img.src = "";
        }
    });

});