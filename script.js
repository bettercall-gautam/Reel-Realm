const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movieContainer");
const inputBox = document.querySelector(".inputBox");

// creating a func to fetch movie details

const getMovieInfo = async (movie) =>{
    try{
    // Heads up: this key is sitting in plain text in a public repo.
    // For a free OMDb key that's low risk, but it's a habit worth
    // dropping. If this ever needs to be private, the fix is a small
    // serverless function that holds the key server side and the
    // frontend calls that instead of OMDb directly.
    const myApiKey = "d00eb637";
    const URL = `https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

    const response = await fetch(URL);
    const data = await response.json();

        console.log(data);


    if(!response.ok){
        // was: throw new Error($`{...}`) which calls an undefined
        // function named $ as a tagged template. That throws its own
        // "$ is not defined" error instead of your intended message.
        // A template literal on its own does not need a $ in front.
        throw new Error(`Sorry <i class="fa-solid fa-circle-exclamation"></i> we couldn't load the movie details right now`)
    }

    showMovieData(data);

    }
    catch(error){
        showErrorMessage(`${'Oops :( No movie matched your search.'}`)
    };


}

// function to show movie data

const showMovieData = (data) =>{

    movieContainer.innerHTML = "";

// using destructuring assignment to extract movie detials from data object

    const {Title, imdbRating, Genre, Released, Runtime, Plot, Poster, Actors, Awards, Director} = data;

    const movieWrapper = document.createElement("div");

    movieWrapper.classList.add("movieWrapper");

    const movieElement =  document.createElement("div");

    movieElement.classList.add("movieInfo");

    movieElement.innerHTML = `<h2>${Title}</h2>`;


    const movieGenreElement = document.createElement("div");
    movieGenreElement.classList.add("movieGenre");

    Genre.split(",").forEach(element =>{
        const p = document.createElement("p");
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Relase Date: </strong> ${Released}</p>
                             <p><strong>Duration: </strong>${Runtime}</p>
                             <p><strong>Casts: </strong>${Actors}</p>
                             <p><strong>Director: </strong>${Director}</p>
                             <p><strong>Plot: </strong>${Plot}</p>
                             <p><strong>Awards: </strong>${Awards}</p>
                             <p><strong>Rating:</strong> ${imdbRating}⭐</p>`

    // creating a div for movie poster
    const moviePosterElement = document.createElement("div");
    moviePosterElement.classList.add("moviePoster");
    moviePosterElement.innerHTML = `<img src = "${Poster}" alt = "Movie Poster"/>`

    movieWrapper.appendChild(moviePosterElement);
    movieWrapper.appendChild(movieElement);
    movieContainer.appendChild(movieWrapper);
}

// showErrorMessage

const showErrorMessage = (message) =>{
    movieContainer.innerHTML = `<h2>${message}</h2>`
}

// fucntion to handle submisson form

const handleFormSubmisson =  (e)=>{
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !== ""){
        showErrorMessage(inputBox.value+`${" <i class='fa-solid fa-spinner'></i>"}`)
        getMovieInfo(movieName);
    }
    else {
        showErrorMessage(`${"Your cinematic journey needs a name, try typing one!"}`)
    }
}

// adding a event listener to searchBox

searchForm.addEventListener("submit", handleFormSubmisson)
