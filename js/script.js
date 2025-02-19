// hamburgherul
document.addEventListener("DOMContentLoaded", function () {
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const hamburgerMenu = document.getElementById("hamburger-menu");

    hamburgerIcon.addEventListener("click", function () {
        if (hamburgerMenu.style.display === "none" || hamburgerMenu.style.display === "") {
            hamburgerMenu.style.display = "block";
            hamburgerIcon.classList.remove("fa-bars");
            hamburgerIcon.classList.add("fa-times");
        } else {
            hamburgerMenu.style.display = "none";
            hamburgerIcon.classList.remove("fa-times");
            hamburgerIcon.classList.add("fa-bars");
        }
    });
});


// schimbarea anilor
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('ani-container').textContent = currentYear;
});


// butonul pentru a derula pagina
// Afișează butonul atunci când derulezi în jos
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

// Derulează în sus atunci când butonul este apăsat
document.getElementById("scrollToTopBtn").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});








// cum bara de navigare se schimba la derulare
window.addEventListener('scroll', function () {
    var bara2 = document.getElementById('bara2');
    if (window.scrollY > 100) {
        bara2.classList.add('scrolled');
    } else {
        bara2.classList.remove('scrolled');
    }
});








