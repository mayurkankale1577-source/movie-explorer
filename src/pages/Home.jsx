import { useState, useEffect, useRef } from "react"
import MovieList from "../components/MovieList"

function Home() {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef()

  const fetchMovies = async (query) => {
    setLoading(true)

    const apiKey = import.meta.env.VITE_OMDB_API_KEY

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
    )

    const data = await response.json()
    console.log(data)
    setMovies(data.Search || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchMovies("Avengers")
  }, [])

  const handlesearch = (e) => {
    e.preventDefault()
    const query = inputRef.current.value.trim()
    if (query) {
      fetchMovies(query)
    }
  }

  return (
    <div className="home">
      <form onSubmit={handlesearch}>
        <input
          ref={inputRef}
          className="searchInput"
          placeholder="Search for a movie..."
        />
        <button type="submit">Search 🔎</button>
      </form>

      {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
    </div>
  )
}

export default Home
