const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movieContainer");
const inputBox = document.querySelector(".inputBox");

const getMovieInfo = async (movie) => {
    try {
        const myApiKey = "d00eb637";
        const url = `https://www.omdbapi.com/?apikey=${myApiKey}&t=${encodeURIComponent(movie)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || data.Response === "False") {
            throw new Error(data.Error || "Unable to load movie details.");
        }

        showMovieData(data);
    } catch (error) {
        showErrorMessage("Oops. No movie matched your search.");
        console.error("Movie search failed:", error);
    }
};

const showMovieData = (data) => {
    movieContainer.innerHTML = "";

    const { Title, imdbRating, Genre, Released, Runtime, Plot, Poster, Actors, Awards, Director } = data;
    const movieWrapper = document.createElement("div");
    movieWrapper.classList.add("movieWrapper");

    const movieElement = document.createElement("div");
    movieElement.classList.add("movieInfo");
    movieElement.innerHTML = `<h2>${Title}</h2>`;

    const movieGenreElement = document.createElement("div");
    movieGenreElement.classList.add("movieGenre");
    Genre.split(",").forEach((genre) => {
        const genreElement = document.createElement("p");
        genreElement.innerText = genre.trim();
        movieGenreElement.appendChild(genreElement);
    });
    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Release date:</strong> ${Released}</p>
        <p><strong>Duration:</strong> ${Runtime}</p>
        <p><strong>Cast:</strong> ${Actors}</p>
        <p><strong>Director:</strong> ${Director}</p>
        <p><strong>Plot:</strong> ${Plot}</p>
        <p><strong>Awards:</strong> ${Awards}</p>
        <p><strong>Rating:</strong> ${imdbRating} ⭐</p>`;

    const moviePosterElement = document.createElement("div");
    moviePosterElement.classList.add("moviePoster");
    moviePosterElement.innerHTML = `<img src="${Poster}" alt="Movie poster for ${Title}">`;

    movieWrapper.append(moviePosterElement, movieElement);
    movieContainer.appendChild(movieWrapper);
};

const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
};

const handleFormSubmission = (event) => {
    event.preventDefault();
    const movieName = inputBox.value.trim();

    if (movieName) {
        showErrorMessage(`${movieName} <i class="fa-solid fa-spinner" aria-label="Loading"></i>`);
        getMovieInfo(movieName);
    } else {
        showErrorMessage("Your cinematic journey needs a name. Try typing one!");
    }
};

searchForm.addEventListener("submit", handleFormSubmission);
