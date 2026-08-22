const API_KEY = "51ce916d19fbeb3d8481ea109a7109be";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

if (movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((movie) => {
      document.getElementById("movie-pic").src = IMG_URL + movie.poster_path;
      document.getElementById("movie-title").innerText = movie.title;
      document.getElementById("movie-des").innerText =movie.overview || "No des available.";
      document.getElementById("movie-date").innerText = `Release Date: ${movie.release_date}`;


    })
    .catch((err) => console.log("Lỗi:", err));
} else {
  document.getElementById("movie-title").innerText = "Movie not found!";
}
