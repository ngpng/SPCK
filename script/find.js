const API_KEY = "38d56cef638f4276a3b2dffe9c3661b0";
const searchInput = document.querySelector(".searchMovies"); 
const resultsContainer = document.getElementById("results");

if (!searchInput || !resultsContainer) {
    console.error("Search input (.searchMovies) or results container (#results) not found in HTML!");
}

async function fetchGames(query = "") {
    try {
        let url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=12`;
        if (query) {
            url += `&search=${encodeURIComponent(query)}`;
        }

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayGames(data.results);
    } catch (error) {
        console.error("Error fetching data from RAWG:", error);
        resultsContainer.innerHTML = "<p>Failed to load games. Check console for details.</p>";
    }
}

function displayGames(games) {
    resultsContainer.innerHTML = "";

    if (!games || games.length === 0) {
        resultsContainer.innerHTML = "<p>No games found.</p>";
        return;
    }

    games.forEach(game => {
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        const gameImage = game.background_image ? game.background_image : "https://via.placeholder.com/400x200?text=No+Image";

        gameCard.innerHTML = `
            <img src="${gameImage}" alt="${game.name}">
            <div class="game-info">
                <h3>${game.name}</h3>
                <p>Release Date: ${game.released || "N/A"}</p>
                <p>Rating: ⭐ ${game.rating || "N/A"}</p>
            </div>
        `;
        gameCard.addEventListener("click", () => {
            window.location.href = `info_page.html?id=${game.id}`;
        });
        resultsContainer.appendChild(gameCard);
    });
}

fetchGames();

let debounceTimer;
searchInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();
    
    debounceTimer = setTimeout(() => {
        fetchGames(query);
    }, 300); // Waits 300ms after user stops typing before searching
});