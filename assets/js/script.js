const inputEl = document.getElementById('inpt');
const btnEl = document.getElementById('btn'); 
const moviesContainer = document.getElementById('movies');
const popupContainer = document.getElementById('popupContainer');
const closePopup = document.getElementById('closePopup');
const movieDetailsEl = document.getElementById('movieDetails');

let key = "apikey=3695b132";
let link = "https://www.omdbapi.com/?";

const getFetchedData = async (name) => {
    let api = link;
    api += "s=" + name + "&page=1&" + key;

    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        displayMovies(data.Search);
    } catch(e) {
        console.error('Error fetching data:', e);
        alert('Error fetching data, please try again.');
    }
}

const showPopup = (movie) => {
    movieDetailsEl.innerHTML = '';

    const liEl1 = document.createElement("li");
    const liEl2 = document.createElement("li");
    const liEl3 = document.createElement("li");
    const liEl4 = document.createElement("li");

    liEl1.textContent = "Title: " + movie.Title;
    liEl2.textContent = "Year: " + movie.Year;
    liEl3.textContent = "Rated: " + movie.Rated;
    liEl4.textContent = "Genre: " + movie.Genre;

    movieDetailsEl.appendChild(liEl1);
    movieDetailsEl.appendChild(liEl2);
    movieDetailsEl.appendChild(liEl3);
    movieDetailsEl.appendChild(liEl4);

    popupContainer.style.display = 'flex'; // Show the popup
}

const movieDetails = async (id) => {
    const movieId = `${link}i=${id}&${key}`;
    try {
        const response = await fetch(movieId);
        const data = await response.json();
        console.log(data);
        showPopup(data); // Call the function to show movie details popup
    } catch(e) {
        console.error('Error fetching movie details:', e);
        alert('Error fetching movie details, please try again.');
    }
}

const displayMovies = (movies) => {
    moviesContainer.innerHTML = ''; // Clear previous movies

    if (movies) {
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';

            const movieTitle = document.createElement('h3');
            movieTitle.textContent = movie.Title;

            const moviePoster = document.createElement('img');
            moviePoster.src = movie.Poster !== 'N/A' ? movie.Poster : 'assets/img/notFound.jpg';
            moviePoster.alt = `${movie.Title} Poster`;

            movieCard.appendChild(moviePoster);
            movieCard.appendChild(movieTitle);
            moviesContainer.appendChild(movieCard);

            movieCard.addEventListener('click', () => {
                movieDetails(movie.imdbID);
            });
        });
    } else {
        moviesContainer.innerHTML = '<p>No movies found.</p>';
    }
}

btnEl.addEventListener('click', () => {
    const searchContent = inputEl.value.trim();
    if (searchContent) {
        getFetchedData(searchContent);
    } else {
        alert('Please enter a search term.');
    }
});

// Close the popup when the close button is clicked
closePopup.addEventListener('click', () => {
    popupContainer.style.display = 'none'; // Hide the popup
});
