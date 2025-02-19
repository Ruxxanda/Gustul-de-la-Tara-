let currentIndex = 0;

// Detectăm numărul de slide-uri afișate în funcție de dimensiunea ecranului
function getVisibleSlides() {
    return window.innerWidth < 730 ? 2 : 4;
}

document.addEventListener('DOMContentLoaded', () => {
    updateSlides(); // Actualizează slide-urile la încărcarea paginii
    window.addEventListener('resize', updateSlides); // Recalculează la redimensionare
});

function moveLeft() {
    const slides = document.querySelectorAll('.sectiuni .slide');
    const totalSlides = slides.length;
    const visibleSlides = getVisibleSlides();

    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalSlides - visibleSlides; // Ajustare pentru ultimul set de slide-uri
    }
    updateSlides();
}

function moveRight() {
    const slides = document.querySelectorAll('.sectiuni .slide');
    const totalSlides = slides.length;
    const visibleSlides = getVisibleSlides();

    const maxIndex = totalSlides - visibleSlides;
    if (currentIndex < maxIndex) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlides();
}

function updateSlides() {
    const slides = document.querySelectorAll('.sectiuni .slide');
    const visibleSlides = getVisibleSlides();

    slides.forEach((slide, index) => {
        if (index >= currentIndex && index < currentIndex + visibleSlides) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
}

// Glisarea între poze și informații

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.slaid-buton');
    const contents = document.querySelectorAll('.slaid-content');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            contents.forEach(content => content.style.display = 'none');
            const activeContent = document.getElementById(this.dataset.target);
            activeContent.style.display = 'block';

            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    if (buttons.length > 0) {
        buttons[0].classList.add('active');
        document.getElementById(buttons[0].dataset.target).style.display = 'block';
    }
});





// glisarea intre poze informatii 
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.slaid-buton');
    const contents = document.querySelectorAll('.slaid-content');

    // Adăugăm listeneri pe fiecare buton
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Ascunde toate conținuturile
            contents.forEach(content => content.style.display = 'none');

            // Afișează conținutul corespunzător butonului apăsat
            const activeContent = document.getElementById(this.dataset.target);
            activeContent.style.display = 'block';

            // Actualizează clasa 'active'
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Setează butonul inițial și conținutul său ca fiind active
    if (buttons.length > 0) {
        buttons[0].classList.add('active');
        const initialContentId = buttons[0].dataset.target;
        document.getElementById(initialContentId).style.display = 'block';
    }
});