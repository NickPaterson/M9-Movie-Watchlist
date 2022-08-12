const KEY = "&apikey=9c765940"
const movieContainer = document.getElementById('movie-container')
// localStorage.removeItem('watchlist')
let watchlist = []

// get watchlist from local storage
if (localStorage.getItem('watchlist')) {
    console.log('localStorage: ', localStorage.getItem('watchlist'))
    watchlist = JSON.parse(localStorage.getItem('watchlist'))
    // map through watchlist and fetch movie data
    movieContainer.innerHTML = ''
    watchlist.forEach(movie => {
        fetch(`http://www.omdbapi.com/?i=${movie}${KEY}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const html = setHtml(data)
                movieContainer.innerHTML += html
            })
            
    })

}

function setHtml(movie) {
    const {Title, Runtime, Genre, Plot, Poster, Ratings, imdbID} = movie
    const watchlistBtn = (watchlist.includes(imdbID)) 
        ? `<button id="${imdbID}" class="remove-watchlist-btn"><i class="fa-solid fa-circle-minus"></i> Watchlist</button>`
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
    if (watchlist.includes(e.target.id)) {
        watchlist.pop(e.target.id)
    } else {
        watchlist.push(e.target.id)
    }
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    if (watchlist.length === 0) {
        // remove watchlist from local storage
        localStorage.removeItem('watchlist')
        movieContainer.innerHTML = `
            <div class="placeholder flex column">
                <p>Your watchlist is looking a little empty</p>
                <a href="index.html"><i class="fa-solid fa-circle-plus"></i>Let's add some movies</a>
            </div> 
        `
    }
    // reload page to update watchlist
    location.reload()
})