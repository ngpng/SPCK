const API_KEY = "38d56cef638f4276a3b2dffe9c3661b0";
const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    const games = data.results;

    if (games && games.length > 0) {
      // Game nổi bật (Game đầu tiên trong danh sách)
      const featured = games[0];
      const featuredContainer = document.getElementById("featured-game-container");
      
      featuredContainer.innerHTML = `
        <div class="featured-content" onclick="goToInfo(${featured.id})" style="cursor: pointer;">
            <img src="${featured.background_image}" alt="${featured.name}" style="max-width: 100%; height: auto;">
            <div>
                <h3>${featured.name}</h3>
                <p style="color:#aaa; max-width:600px; margin-top:10px;">
                  ⭐ Rating: ${featured.rating} / 5 | Released: ${featured.released}
                </p>
            </div>
        </div>
      `;

      // Danh sách các game còn lại
      const listContainer = document.getElementById("game-list-container");
      listContainer.innerHTML = ""; // Xóa dữ liệu cũ nếu có

      for (let i = 1; i < games.length; i++) {
        const game = games[i];
        listContainer.innerHTML += `
          <div class="movie-card" onclick="goToInfo(${game.id})" style="cursor: pointer;">
              <img src="${game.background_image}" alt="${game.name}" style="width: 100%; height: auto;">
              <p style="margin-top: 8px; font-size: 14px; font-weight: bold;">${game.name}</p>
          </div>
        `;
      }
    }
  })
  .catch((err) => console.log("Lỗi tải dữ liệu game:", err));

function goToInfo(id) {
  window.location.href = `info_page.html?id=${id}`;
}