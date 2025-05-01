function updateSavedItems() {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const salvariItemsContainer = document.getElementById('salvari-items');
    const salvariHeader = document.querySelector('section.salvari h1');
    const savedCountElement = document.querySelector('.saved-count');

    console.log(`În salvari sunt ${savedItems.length} produse`);

    savedCountElement.textContent = savedItems.length;

    if (savedItems.length > 0) {
        salvariItemsContainer.innerHTML = '';
        salvariHeader.textContent = 'Produse Salvate';

        savedItems.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = item.html;

            const heartIcon = div.querySelector('.buton-favorite .fa-heart');
            if (heartIcon) {
                heartIcon.classList.remove('fa-regular');
                heartIcon.classList.add('fa-solid');
                heartIcon.classList.add('favorit');
                heartIcon.onclick = function () {
                    removeFromSaved(item.id);
                };
            }

            salvariItemsContainer.appendChild(div.firstChild);
        });
    } else {
        salvariHeader.textContent = 'Nu ai produse salvate!';
    }
}


function updateSavedCount() {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const savedCountElement = document.querySelector('.saved-count');

    if (savedCountElement) {
        savedCountElement.textContent = savedItems.length;
    }

    if (savedItems.length === 0) {
        savedCountElement.classList.add('zero');
    } else {
        savedCountElement.classList.remove('zero');
    }
}

function observeSavedItems() {
    const originalSetItem = localStorage.setItem;

    localStorage.setItem = function (key, value) {
        originalSetItem.apply(this, arguments);

        if (key === 'savedItems') {
            updateSavedCount();
        }
    };
}

document.addEventListener('DOMContentLoaded', function () {
    observeSavedItems();
    updateSavedCount();
});



if (window.location.pathname === '../salvari.html') {
    const div = document.querySelector('.add-cos');
    if (div) {
        div.classList.replace('.add-cos', '.remove-item');
    }
}
