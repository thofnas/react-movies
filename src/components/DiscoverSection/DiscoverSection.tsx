import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { getMovies } from '../../api/movies'
import { getTVs } from '../../api/tvs'

import MovieCard from '../MovieCard/MovieCard'
import MovieCardSkeleton from '../MovieCardSkeleton/MovieCardSkeleton'
import './DiscoverSection.css'

const DiscoverSection = ({ title, queryParams }) => {
  const { type } = useParams()

  const queryData = useQuery({
    queryKey: [type, queryParams],
    queryFn: () => getMovies(type, queryParams)
  })

  const paramsToString = (queryParams) => {
    let queryString = ''
    let index = 0

    for (const key in queryParams) {
      index === 0
        ? (queryString += `?${key}=${queryParams[key]}`)
        : (queryString += `&${key}=${queryParams[key]}`)
      index++
    }
    return queryString
  }

  return (
    <div className='discover-section'>
      <div className='discover-section-title'>
        <h2>{title}</h2>
        <Link to={`/${type}/list${paramsToString(queryParams)}`}>See more</Link>
      </div>
      <div className='discover-section-list'>
        {queryData?.isLoading && <MovieCardSkeleton count={4} />}
        {queryData?.data?.results?.slice(0, 4).map((movie) => (
          <MovieCard
            key={movie?.id}
            id={movie?.id}
            title={movie?.title || movie?.name}
            poster_path={movie?.poster_path}
            vote_average={movie?.vote_average}
          />
        ))}
      </div>
    </div>
  )
}

export default DiscoverSection
