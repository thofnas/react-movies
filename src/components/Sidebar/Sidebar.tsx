import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom'
import { getGenres } from '../../api/genres'
import './Sidebar.css'

function paramsToObject(entries) {
  const result = {}
  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tupple
    result[key] = value
  }
  return result
}
export default function Sidebar() {
  const { t, i18n } = useTranslation()
  const [showMore, setShowMore] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { type } = useParams()

  const params = paramsToObject(searchParams)

  const queryData = useQuery({
    queryKey: ['genres', type],
    queryFn: () => getGenres(type, params)
  })

  languages = languages.sort((prev, next) =>
    prev.english_name.localeCompare(next.english_name)
  )

  const genreClickHandler = (e) => {
    searchParams.set('with_genres', e.target.id)
    navigate(`/${type}/list?${searchParams}`)
  }

  const languageClickHandler = (language) => {
    i18n.changeLanguage(language.iso_639_1)
    searchParams.set('language', `${t('iso_639_1')}-${t('iso_3166_1')}`)
    navigate(`${location.pathname}?${searchParams}`)
  }

  return (
    <div className='sidebar'>
      <div className='genre-container'>
        <h3>{t('Genres')}</h3>
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
              {t('Show less...')}
            </li>
          ) : (
            <li
              className='sidebar-list-button'
              onClick={() => setShowMore(true)}
            >
              {t('Show more...')}
            </li>
          )}
        </ul>
      </div>
      <div className='language-container'>
        <h3>{t('Languages')}</h3>
        <ul>
          {languages.map((language) => {
            return (
              <li
                key={language.english_name}
                onClick={() => languageClickHandler(language)}
              >
                {language.name}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

let languages = [
  {
    iso_639_1: 'en',
    english_name: 'English',
    name: 'English'
  },
  {
    iso_639_1: 'es',
    english_name: 'Spanish',
    name: 'Español'
  },
  {
    iso_639_1: 'fr',
    english_name: 'French',
    name: 'Français'
  },
  {
    iso_639_1: 'ge',
    english_name: 'German',
    name: 'Deutsch'
  },
  {
    iso_639_1: 'uk',
    english_name: 'Ukrainian',
    name: 'Український'
  },
  {
    iso_639_1: 'it',
    english_name: 'Italian',
    name: 'Italiano'
  }
]
