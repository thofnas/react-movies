import { useQuery } from '@tanstack/react-query'
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

  languages = languages.sort((prev, next) =>
    prev.english_name.localeCompare(next.english_name)
  )

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
            return <li key={language.english_name}>{language.name}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

let languages = [
  {
    iso_639_1: 'en',
    iso_3166_1: 'US',
    english_name: 'English',
    name: 'English'
  },
  {
    iso_639_1: 'es',
    iso_3166_1: 'ES',
    english_name: 'Spanish',
    name: 'Español'
  },
  {
    iso_639_1: 'fr',
    iso_3166_1: 'FR',
    english_name: 'French',
    name: 'Français'
  },
  {
    iso_639_1: 'de',
    iso_3166_1: 'DE',
    english_name: 'German',
    name: 'Deutsch'
  },
  {
    iso_639_1: 'uk',
    iso_3166_1: 'UA',
    english_name: 'Ukrainian',
    name: 'Український'
  },
  {
    iso_639_1: 'it',
    iso_3166_1: 'IT',
    english_name: 'Italian',
    name: 'Italiano'
  },
  {
    iso_639_1: 'ja',
    iso_3166_1: 'JP',
    english_name: 'Japanese',
    name: '日本語'
  }
]
