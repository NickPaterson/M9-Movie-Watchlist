import searchMovies from './searchMoviesApi.js'

const KEY = "&apikey=9c765940"
const searchBtn = document.getElementById('search-btn')
const movieContainer = document.getElementById('movie-container')

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(e.target.value)
    movieContainer.innerHTML = ''
    const query = document.getElementById('search-input').value
    searchMovies(query)
})


function setHtml(movie) {
    const {Title, Runtime, Genre, Plot, Poster, Ratings, imdbID} = movie
    
    console.log(Ratings)
    return `
        <div class="movie-item-container flex">
            <img class="movie-item-img" src="${Poster}" alt="">
            <div class="movie-item-info-container">
                <div class="movie-item-title flex">
                    <h2 class="movie-title">${Title}</h2>
                    <i class="fa-solid fa-star"></i>
                    <p class="rating">${Ratings}</p> 
                </div>
                <div class="movie-item-info flex">
                    <p class="movie-runtime">${Runtime}</p>
                    <p class="movie-genre">${Genre}</p>
                    <button id="${imdbID}" class="add-watchlist-btn"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
                </div>
                <div class="movie-item-description">
                    <p>${Plot}</p>
                </div>
            </div>
        </div>
    `
}