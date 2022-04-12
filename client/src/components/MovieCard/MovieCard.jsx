import React from 'react'
import { Link, useParams, useLocation, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { usePalette } from 'react-palette'

import './MovieCard.css'

export default function MovieCard({ poster_path, title, vote_average, id }) {
    let location = useLocation()
    const { type } = useParams()
    const [searchParams] = useSearchParams()
    const IMAGE_URL = `https://image.tmdb.org/t/p/w500${poster_path}`
    const { data } = usePalette(IMAGE_URL)

    return (
        <Link
            className='movie-card-link'
            to={`/${type}/${id}${location?.search}`}
            state={{
                background: location,
                type: type
            }}
            title={title}
        >
            < div className='movie-card'>
                <div className="movie-card-image" style={{
                    boxShadow: `0px 8px 32px -7px ${data?.darkVibrant}`
                }}>
                    <img loading='lazy' src={IMAGE_URL} alt={poster_path} />
                </div>
                <div className="movie-card-title">
                    <span>{title}</span>
                </div>
                <div className="card-content-rating">
                    <FontAwesomeIcon icon={faStar} color='#EE9900' />
                    <span style={{ marginLeft: '0.3rem' }}>{vote_average}</span>
                </div>
            </div>
        </Link>
    )
}
