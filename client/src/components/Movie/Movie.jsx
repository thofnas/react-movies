import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

import './Movie.css'

export default function Movie({ typeB }) {
    const location = useLocation()
    const navigate = useNavigate()
    let { type, id } = useParams()
    const [movieData, setMovieData] = useState()

    if (type === undefined) type = typeB


    useEffect(() => {
        if (location.state?.background === undefined) {
            navigate('', { replace: true })
        }
        fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API}`)
            .then(response => response.json())
            .then(data => {
                setMovieData(data)
                console.log(data);
            });
    }, [])

    return (
        <div className='movie-container'>
            <img className='movie-backdrop' loading='lazy' src={`https://image.tmdb.org/t/p/original/${movieData?.backdrop_path}`} alt="backdrop" />
            <div>{movieData?.title}</div>
            <span>MOVIE</span>
        </div>
    )
}
