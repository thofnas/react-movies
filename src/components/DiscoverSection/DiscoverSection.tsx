import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getMovies } from '../../api/movies'
import paramsToObject from '../../helpers/paramsToObject'

import MovieCard from '../MovieCard/MovieCard'
import MovieCardSkeleton from '../MovieCardSkeleton/MovieCardSkeleton'
import './DiscoverSection.css'

const DiscoverSection = ({ title, queryParams }) => {
  const { t } = useTranslation()
  const { type } = useParams()
  const [searchParams] = useSearchParams()

  const params = paramsToObject(searchParams)

  const queryData = useQuery({
    queryKey: [type, queryParams],
    queryFn: () => getMovies(type, { ...params, ...queryParams })
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
        <Link
          to={`/${type}/list${paramsToString({ ...params, ...queryParams })}`}
        >
          {t('See more')}
        </Link>
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
