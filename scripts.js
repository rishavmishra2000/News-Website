// const API_KEY = "<NEWS API Key>";
const API_KEY = "4f2f0bb4e0a79a5c0c3e960cf86b3e13";
// const API_URL = "https://newsapi.org/v2/everything?q=";
const API_URL = "https://gnews.io/api/v4/search?q=";

window.addEventListener("load", () => fetchNews("Trending"))

async function fetchNews(query) {
    // const res = await fetch(`${API_URL}${query}&apiKey=${API_KEY}`);
    const res = await fetch(`${API_URL}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data.articles);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    // console.log(newsCardTemplate);
    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        // if (!article.urlToImage) {
        if (!article.image) {
            return;
        }
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newImage = cardClone.querySelector("#news-img");
    const newSource = cardClone.querySelector("#news-source");
    const newTitle = cardClone.querySelector("#news-title");
    const newDesc = cardClone.querySelector("#news-desc");

    // newImage.src = article.urlToImage;
    // newTitle.innerHTML = article.title;
    // newDesc.innerHTML = article.description;
    // const date = new Date(article.publishedAt).toLocaleString("en-US", {
    //     timeZone: "Asia/Jakarta"
    // })
    newImage.src = article.image;
    newTitle.innerHTML = article.title;
    newDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })

    newSource.innerHTML = `Source: ${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener("click", () =>{
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id){
    // console.log(id)
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("news-input");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
    fetchNews(query);
})
