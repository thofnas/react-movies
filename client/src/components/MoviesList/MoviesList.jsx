import React, { useEffect, useState } from 'react'
import './MoviesList.css'
import MovieCard from '../MovieCard/MovieCard'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

export default function MoviesList() {
    const location = useLocation()
    const [movies, setMovies] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(1)
    const { type } = useParams()

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.REACT_APP_API}&${location.search.substring(1)}&page=${page}`
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setMovies(data?.results)
            })
    }, [location, page])

    return (
        <div className='movies-list'>
            <div className='movies-list-header'>Sort by</div>
            <div className='movies-list-content'>

                {
                    movies.map(movie => (
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
            <div className='pages-controll'>
                {page > 1
                    ? <button onClick={() => setPage(page - 1)}>Previous</button>
                    : <button disabled onClick={() => setPage(page - 1)}>Previous</button>
                }
                <span>{page}</span>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    )
}