document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger-menu");
    const menu = document.querySelector(".menu-mobile");  // Selectăm div-ul existent cu clasa "menu-mobile"

    const closeMenu = menu.querySelector(".menu-close");

    hamburger.addEventListener("click", function () {
        menu.classList.add("show");  // Arată meniul când se dă click pe butonul hamburger
    });

    closeMenu.addEventListener("click", function () {
        menu.classList.remove("show");  // Închide meniul când se dă click pe butonul de închidere
    });

    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
            menu.classList.remove("show");  // Închide meniul dacă se face click în afară de el
        }
    });
});
