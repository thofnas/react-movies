import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import scrollIntoView from 'scroll-into-view-if-needed'

import './MoviesList.css'
import MovieCard from '../MovieCard/MovieCard'

export default function MoviesList() {
    const location = useLocation()
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    const [searchParams] = useSearchParams()
    const [page, setPage] = useState(1)
    const [sorting, setSorting] = useState(searchParams.get('sort_by') ? searchParams.get('sort_by') : 'popularity.desc')
    const { type } = useParams()
    const appElement = document.getElementsByClassName('App')[0]

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.REACT_APP_API}&${location.search.substring(1)}&page=${page}`
        console.log(url)
        axios.get(url)
            .then(res => {
                setMovies(res?.data?.results)
            }).catch(err => {
                console.log(err)
            })
    }, [location, page])

    const sortingHandler = (e) => {
        setSorting(e.target.value)
        searchParams.set('sort_by', e.target.value)
        e.target.value === 'vote_average.desc'
            ? searchParams.set('vote_count.gte', '500')
            : searchParams.delete('vote_count.gte')
        navigate(`/${type}/list?${searchParams}`)
        e.target.className = 'active'
    }

    const pageHandler = (e) => {
        e.target.value === 'next'
            ? setPage(page + 1)
            : setPage(page - 1)

        scrollIntoView(appElement, {
            behavior: 'smooth',
            block: 'start'
        })
    }

    return (
        <div className='movies-list'>
            <div className='movies-list-control'>
                <button onClick={sortingHandler} value='vote_average.desc'>Top rated</button>
                <button onClick={sortingHandler} value='popularity.desc'>Popular</button>
            </div>
            <div className='movies-list-content'>

                {
                    movies.map(movie => (
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
            <div className='pages-control'>
                {page > 1
                    ? <button onClick={pageHandler} value='previous'>Previous</button>
                    : <button disabled onClick={pageHandler} value='previous'>Previous</button>
                }
                <span>{page}</span>
                <button onClick={pageHandler} value='next'>Next</button>
            </div>
        </div>
    )
}