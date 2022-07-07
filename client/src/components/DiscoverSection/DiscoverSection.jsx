import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import MovieCard from '../MovieCard/MovieCard'
import './DiscoverSection.css'

export default function DiscoverSection({ title, queries }) {
    const { type } = useParams()
    const [moviesSection, setMoviesSection] = useState([])
    const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.REACT_APP_API}`

    const queryString = (queries, isForApi) => {
        let queryString = isForApi ? '&' : '?'
        let index = 0

        for (let key in queries) {
            index === 0
                ? queryString += `${key}=${queries[key]}`
                : queryString += `&${key}=${queries[key]}`
            index++
        }
        return queryString
    }

    useEffect(() => {
        axios.get(url + queryString(queries, true))
            .then(res => {
                setMoviesSection(res?.data?.results)
            }).catch(err => {
                console.log(err)
            })
    }, [type])

    return (
        <div className='discover-section'>
            <div className="discover-section-title">
                <h2>{title}</h2>
                <Link to={`/${type}/list${queryString(queries, false)}`}>See more</Link>
            </div>
            <div className="discover-section-list">
                {
                    moviesSection?.slice(0, 4).map(movie => (
                        <MovieCard
                            key={movie?.id}
                            id={movie?.id}
                            title={movie?.title || movie?.name}
                            poster_path={movie?.poster_path}
                            vote_average={movie?.vote_average}
                        />
                    ))
                }
            </div>
        </div>
    )
}