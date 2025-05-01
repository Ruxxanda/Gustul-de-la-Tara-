const searchIcon = document.getElementById("search-icon");
const searchBar = document.getElementById("search-bar");

searchIcon.addEventListener("click", () => {
    searchBar.classList.toggle("active");
    searchIcon.classList.toggle("none");
});

document.addEventListener("click", (event) => {
    if (!searchBar.contains(event.target) && !searchIcon.contains(event.target)) {
        searchBar.classList.remove("active");
        searchIcon.classList.remove("none");
    }
});













document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();
    const section = document.querySelector(".section.vanzari");
    const titles = section.querySelectorAll("h3");

    titles.forEach(title => {
        const text = title.textContent;
        const lowerText = text.toLowerCase();

        // elimină highlight anterior
        title.innerHTML = text;

        if (query && lowerText.includes(query)) {
            const regex = new RegExp(`(${query})`, "gi");
            const highlighted = text.replace(regex, `<span style="background-color: yellow;">$1</span>`);
            title.innerHTML = highlighted;
        }
    });
});
