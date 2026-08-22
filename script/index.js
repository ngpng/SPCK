const API_KEY = "51ce916d19fbeb3d8481ea109a7109be";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
  .then((res) => res.json())
  .then((data) => {
    const movies = data.results;

    if (movies.length > 0) {
      const featured = movies[0];
      const featuredContainer = document.getElementById(
        "featured-movie-container",
      );
      featuredContainer.innerHTML = `
                        <div class="featured-content" onclick="goToInfo(${featured.id})">
                            <img src="${IMG_URL + featured.poster_path}" alt="${featured.title}">
                            <div>
                                <h3>${featured.title}</h3>
                                <p style="color:#aaa; max-width:600px; margin-top:10px;">${featured.overview}</p>
                            </div>
                        </div>
                    `;
    }

    const listContainer = document.getElementById("movie-list-container");
    for (let i = 1; i < movies.length; i++) {
      const movie = movies[i];
      listContainer.innerHTML += `
                        <div class="movie-card" onclick="goToInfo(${movie.id})">
                            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
                            <p style="margin-top: 8px; font-size: 14px;">${movie.title}</p>
                        </div>
                    `;
    }
  })
  .catch((err) => console.log("error", err));

function goToInfo(id) {
  window.location.href = `info_page.html?id=${id}`;
}


