const API_KEY = "38d56cef638f4276a3b2dffe9c3661b0";
const POPULAR_GAMES_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
const NEW_GAMES_URL = `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-released&dates=2024-01-01,2026-12-31`;

function loadDashboard() {
  fetch(NEW_GAMES_URL)
    .then((res) => res.json())
    .then((data) => {
      const newGames = data.results.slice(0, 4); 
      const container = document.getElementById("new-games-list-container");
      container.innerHTML = "";
      newGames.forEach((game) => {
        const tags = game.genres
          .slice(0, 3)
          .map((g) => `<span class="tag">${g.name}</span>`)
          .join("");

        container.innerHTML += `
          <div class="trending-card" onclick="goToInfo(${game.id})">
              <img src="${game.background_image || 'https://via.placeholder.com/180x100'}" alt="${game.name}">
              <div class="trending-info">
                  <div class="trending-header">
                      <span class="title">${game.name}</span>
                      <span class="rating">⭐ ${game.rating} / 5</span>
                  </div>
                  <div class="tags">${tags}</div>
                  <div class="trending-meta">
                      <span>📅 ${game.released || "N/A"}</span>
                  </div>
              </div>
          </div>
        `;
      });
    });

  fetch(POPULAR_GAMES_URL)
    .then((res) => res.json())
    .then((data) => {
      const games = data.results;

      if (games && games.length > 0) {
        const featured = games[0];
        const featuredContainer = document.getElementById("featured-game-container");
        
        featuredContainer.innerHTML = `
          <div class="featured-card" onclick="goToInfo(${featured.id})">
              <img src="${featured.background_image}" alt="${featured.name}">
              <div class="featured-info">
                  <h3>${featured.name}</h3>
                  <p style="color:#aaa; font-size: 13px; margin-top:6px;">
                    ⭐ Rating: ${featured.rating} / 5 | Released: ${featured.released}
                  </p>
              </div>
          </div>
        `;

        const listContainer = document.getElementById("game-list-container");
        listContainer.innerHTML = "";

        for (let i = 1; i < games.length; i++) {
          const game = games[i];
          listContainer.innerHTML += `
            <div class="movie-card" onclick="goToInfo(${game.id})">
                <img src="${game.background_image}" alt="${game.name}">
                <p style="margin-top: 8px; font-size: 14px; font-weight: bold; color: #fff;">${game.name}</p>
                <p style="font-size: 12px; color: #888;">${game.released || ''}</p>
            </div>
          `;
        }
      }
    });
}

function goToInfo(id) {
  window.location.href = `info_page.html?id=${id}`;
}

document.addEventListener("DOMContentLoaded", loadDashboard);