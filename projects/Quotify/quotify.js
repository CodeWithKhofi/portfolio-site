let quotesHistory = [];
let favoriteList  = [];
let currentQuote = null;



const dashboard = document.getElementById("dashboard");
const history = document.getElementById("history");
const favorites = document.getElementById("favorites");


const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const favIcon = document.getElementById("fav-icon");
const newQuoteBtn = document.getElementById("new-quote-btn");


const dailyLimit = document.getElementById("daily-limit");
const apiStatus = document.getElementById("api-status");






function navigateTo(pageId,clickedNav){
    let pageSection = document.querySelectorAll(".content-view");
    pageSection.forEach(section =>{
        section.style.display = "none";
    });

    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));


    document.getElementById(pageId).style.display = "flex";

    clickedNav.classList.add("active");
}


history.addEventListener('click',()=>{
    navigateTo("view-history",history);
});


dashboard.addEventListener('click',()=>{
    navigateTo("view-dashboard",dashboard);
});


favorites.addEventListener('click',()=>{
    navigateTo("view-favorites",favorites);
});



async function getQuotes(){
    try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    if(!response.ok){
        throw new Error("Server down...")
    }
    apiStatus.textContent = "Connected";
    apiStatus.className = "online";
    const data = await response.json();
    return data;
}   catch(error) {
    
     apiStatus.textContent = "Offline";
     apiStatus.className = "offline";

    alert(error.message);

}
}

async function renderQuotes() {
    // quoteText.textContent = "";
    // quoteAuthor.textContent = ";"
    quoteText.classList.add("skeleton");
    quoteAuthor.classList.add("skeleton");


    const quote = await getQuotes();

    if(quote){
        currentQuote = {
            text: quote.quote,
            author: quote.author,
            id: quote.id
        }
    }
        


    if(quote){
        quotesHistory.unshift({
            quote: quote.quote,
            author: quote.author,
            time: new Date().toLocaleTimeString()
    });
    }
    if(quotesHistory.length > 10){
        quotesHistory.pop();
    }
    updateHistoryUI();
    updateHeartStatus();
    renderFavoritesUI();

    quoteText.classList.remove("skeleton");
    quoteAuthor.classList.remove("skeleton");

    if(quote){
        quoteText.textContent = quote.quote;
        quoteAuthor.textContent = quote.author;
        // console.log(quote.quote)
    }
}

function toggleFavorite(){
    if(!currentQuote) return;

    const index = favoriteList.findIndex(q => q.id === currentQuote.id);

    if(index === -1){
        favoriteList.push(currentQuote);
        console.log("added to favorites");
    } else{
        favoriteList.splice(index,1);
        console.log("removed from favorites");
    }

    updateHeartStatus();
    renderFavoritesUI();
}


function updateHeartStatus() {
    const heartIcon = document.getElementById("fav-icon");
    const isFavorite = favoriteList.some(q => q.id === currentQuote?.id);

    if (isFavorite) {
        heartIcon.classList.add("active"); 
    } else {
        heartIcon.classList.remove("active");
    }
}

const favBtn = document.getElementById("fav-icon");
favBtn.addEventListener("click", toggleFavorite);


const modal = document.getElementById("limit-modal");
const closeModal = document.getElementById("close-modal");
counter = 0;
function limitCheck(){
    counter ++;

    dailyLimit.textContent = `${5 - counter} Remaining`;

    if(counter >= 5){
        dailyLimit.style.color = "var(--accent-cyan)";
        dailyLimit.style.fontWeight = "bold";

        newQuoteBtn.disabled = true;
        newQuoteBtn.textContent = "Limit Reached!";
        newQuoteBtn.style.opacity = "0.5";

        modal.classList.add("show");

    }
    }

closeModal.addEventListener('click',() =>{
    modal.classList.remove("show");
})

newQuoteBtn.addEventListener('click',()=>{
    if(counter < 5){
        renderQuotes();
        limitCheck();
    }
        
})

let historyContainer = document.getElementById("history-list");
function updateHistoryUI(){
    historyContainer.innerHTML = "";
    quotesHistory.forEach(quoteItem =>{
        let historyCard = document.createElement("div");
        // historyCard.classList.add("history-card");
        historyCard.className = "history-card";

        let qText = document.createElement("p");
        let qAuthor = document.createElement("small");
        let qTime = document.createElement("span");

        qText.textContent = `"${quoteItem.quote}"`;
        qAuthor.textContent = ` -${quoteItem.author}`;
        qTime.textContent = quoteItem.time;

        historyCard.appendChild(qText);
        historyCard.appendChild(qAuthor);
        historyCard.appendChild(qTime);

        historyContainer.appendChild(historyCard);

        
    });
}

let favoritesContainer = document.getElementById("favorites-list");
function renderFavoritesUI(){
    favoritesContainer.innerHTML = "";
    favoriteList.forEach(favoriteItem =>{
        let favoriteCard = document.createElement("div");
        favoriteCard.className = "history-card";

        let qText = document.createElement("p");
        let qAuthor = document.createElement("small");

        qText.textContent = `"${favoriteItem.text}"`;
        qAuthor.textContent = ` -${favoriteItem.author}`;

        favoriteCard.appendChild(qText);
        favoriteCard.appendChild(qAuthor);

        favoritesContainer.appendChild(favoriteCard);

        
    });
}


renderQuotes();
// limitCheck();
updateHistoryUI();
console.log(quotesHistory);
