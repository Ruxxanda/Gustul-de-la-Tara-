// cos
function addToCart(button) {
    const productBox = button.closest('.box');
    const productId = productBox.dataset.id;
    const productContent = productBox.outerHTML;

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ id: productId, html: productContent, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    button.classList.add('added');
    button.innerHTML = '<i class="fa-solid fa-check"></i>';

    setTimeout(function () {
        button.classList.remove('added');
        button.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';
    }, 1000);

}

function addToCart(button) {
    const productBox = button.closest('.box');
    const productId = productBox.dataset.id;
    const productContent = productBox.outerHTML;

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ id: productId, html: productContent, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Actualizare dinamică a numărului total de produse
    updateCartTotal();

    // Feedback vizual pentru utilizator
    button.classList.add('added');
    button.innerHTML = '<i class="fa-solid fa-check"></i>';

    setTimeout(function () {
        button.classList.remove('added');
        button.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';
    }, 1000);
}

// Funcție pentru actualizarea numărului total de produse
function updateCartTotal() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Afișăm numărul în elementul cu clasa 'cart-total'
    const totalDisplay = document.querySelector('.cart-total');
    if (totalDisplay) {
        totalDisplay.textContent = totalQuantity; // Afișăm doar cifra
    }
}

// Asigurăm actualizarea numărului total la încărcarea paginii
document.addEventListener('DOMContentLoaded', function () {
    updateCartTotal();
});

// Funcția pentru a goli coșul
function clearCosItems() {
    // Golim coșul din localStorage
    localStorage.removeItem('cartItems');
    localStorage.removeItem('itemsOrder');

    // Actualizăm UI-ul
    document.querySelector('.cart-total').textContent = '0'; // Setăm totalul la 0

    // Goliți secțiunea de produse
    document.getElementById('cart-items').innerHTML = '';

    console.log("Coșul tău a fost golit!");
}

// Ascultăm pentru comanda specifică în consola browserului
(function () {
    const originalConsoleLog = console.log;
    console.log = function (...args) {
        originalConsoleLog.apply(console, args);
        
        // Verificăm dacă comanda introdusă în consolă este "clearCosItems"
        if (args[0] === "clearCosItems") {
            clearCosItems(); // Dacă este, golim coșul
        }
    };
})();



// salvari
function toggleFavorite(element) {
    const productBox = element.closest('.box');
    const productId = productBox.dataset.id;
    const productContent = productBox.outerHTML;

    // Obține lista de produse salvate din localStorage
    let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const isSaved = savedItems.some(item => item.id === productId);

    if (isSaved) {
        // Elimină produsul din lista de salvări
        savedItems = savedItems.filter(item => item.id !== productId);
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
        element.classList.remove('favorit'); // Elimină culoarea roșie
    } else {
        // Adaugă produsul în lista de salvări
        savedItems.push({ id: productId, html: productContent });
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
        element.classList.add('favorit'); // Adaugă culoarea roșie
    }

    // Asigură-te că iconița rămâne întotdeauna fa-solid
    element.classList.add('fa-solid');
}



document.addEventListener('DOMContentLoaded', function () {
    updateSavedItems();
});

function updateSavedItems() {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const salvariItemsContainer = document.getElementById('salvari-items');
    const salvariHeader = document.querySelector('section.salvari h1');

    if (savedItems.length > 0) {
        salvariItemsContainer.innerHTML = '';
        salvariHeader.textContent = 'Produse Salvate'; // Setează textul pentru titlul salvărilor

        savedItems.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = item.html;

            // Asigură-te că iconița de salvare este `fa-solid` și are culoarea albă
            const heartIcon = div.querySelector('.buton-favorite .fa-heart');
            if (heartIcon) {
                heartIcon.classList.remove('fa-regular'); // Asigură-te că iconița nu are clasa fa-regular
                heartIcon.classList.add('fa-solid');
                heartIcon.classList.add('favorit'); // Adaugă clasa pentru culoarea roșie când e favorită
                heartIcon.onclick = function () {
                    removeFromSaved(item.id);
                };
            }

            salvariItemsContainer.appendChild(div.firstChild);
        });
    } else {
        salvariHeader.textContent = 'Nu ai produse salvate!'; // Setează textul când nu sunt produse salvate
    }
}

function removeFromSaved(id) {
    let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    savedItems = savedItems.filter(item => item.id !== id);

    // Verifică dacă lista este goală și reîncarcă pagina
    if (savedItems.length === 0) {
        localStorage.removeItem('savedItems'); // Opțional, curăță localStorage
        location.reload(); // Reîncarcă pagina
    } else {
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
        updateSavedItems(); // Reîncarcă lista de salvări
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // Actualizăm numărul de produse din salvări
    updateSavedItems();

    // Actualizăm numărul de produse din coș
    updateTotalQuantity();
});


// Actualizează numărul de produse din coș
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-total').textContent = cartCount;
}

// Actualizează numărul de produse salvate
function updateSavedCount() {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    document.querySelector('.saved-count').textContent = savedItems.length;
}

// Apelăm funcțiile la încărcarea paginii
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateSavedCount();
});



// Funcția care va șterge produsele salvate din localStorage și va reîncărca secțiunea
function clearSavedItems() {
    localStorage.removeItem('savedItems'); // Șterge toate produsele salvate
    
    // Resetează iconițele inimioarelor la stilul inițial (negru, adică fa-regular)
    const allHeartIcons = document.querySelectorAll('.buton-favorite .fa-heart');
    allHeartIcons.forEach(heartIcon => {
        heartIcon.classList.remove('fa-solid', 'favorit'); // Îndepărtează clasele pentru culoarea roșie
        heartIcon.classList.add('fa-regular'); // Adaugă clasa fa-regular pentru inima gri
    });

    // Actualizează secțiunea de produse salvate
    updateSavedItems(); // Actualizează lista de produse salvate
    updateSavedCount(); // Actualizează numărul de produse salvate

    // Resetează vizual secțiunea de salvări
    const salvariItemsContainer = document.getElementById('salvari-items');
    salvariItemsContainer.innerHTML = ''; // Golim containerul

    const numarProduseSalvate = document.getElementById('numarProduseSalvate');
    numarProduseSalvate.textContent = '0'; // Actualizăm numărul de produse la 0
}

// Ascultă comenzile din consola pentru a șterge produsele salvate
console.clearSavedItems = clearSavedItems;
