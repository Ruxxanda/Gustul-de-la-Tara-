// Selectează toate imaginile și elementele modalului
const images = document.querySelectorAll(".galerie img");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentImageIndex = 0;

// Asigură-te că elementele există înainte de a adăuga evenimente
if (images.length && imageModal && modalImage && prevBtn && nextBtn) {
    // Deschide imaginea în modal
    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            imageModal.style.display = "flex";
            modalImage.src = img.src;
            currentImageIndex = index;
        });
    });

    // Închide modalul dacă faci clic în afara imaginii
    imageModal.addEventListener("click", (e) => {
        if (e.target === imageModal || e.target === modalImage) {
            imageModal.style.display = "none";
        }
    });

    // Navighează la imaginea anterioară
    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Previne închiderea modalului
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        modalImage.src = images[currentImageIndex].src;
    });

    // Navighează la imaginea următoare
    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Previne închiderea modalului
        currentImageIndex = (currentImageIndex + 1) % images.length;
        modalImage.src = images[currentImageIndex].src;
    });

    // Închide modalul la apăsarea tastei Esc
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && imageModal.style.display === "flex") {
            imageModal.style.display = "none";
        }
    });
} else {
    console.error("Elemente lipsă: verifică structura HTML.");
}