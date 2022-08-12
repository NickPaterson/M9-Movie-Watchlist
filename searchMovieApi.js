const KEY = "&apikey=9c765940"

function searchMovies(query) {
    console.log(query)
    fetch(`http://www.omdbapi.com/?s=${query}${KEY}`)
    .then(response => response.json())
    .then(data => {
        const moviesArray = data.Search
        const movies = moviesArray.map(movie => {
            fetch(`http://www.omdbapi.com/?i=${movie.imdbID}${KEY}`)
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
}

export default searchMovies