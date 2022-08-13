const KEY = "&apikey=9c765940"
const searchBtn = document.getElementById('search-btn')
const movieContainer = document.getElementById('movie-container')
const baseUrl = 'https://www.omdbapi.com/'
let watchlist = []
// get watchlist from local storage
if (localStorage.getItem('watchlist')) {
    watchlist = JSON.parse(localStorage.getItem('watchlist'))
}

searchBtn.addEventListener('click', (e) => {
    movieContainer.innerHTML = ''
    e.preventDefault()
    const query = document.getElementById('search-input').value
    fetch(`${baseUrl}?s=${query}${KEY}`)
        .then(response => response.json())
        .then(data => {
            const moviesArray = data.Search
            const movies = moviesArray.map(movie => {
                fetch(`${baseUrl}?i=${movie.imdbID}${KEY}`)
                    .then(response => response.json())
                    .then(data => {
                        const html = setHtml(data)
                        movieContainer.innerHTML += html
                    })
                })
        })
        .catch(error => {
            movieContainer.innerHTML = `
            <div class="placeholder flex column">
                <p>Unable to find what you're looking for. Please try another search.</p>
            </div>`
        })
})

function setHtml(movie) {
    const {Title, Runtime, Genre, Plot, Poster, Ratings, imdbID} = movie
    const watchlistBtn = (watchlist.includes(imdbID)) 
        ? `<button id="${imdbID}" class="remove-watchlist-btn"><i class="fa-solid fa-circle-minus"></i> Remove</button>`
        : `<button id="${imdbID}" class="add-watchlist-btn"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>`
    const ratingValue = (Ratings.length === 0) ? 'N/A' : Ratings[0].Value.slice(0, 3)
    
    return `
        <div class="movie-item-container flex">
            <img class="movie-item-img" src="${Poster}" alt="">
            <div class="movie-item-info-container">
                <div class="movie-item-title flex">
                    <h2 class="movie-title">${Title}</h2>
                    <i class="fa-solid fa-star"></i>
                    <p class="rating">${ratingValue}</p> 
                </div>
                <div class="movie-item-info flex">
                    <p class="movie-runtime">${Runtime}</p>
                    <p class="movie-genre">${Genre}</p>
                    ${watchlistBtn}
                </div>
                <div class="movie-item-description">
                    <p>${Plot}</p>
                </div>
            </div>
        </div>
    `
}

movieContainer.addEventListener('click', (e) => {
    console.log(e.target.id)
    if (watchlist.includes(e.target.id)) {
        watchlist.pop(e.target.id)
        e.target.classList.remove('remove-watchlist-btn')
        e.target.classList.add('add-watchlist-btn')
        document.getElementById(e.target.id).innerHTML = `<i class="fa-solid fa-circle-plus"></i> Watchlist`
        if (watchlist.length === 0) {
            // remove watchlist from local storage
            localStorage.removeItem('watchlist')
        }
    } else {
        watchlist.push(e.target.id)
        e.target.classList.remove('add-watchlist-btn')
        e.target.classList.add('remove-watchlist-btn')
        document.getElementById(e.target.id).innerHTML = `<i class="fa-solid fa-circle-minus"></i> Remove`
    }
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
})

