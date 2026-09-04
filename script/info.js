const API_KEY = "38d56cef638f4276a3b2dffe9c3661b0";
const TRAILER_URL = `https://api.rawg.io/api/games/{id}/movies?key=${API_KEY}`;

const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");

if (gameId) {
  fetch(`https://rawg.io/api/games/${gameId}?key=${API_KEY}`)
    .then((res) => res.json())
    .then((game) => {
      document.getElementById("game-pic").src =game.background_image;
      document.getElementById("game-title").innerText = game.name;
      document.getElementById("game-des").innerText = `${game.description_raw || "No description available."}`;
      document.getElementById("game-date").innerText = `Release Date: ${game.released || "N/A"}`;
      document.getElementById("game-rating").innerText = `Rating: ${game.rating} / 5⭐`;
      document.getElementById("game-tag").innerText = `Tags: ${game.genres.map((g) => g.name).join(", ") || "N/A"}`;

    })
    .catch((err) => console.log("Lỗi:", err));
} else {
  document.getElementById("game-title").innerText = "Game not found!";
}

document.getElementById("username-display").innerText = localStorage.getItem("currentUser") || "Guest";

