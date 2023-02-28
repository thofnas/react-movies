import React, { useRef, useEffect } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import './Header.css'

export default function Header() {
  const [searchInputText, setSearchInputText] = React.useState('')
  const { type } = useParams()

  const searchInput = useRef<HTMLInputElement>(null)

  const isSigned = true
  const searchButtonHandler = () => {
    searchInput.current.focus()
  }

  let color = type === 'movie' ? '#0066ee' : '#ee1100'
  if (type !== 'movie' && type !== 'tv') color = '#444444'

  return (
    <header>
      <div className='header-logo-container'>
        <NavLink
          to={`/${type ? type : 'movie'}`}
          style={{
            textShadow: `0px 0px 50px ${color}`
          }}
        >
          <FontAwesomeIcon
            icon={faFilm}
            size='3x'
            style={{
              position: 'absolute',
              display: 'flex',
              zIndex: '-1',
              opacity: '0.2',
              color: color,
              transform: 'translateX(-30%)',
              transitionDuration: '0.5s'
            }}
          />
          <h2>
            <span style={{ color: color }}>N</span>
            Movies
          </h2>
        </NavLink>
      </div>
      <div className='header-container'>
        <div className='header-search-container'>
          <input
            className='search-input'
            type='search'
            ref={searchInput}
            onChange={(e) => setSearchInputText(e.target.value)}
            placeholder='Search any movies or tv shows'
          />
          <button className='search-btn' onClick={searchButtonHandler}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className='header-buttons-container'>
          <NavLink to='/movie'>Movies</NavLink>
          <NavLink to='/tv'>TV Shows</NavLink>
        </div>
      </div>
    </header>
  )
}
