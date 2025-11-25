import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

function MovieDetail() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    async function getMovie() {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;

      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
      )

      const data = await response.json()
      console.log(data)
      setMovie(data)
    }

    getMovie()
  }, [id])

  if (!movie) return <div>Loading...</div>

  return (
    <div className="movie-detail">
      <h2>{movie.Title}</h2>
      <img alt={movie.Title} src={movie.Poster} />
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Released:</strong> {movie.Released}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
    </div>
  )
}

export default MovieDetail
