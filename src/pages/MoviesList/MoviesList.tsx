import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  useLocation,
  useParams,
  useSearchParams,
  useNavigate
} from 'react-router-dom'
import scrollIntoView from 'scroll-into-view-if-needed'
import { motion } from 'framer-motion'

import './MoviesList.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import MovieCardSkeleton from '../../components/MovieCardSkeleton/MovieCardSkeleton'

const MoviesList = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [searchParams] = useSearchParams()
  const [page, setPage] = useState(1)
  const [sorting, setSorting] = useState(
    searchParams.get('sort_by')
      ? searchParams.get('sort_by')
      : 'popularity.desc'
  )
  const [selectedGenre, setSelectedGenre] = useState(
    searchParams.get('with_genres') ? searchParams.get('with_genres') : ''
  )
  const { type } = useParams()
  const [loading, setLoading] = useState(true)
  const appElement = document.getElementsByClassName('App')[0]

  useEffect(() => {
    setSelectedGenre(
      searchParams.get('with_genres') ? searchParams.get('with_genres') : ''
    )

    const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${
      import.meta.env.VITE_API
    }&${location.search.substring(1)}&page=${page}`
    axios
      .get(url)
      .then((res) => {
        setMovies(res?.data?.results)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [location, page])

  const sortingHandler = (e) => {
    setLoading(true)
    setPage(1)
    setSorting(e.target.value)
    searchParams.set('sort_by', e.target.value)

    // add counts of votes for better results in vote_average
    e.target.value === 'vote_average.desc'
      ? searchParams.set('vote_count.gte', '500')
      : searchParams.delete('vote_count.gte')

    navigate(`/${type}/list?${searchParams}`)
    e.target.className = 'active-sort'
    setLoading(false)
  }

  const pageHandler = (e) => {
    setLoading(true)
    e.target.value === 'next' ? setPage(page + 1) : setPage(page - 1)

    scrollIntoView(appElement, {
      behavior: 'smooth',
      block: 'start'
    })
    setLoading(false)
  }

  return (
    <div className='movies-list'>
      <div className='movies-list-control'>
        <div className='left-container'>
          <span>{selectedGenre}</span>
        </div>
        <div className='right-container'>
          <button
            className={sorting === 'vote_average.desc' ? 'active-sort' : null}
            onClick={sortingHandler}
            value='vote_average.desc'
          >
            Top rated
          </button>
          <button
            className={sorting === 'popularity.desc' ? 'active-sort' : null}
            onClick={sortingHandler}
            value='popularity.desc'
          >
            Popular
          </button>
          <button
            className={sorting === 'release_date.desc' ? 'active-sort' : null}
            onClick={sortingHandler}
            value='release_date.desc'
          >
            By date
          </button>
        </div>
      </div>
      <div className='movies-list-content'>
        {loading ? (
          <MovieCardSkeleton count={20} />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie?.id}
              id={movie?.id}
              title={movie?.title || movie?.name}
              poster_path={movie?.poster_path}
              vote_average={movie?.vote_average}
            />
          ))
        )}
      </div>
      <div className='pages-control'>
        {page > 1 ? (
          <button onClick={pageHandler} value='previous'>
            Previous
          </button>
        ) : (
          <button disabled onClick={pageHandler} value='previous'>
            Previous
          </button>
        )}
        <span>{page}</span>
        <button onClick={pageHandler} value='next'>
          Next
        </button>
      </div>
    </div>
  )
}

export default MoviesList
