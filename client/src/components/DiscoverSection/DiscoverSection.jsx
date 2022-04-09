import React from 'react'
import { Link } from 'react-router-dom'

import MovieCard from '../MovieCard/MovieCard'
import './DiscoverSection.css'

export default function DiscoverSection({ moviesArray, title }) {
    return (
        <div className='discover-section'>
            <div className="discover-section-title">
                <h2>{title}</h2>
                <Link to={'/'}>See more</Link>
            </div>
            <div className="discover-section-list">
                {
                    moviesArray.slice(0, 4).map(movie => (
                        <MovieCard
                            key={movie?.id}
                            id={movie?.id}
                            title={movie?.title}
                            poster_path={movie?.poster_path}
                            vote_average={movie?.vote_average}
                        />
                    ))
                }
            </div>
        </div>
    )
}
