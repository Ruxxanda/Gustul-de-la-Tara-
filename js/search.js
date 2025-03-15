// const searchIcon = document.getElementById("search-icon");
// const searchBar = document.getElementById("search-bar");
// const searchInput = document.getElementById("search-input");
// const leftButton = document.createElement("button");
// const rightButton = document.createElement("button");
// let searchResults = [];
// let currentIndex = 0;

// leftButton.innerText = "Left";
// rightButton.innerText = "Right";
// leftButton.classList.add("search-nav-button");
// rightButton.classList.add("search-nav-button");
// leftButton.style.display = "none";
// rightButton.style.display = "none";

// document.body.appendChild(leftButton);
// document.body.appendChild(rightButton);

// searchIcon.addEventListener("click", () => {
//     searchBar.classList.toggle("active");
//     searchIcon.classList.toggle("none");
//     searchInput.focus();
// });

// searchInput.addEventListener("keypress", (event) => {
//     if (event.key === "Enter") {
//         const searchText = searchInput.value.toLowerCase();
//         localStorage.setItem("searchQuery", searchText);
//         window.location.href = "search-results.html";
//     }
// });

// document.addEventListener("click", (event) => {
//     if (!searchBar.contains(event.target) && !searchIcon.contains(event.target)) {
//         searchBar.classList.remove("active");
//         searchIcon.classList.remove("none");
//     }
// });

// leftButton.addEventListener("click", () => {
//     if (currentIndex > 0) {
//         currentIndex--;
//         scrollToResult();
//     }
// });

// rightButton.addEventListener("click", () => {
//     if (currentIndex < searchResults.length - 1) {
//         currentIndex++;
//         scrollToResult();
//     }
// });

// function scrollToResult() {
//     if (searchResults.length > 0) {
//         searchResults[currentIndex].scrollIntoView({ behavior: "smooth", block: "center" });
//         highlightCurrent();
//     }
// }

// function highlightCurrent() {
//     document.querySelectorAll(".highlight").forEach(el => el.style.backgroundColor = "");
//     searchResults[currentIndex].style.backgroundColor = "#eac8c9";
//     setTimeout(() => {
//         searchResults[currentIndex].style.backgroundColor = "";
//     }, 1000);
// }

// function updateButtonsVisibility() {
//     if (searchResults.length > 1) {
//         leftButton.style.display = "block";
//         rightButton.style.display = "block";
//     } else {
//         leftButton.style.display = "none";
//         rightButton.style.display = "none";
//     }
// }

// // CSS pentru evidențiere
// const style = document.createElement("style");
// style.innerHTML = `
//     .highlight {
//         background-color: yellow;
//         transition: background-color 1s ease;
//     }
//     .search-nav-button {
//         position: fixed;
//         bottom: 20px;
//         padding: 10px;
//         background: #007bff;
//         color: white;
//         border: none;
//         cursor: pointer;
//     }
//     .search-nav-button:hover {
//         background: #0056b3;
//     }
// `;
// document.head.appendChild(style);

// // Căutare în alte pagini
// document.addEventListener("DOMContentLoaded", async () => {
//     const searchText = localStorage.getItem("searchQuery");
//     if (searchText) {
//         searchResults = [];
//         currentIndex = 0;

//         document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div").forEach(element => {
//             if (element.innerText.toLowerCase().includes(searchText)) {
//                 searchResults.push(element);
//                 element.classList.add("highlight");
//             }
//         });

//         if (searchResults.length > 0) {
//             scrollToResult();
//             updateButtonsVisibility();
//         } else {
//             const pages = ["index.html", "about.html", "contact.html", "products.html"];
//             for (let page of pages) {
//                 try {
//                     const response = await fetch(page);
//                     const text = await response.text();
//                     if (text.toLowerCase().includes(searchText)) {
//                         localStorage.setItem("redirectSearch", searchText);
//                         window.location.href = page;
//                         return;
//                     }
//                 } catch (error) {
//                     console.error("Nu s-a putut accesa pagina:", page);
//                 }
//             }
//         }
//     }
// });
