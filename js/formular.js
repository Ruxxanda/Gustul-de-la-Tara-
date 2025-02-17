// trimiterea formularului in google spread
const scriptURL = 'https://script.google.com/macros/s/AKfycbxbrRLK5RE_xD59MAVFZ_vgKQEP5JaB8wKVJa8xU-e1SY4eJ9s5guaBcFOJohiauyEomQ/exec';

const form = document.forms['contact-form'];

form.addEventListener('submit', e => {
    e.preventDefault();

    // Obține datele coșului
    const cartItems = localStorage.getItem('cartItems');

    // Verifică dacă există date în coș
    if (cartItems) {
        // Parsează datele coșului și obține denumirile produselor și cantitățile
        const parsedCartItems = JSON.parse(cartItems);
        const productDetails = parsedCartItems.map(item => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(item.html, 'text/html');
            var nameElement = doc.querySelector('h3');
            var quantity = item.quantity;  // presupunând că "quantity" este stocată în obiectul item
            return nameElement ? `${nameElement.textContent} x${quantity}` : '';
        }).join(', ');

        // Setează detaliile produselor în câmpul ascuns
        document.getElementById('continut-cosului').value = productDetails;
    }

    // Trimite formularul
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => alert("Formularul a fost trimis cu succes!"))
        .then(() => {
            // Șterge datele coșului după trimitere, dacă dorești
            localStorage.removeItem('cartItems');
            localStorage.removeItem('itemsOrder');
            window.location.reload();
        })
        .catch(error => console.error('Eroare!', error.message));
});




//  Scriptul de Procesare Google Sheets
function doPost(e) {
    var sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getSheetByName('Sheet1');
    var cartItems = e.parameter['cart-items']; // Citește datele coșului

    sheet.appendRow(row);
    return ContentService.createTextOutput("Success");
}

function doPost(e) {
    var sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getSheetByName('Sheet1');
    var cartItems = e.parameter['cart-items']; // Citește datele coșului

    // Dacă cartItems conține mai multe produse, trebuie să le separi
    var productDetails = cartItems.split(','); // presupunem că produsele sunt separate de virgulă

    productDetails.forEach(function(productDetail) {
        // Folosește regex pentru a extrage denumirea și cantitatea
        var match = productDetail.match(/(.*) - Cantitate: (\d+)/);
        if (match) {
            var productName = match[1].trim();
            var quantity = match[2].trim();
            
            // Adaugă rândul în foaia de calcul
            sheet.appendRow([productName, quantity]);
        }
    });

    return ContentService.createTextOutput("Success");
}
