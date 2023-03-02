import { useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import scrollIntoView from 'scroll-into-view-if-needed'

import './MoviesList.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import MovieCardSkeleton from '../../components/MovieCardSkeleton/MovieCardSkeleton'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getMovies } from '../../api/movies'
import { getTVs } from '../../api/tvs'
import { getGenres } from '../../api/genres'

function paramsToObject(entries) {
  const result = {}
  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tupple
    result[key] = value
  }
  return result
}

const MoviesList = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(1)
  const { type } = useParams()
  const appElement = document.getElementsByClassName('App')[0]

  let params = paramsToObject(searchParams)

  const queryData = useQuery({
    queryKey: [type, params],
    queryFn: () => getMovies(type, params)
  })

  const queryDataGenres = useQuery({
    queryKey: [type],
    queryFn: () => getGenres(type)
  })

  return (
    <div className='movies-list'>
      <div className='movies-list-control'>
        <div className='left-container'>
          <span>
            {
              queryDataGenres?.data?.genres?.find(
                (genre) => genre.id === Number(searchParams.get('with_genres'))
              )?.name
            }
          </span>
        </div>
        <div className='right-container'>
          <button
            className={
              searchParams.get('sort_by') === 'vote_average.desc'
                ? 'active-sort'
                : null
            }
            onClick={() =>
              setSearchParams({
                sort_by: 'vote_average.desc',
                'vote_count.gte': '500'
              })
            }
            value='vote_average.desc'
          >
            Top rated
          </button>
          <button
            className={
              searchParams.get('sort_by') === 'popularity.desc'
                ? 'active-sort'
                : null
            }
            onClick={() =>
              setSearchParams({
                sort_by: 'popularity.desc'
              })
            }
            value='popularity.desc'
          >
            Popular
          </button>
          <button
            className={
              searchParams.get('sort_by') === 'release_date.desc'
                ? 'active-sort'
                : null
            }
            onClick={() =>
              setSearchParams({
                sort_by: 'release_date.desc'
              })
            }
            value='release_date.desc'
          >
            By date
          </button>
        </div>
      </div>
      <div className='movies-list-content'>
        {queryData.isLoading ? (
          <MovieCardSkeleton count={20} />
        ) : (
          queryData?.data?.results?.map((movie) => (
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
          <button value='previous'>Previous</button>
        ) : (
          <button disabled value='previous'>
            Previous
          </button>
        )}
        <span>{page}</span>
        <button value='next'>Next</button>
      </div>
    </div>
  )
}

export default MoviesList
