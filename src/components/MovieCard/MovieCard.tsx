/* eslint-disable prefer-const */
import React, { useState } from 'react'
import { Link, useParams, useLocation, useSearchParams } from 'react-router-dom'
import PreloadImage from 'react-preload-image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { usePalette } from 'react-palette'

import './MovieCard.css'

export default function MovieCard({ poster_path, title, vote_average, id }) {
  const [isHover, setIsHover] = useState(false)

  let location = useLocation()
  const { type } = useParams()
  const [searchParams] = useSearchParams()
  const IMAGE_URL = `https://image.tmdb.org/t/p/w500${poster_path}`
  const { data, loading } = usePalette(IMAGE_URL)

  const handleMouseEnter = () => {
    setIsHover(true)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }

  const cardStyle = {
    boxShadow: isHover
      ? `0px 8px 32px -7px ${data?.lightVibrant}99`
      : `0px 8px 32px -7px ${data?.darkVibrant}`,
    backgroundColor: data?.muted,
    border: '1px solid transparent',
    transitionDuration: '200ms'
  }

  return (
    <Link
      key={id}
      className='movie-card-link'
      to={`/${type}/${id}`}
      state={{
        backgroundLocation: location,
        type: type
      }}
      title={title}
    >
      <div className='movie-card'>
        <div
          className='movie-card-image'
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className='img'>
            {!loading && (
              <PreloadImage
                style={{
                  backgroundColor: data?.muted
                }}
                lazy
                src={IMAGE_URL}
                alt=''
              />
            )}
          </div>
        </div>
        <div className='movie-card-title'>
          <span>{title}</span>
        </div>
        <div className='card-content-rating'>
          <FontAwesomeIcon icon={faStar} color='#EE9900' />
          <span style={{ marginLeft: '0.3rem' }}>{vote_average}</span>
        </div>
      </div>
    </Link>
  )
}
