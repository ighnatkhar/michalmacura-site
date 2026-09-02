document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".home-navigation");


    if (!menuToggle || !navigation) {
        return;
    }


    menuToggle.addEventListener("click", () => {

        navigation.classList.toggle("is-open");

        const isOpen =
            navigation.classList.contains("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /*
    Zamknięcie menu po kliknięciu
    w dowolny link.
    */

    navigation.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

});