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








document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");

    function revealSections() {
        const triggerBottom = window.innerHeight * 0.8;

        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections(); // Verifică secțiunile la încărcare
});




























async function fetchData() {
    const response = await fetch("http://localhost:3000/database");
    return response.json();
}

async function saveData(data) {
    await fetch("http://localhost:3000/database", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

async function addToCart(button) {
    let data = await fetchData();
    const box = button.closest(".box");
    const product = {
        id: box.getAttribute("data-id"),
        name: box.querySelector("h3").innerText,
        price: parseInt(box.querySelector("h2").innerText)
    };
    data.cart.push(product);
    await saveData(data);
    console.log("Adăugat în coș:", product);
}

async function toggleFavorite(icon) {
    let data = await fetchData();
    const box = icon.closest(".box");
    const productId = box.getAttribute("data-id");
    const existingIndex = data.favorites.findIndex(item => item.id === productId);

    if (existingIndex !== -1) {
        data.favorites.splice(existingIndex, 1);
        icon.classList.remove("active");
        console.log("Eliminat din salvări:", productId);
    } else {
        const product = {
            id: productId,
            name: box.querySelector("h3").innerText,
            price: parseInt(box.querySelector("h2").innerText)
        };
        data.favorites.push(product);
        icon.classList.add("active");
        console.log("Adăugat în salvări:", product);
    }

    await saveData(data);
}




















// import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// const db = getDatabase();
// const produseRef = ref(db, "produse");

// onValue(produseRef, (snapshot) => {
//   const container = document.querySelector(".toate-box");
//   container.innerHTML = ""; // curățăm înainte
//   const produse = snapshot.val();

//   for (let id in produse) {
//     const produs = produse[id];

//     container.innerHTML += `
//       <div class="box" data-id="${id}">
//         <img src="../${produs.imagine}">
//         <h3>${produs.nume}</h3>
//         <div class="precos">
//             <h2>${produs.pret}<span>/1kg</span></h2>
//             <div class="buton-favorite">
//                 <i class="fa-solid fa-heart" onclick="toggleFavorite(this)"></i>
//             </div>
//             <button onclick="addToCart(this)" class="add-cos">
//                 <i class="fa-solid fa-cart-shopping"></i>
//             </button>
//         </div>
//       </div>`;
//   }
// });
