import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

function MovieDetail() {
const {id} = useParams()
const [movie, setMovie] = useState(null)

 useEffect(() => {

async function getMovie() {

    const response = await fetch(`http://www.omdbapi.com/?=tt3896198&apikey=245b275e&i=${id}`)
    const data = await response.json();
    console.log(data)
    setMovie(data)
}
getMovie();
} , [id])
if(!movie) return <div>Loading...</div>

    return (
        <div className="movie-detail">
		<h2> {movie.Title}</h2>
		<img alt= {movie.Title} src={movie.Poster}/>
		<p><strong>Genre:</strong> {movie.Genre}</p>
		<p><strong>Released:</strong> {movie.Released}</p>
		<p><strong>Plot:</strong> {movie.Plot}</p>
	</div>
    )
}

export default MovieDetail