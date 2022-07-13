import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

import './Movie.css'

export default function Movie({ typeB }) {
    const location = useLocation()
    const navigate = useNavigate()
    const { type, id } = useParams()
    const [movieData, setMovieData] = useState()

    useEffect(() => {
        if (location.state?.background === undefined) {
            navigate('', { replace: true })
        }
        // axios.get(`https://api.themoviedb.org/3/${type ? type : typeB}/${id}?api_key=${process.env.REACT_APP_API}`)
        axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_API}&external_source=imdb_id`)
            .then(res => {
                setMovieData(res?.data?.posters[0])
                console.log(res?.data?.posters[0])
            })
    }, [])

    return (
        <div className='movie-container'>
            <img className='movie-backdrop' loading='lazy' src={`https://image.tmdb.org/t/p/original/${movieData?.file_path}`} alt="backdrop" />
            <div>{movieData?.title}</div>
            <span>MOVIE</span>
        </div>
    )
}