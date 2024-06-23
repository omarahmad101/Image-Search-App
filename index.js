const accessKey = "BHzOqJ9_rUs9cEn8zFfqVaNQB_sY0D8nmAuradAZ7fY";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultEl = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");

let page = 1;
let inputData = '';

async function searchImages() {
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (page === 1) {
        searchResultEl.innerHTML = "";
    }

    const results = data.results;
    results.forEach(result => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultEl.appendChild(imageWrapper);
    });

    // Show the "Show More" button if there are more results to display
    if (data.total_pages > page) {
        showMoreButton.style.display = 'block';
    } else {
        showMoreButton.style.display = 'none';
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener("click", () => {
    page++;
    searchImages();
});
