// Selectarea elementelor
const searchIcon = document.getElementById("search-icon");
const searchBar = document.getElementById("search-bar");
const searchInput = document.getElementById("search-input");

// Afișarea barei de căutare
searchIcon.addEventListener("click", () => {
    searchBar.classList.toggle("active");
    searchIcon.classList.toggle("none");
    searchInput.focus();
});

// Funcția de căutare
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const searchText = searchInput.value.toLowerCase();

        // Găsirea textului în pagină
        if (searchText) {
            const bodyText = document.body.innerHTML.toLowerCase();
            if (bodyText.includes(searchText)) {
                alert(`Am găsit textul "${searchText}" în pagină!`);
            } else {
                alert(`Textul "${searchText}" nu a fost găsit.`);
            }
        }
        searchInput.value = "";
    }
});

document.addEventListener("click", (event) => {
    if (!searchBar.contains(event.target) && !searchIcon.contains(event.target)) {
        searchBar.classList.remove("active");
        searchIcon.classList.remove("none");
    }
});

// căutare in site
function searchText() {
    var input = document.getElementById("searchInput").value.toLowerCase();
    var sections = document.querySelectorAll("section");

    for (var i = 0; i < sections.length; i++) {
        var sectionText = sections[i].innerText.toLowerCase();

        if (sectionText.includes(input)) {
            sections[i].scrollIntoView({ behavior: "smooth" });
            sections[i].style.backgroundColor = "#eac8c9"; // Evidențiază secțiunea găsită
            
            // Resetarea culorii după 1 secundă cu efect de tranziție
            setTimeout(function(section) {
                section.style.backgroundColor = "";
            }, 1000, sections[i]);

            break;
        }
    }
}