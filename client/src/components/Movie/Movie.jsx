import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import './Movie.css'

export default function Movie() {
    const { id } = useParams()
    const [movieData, setMovieData] = useState()

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API}`)
            .then(response => response.json())
            .then(data => {
                setMovieData(data)
                console.log(data);
            });
    }, [])

    return (
        <div className='movie-container'>
            <img className='movie-backdrop' loading='lazy' src={`https://image.tmdb.org/t/p/original/${movieData?.backdrop_path}`} alt="backdrop" />
        </div>
    )
}
