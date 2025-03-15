document.addEventListener('DOMContentLoaded', function () {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartSection = document.getElementById('cart-items');
    var cartTitle = document.querySelector('section.cos h1');
    var totalQuantity = 0; // Variabila pentru a număra totalul produselor

    if (cartItems.length > 0) {
        var itemsMap = new Map();

        cartItems.forEach(function (item) {
            if (item && item.html) {
                if (itemsMap.has(item.id)) {
                    itemsMap.get(item.id).quantity += 1;
                } else {
                    item.quantity = item.quantity || 1;
                    itemsMap.set(item.id, item);
                }
            }
        });

        cartItems = Array.from(itemsMap.values());
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        cartItems.forEach(function (item) {
            var div = document.createElement('div');
            div.innerHTML = item.html;
            var box = div.firstChild;

            var addToCartButton = box.querySelector('.precos button');
            if (addToCartButton) {
                addToCartButton.remove();
            }

            var quantityDiv = document.createElement('div');
            quantityDiv.classList.add('quantity');
            quantityDiv.textContent = 'x' + item.quantity;
            box.appendChild(quantityDiv);

            var removeButton = document.createElement('button');
            removeButton.classList.add('remove-item');
            removeButton.textContent = 'Elimină';
            removeButton.onclick = function () {
                removeFromCart(item.id);
            };
            box.appendChild(removeButton);

            cartSection.appendChild(box);

            // Adunăm cantitatea fiecărui produs la total
            totalQuantity += item.quantity;
        });

        cartTitle.textContent = 'Produsele tale în coș';

        // Afișăm doar cifra totalului într-un element cu clasa 'cart-total'
        var totalDisplay = document.querySelector('.cart-total');
        if (totalDisplay) {
            totalDisplay.textContent = totalQuantity; // Afișăm doar cifra
        }
    } else {
        cartTitle.textContent = 'Coșul tău este gol!';
        cartSection.innerHTML = '';
        
        // Asigurăm că și mesajul cu totalul este actualizat atunci când coșul este gol
        var totalDisplay = document.querySelector('.cart-total');
        if (totalDisplay) {
            totalDisplay.textContent = '0'; // Dacă coșul e gol, afișăm 0
        }
    }
});


function removeFromCart(id) {
    // Preluăm produsele din localStorage
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Găsim indexul produsului în array-ul `cartItems`
    var itemIndex = cartItems.findIndex(function (item) {
        return item.id === id;
    });

    if (itemIndex !== -1) {
        // Dacă produsul are cantitate mai mare de 1, scădem cantitatea
        if (cartItems[itemIndex].quantity > 1) {
            cartItems[itemIndex].quantity -= 1;

            // Actualizăm cantitatea din DOM
            var quantityDiv = document.querySelector(`[data-id="${id}"] .quantity`);
            if (quantityDiv) {
                quantityDiv.textContent = 'x' + cartItems[itemIndex].quantity;
            }
        } else {
            // Dacă cantitatea este 1, eliminăm complet produsul
            cartItems.splice(itemIndex, 1);

            // Eliminăm produsul din DOM
            var productElement = document.querySelector(`[data-id="${id}"]`);
            if (productElement) {
                productElement.remove();
            }
        }

        // Actualizăm localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Actualizăm totalul cantităților în coș
        updateTotalQuantity();
    }
}


function updateTotalQuantity() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var totalQuantity = cartItems.reduce(function (sum, item) {
        return sum + item.quantity;
    }, 0);

    // Actualizăm elementele HTML cu clasa 'cart-total' pe toate paginile
    var totalDisplays = document.querySelectorAll('.cart-total');
    totalDisplays.forEach(function (totalDisplay) {
        totalDisplay.textContent = totalQuantity; // Afișăm doar cifra
    });

    // Dacă există secțiunea coș, actualizăm și aceasta
    var cartTitle = document.querySelector('section.cos h1');
    var cartSection = document.getElementById('cart-items');
    if (cartTitle && cartSection) {
        if (totalQuantity === 0) {
            cartTitle.textContent = 'Coșul tău este gol!';
            cartSection.innerHTML = '';
        } else {
            cartTitle.textContent = 'Produsele tale în coș';
        }
    }
}

// Apelăm funcția la încărcarea paginii
document.addEventListener('DOMContentLoaded', function () {
    updateTotalQuantity(); // Actualizăm numărul de produse din coș
});
