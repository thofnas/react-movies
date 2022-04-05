import React from 'react'
import { usePalette } from 'react-palette'

import './MovieCard.css'

export default function MovieCard({ poster_path, title, vote_average }) {
    const IMAGE_URL = `https://image.tmdb.org/t/p/w500${poster_path}`
    const { data, loading, error } = usePalette(IMAGE_URL)


    return (
        <div className='movie-card'>
            <div className="movie-card-image" style={{
                boxShadow: `0px 8px 32px -7px ${data?.darkVibrant}`
            }}>
                <img loading='lazy' src={IMAGE_URL} alt={poster_path} />
            </div>
            <div className="movie-card-title">
                <span>{title}</span>
            </div>
            <div className="card-content-rating">
                <span>{vote_average}</span>
            </div>
        </div>
    )
}
