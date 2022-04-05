import React from 'react'
import './MoviesList.css'
import MovieCard from '../MovieCard/MovieCard'

export default function MoviesList({ MOVIES_LOCAL }) {
    return (
        <div className='movies-list'>
            {
                MOVIES_LOCAL.map(movie => (
                    <MovieCard key={movie?.id} movie={movie} />
                ))
            }


        </div>
    )
}

