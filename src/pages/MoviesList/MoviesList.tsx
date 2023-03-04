import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import scrollIntoView from 'scroll-into-view-if-needed'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUp } from '@fortawesome/free-regular-svg-icons'

import './MoviesList.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import MovieCardSkeleton from '../../components/MovieCardSkeleton/MovieCardSkeleton'
import { getMovies } from '../../api/movies'
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
  const [isScrollButtonActive, setScrollButtonActive] = useState<boolean>()
  const [searchParams, setSearchParams] = useSearchParams()
  const { type } = useParams()
  const appElement = document.getElementsByClassName('App')[0]

  let params = paramsToObject(searchParams)

  const queryData = useInfiniteQuery({
    queryKey: [type, params],
    queryFn: ({ pageParam = 1 }) => getMovies(type, params, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      return nextPage <= lastPage.total_pages ? nextPage : undefined
    },
    keepPreviousData: true
  })

  const queryDataGenres = useQuery({
    queryKey: [type],
    queryFn: () => getGenres(type)
  })

  useEffect(() => {
    const onScroll = async (event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement

      if (
        !queryData.isFetching &&
        scrollHeight - scrollTop <= clientHeight * 1.75
      ) {
        if (queryData.hasNextPage) await queryData.fetchNextPage()
      }
    }
    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  })

  useEffect(() => {
    const onScroll = async (event) => {
      const { scrollTop, clientHeight } = event.target.scrollingElement

      if (!isScrollButtonActive && scrollTop >= clientHeight) {
        setScrollButtonActive(true)
      } else {
        setScrollButtonActive(false)
      }
    }
    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      <div className='movies-list'>
        <div className='movies-list-control'>
          <div className='left-container'>
            <span>
              {
                queryDataGenres?.data?.genres?.find(
                  (genre) =>
                    genre.id === Number(searchParams.get('with_genres'))
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
            queryData?.data?.pages?.map((page) =>
              page.results?.map((movie) => (
                <MovieCard
                  key={movie?.id}
                  id={movie?.id}
                  title={movie?.title || movie?.name}
                  poster_path={movie?.poster_path}
                  vote_average={movie?.vote_average}
                />
              ))
            )
          )}
        </div>
      </div>
      <div
        onClick={() =>
          scrollIntoView(appElement, { behavior: 'smooth', block: 'start' })
        }
        className={`scroll-to-top-container ${
          isScrollButtonActive ? 'active' : ''
        }`}
      >
        <FontAwesomeIcon icon={faCircleUp} size='3x' />
      </div>
    </>
  )
}

export default MoviesList
