import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getGenres } from '../../api/genres'
import './Sidebar.css'

export default function Sidebar() {
  const [showMore, setShowMore] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { type } = useParams()

  const queryData = useQuery({
    queryKey: [type],
    queryFn: () => getGenres(type)
  })

  const genreClickHandler = (e) => {
    searchParams.set('with_genres', e.target.id)
    navigate(`/${type}/list?${searchParams}`)
  }

  return (
    <div className='sidebar'>
      <div className='genre-container'>
        <h3>Genres</h3>
        <ul
          className={!showMore ? 'sidebar-show-less' : ''}
          style={{ marginBottom: '0rem' }}
        >
          {queryData?.isLoading && <Skeleton count={2} />}
          {queryData?.data?.genres.map((genre) => {
            return (
              <li onClick={genreClickHandler} id={genre?.id} key={genre?.id}>
                {genre?.name}
              </li>
            )
          })}
        </ul>
        <ul>
          {showMore ? (
            <li
              className='sidebar-list-button'
              onClick={() => setShowMore(false)}
            >
              Show less...
            </li>
          ) : (
            <li
              className='sidebar-list-button'
              onClick={() => setShowMore(true)}
            >
              Show more...
            </li>
          )}
        </ul>
      </div>
      <div className='language-container'>
        <h3>Languages</h3>
        <ul>
          {languages.map((language) => {
            return <li key={language.id}>{language.name}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

const languages = [
  {
    id: 1,
    name: 'English'
  },
  {
    id: 2,
    name: 'Spanish'
  },
  {
    id: 3,
    name: 'French'
  },
  {
    id: 4,
    name: 'German'
  },
  {
    id: 5,
    name: 'Ukrainian'
  }
]
