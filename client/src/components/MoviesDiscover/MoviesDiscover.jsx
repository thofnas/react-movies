import React from 'react'
import { Link } from 'react-router-dom'

import MovieCard from '../MovieCard/MovieCard'
import './MoviesDiscover.css'

export default function MoviesDiscover({ MOVIES_LOCAL }) {


    return (
        <div className='discover'>
            <div className='discover-section'>
                <div className="discover-section-title">
                    <h2>Weekly Popular Movies</h2>
                    <Link to={'/'}>See more</Link>
                </div>
                <div className="discover-section-list">
                    {
                        MOVIES_LOCAL.slice(0, 4).map(movie => (
                            <MovieCard
                                key={movie?.id}
                                title={movie?.title}
                                poster_path={movie?.poster_path}
                                vote_average={movie?.vote_average} />
                        ))
                    }
                </div>
            </div>
            <div className='discover-section'>
                <div className="discover-section-title">
                    <h2>2 Weeks Popular Movies</h2>
                    <Link to={'/'}>See more</Link>
                </div>
                <div className="discover-section-list">
                    {
                        MOVIES_LOCAL.slice(4, 8).map(movie => (
                            <MovieCard
                                key={movie?.id}
                                title={movie?.title}
                                poster_path={movie?.poster_path}
                                vote_average={movie?.vote_average} />
                        ))
                    }
                </div>
            </div>

        </div>
    )
}
