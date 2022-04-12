import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
    const [showMore, setShowMore] = useState(false)
    const [genres, setGenre] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const [selectedGenre, setSelectedGenre] = useState('')
    let navigate = useNavigate()
    let { type } = useParams()

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API}`)
            .then(res => res.json())
            .then(data => {
                setGenre(data?.genres)
            })
    }, [type])

    const genreClickHandler = (e) => {
        setSelectedGenre(e.target.value)
        searchParams.set('with_genres', e.target.id)
        navigate(`/${type}/list?${searchParams}`)
    }

    return (
        <div className="sidebar">
            <div className="genre-container">
                <h3>Genres</h3>
                <ul className={!showMore ? 'sidebar-show-less' : ''} style={{ marginBottom: "0rem" }}>
                    {genres.map((genre) => {
                        return (
                            <li
                                onClick={genreClickHandler}
                                id={genre?.id}
                                name={genre?.name}
                                key={genre?.id}
                            >
                                {genre?.name}
                            </li>
                        )
                    })}
                </ul>
                <ul>
                    {
                        showMore ?
                            <li className='sidebar-list-button' onClick={() => setShowMore(false)}>Show less...</li>
                            :
                            <li className='sidebar-list-button' onClick={() => setShowMore(true)}>Show more...</li>
                    }
                </ul>
            </div>
            <div className="language-container">
                <h3>Languages</h3>
                <ul>
                    {languages.map(language => {
                        return (
                            <li key={language.id}>{language.name}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

const languages = [
    {
        id: 1,
        name: 'English'
    },
    {
        id: 2,
        name: 'Spanish'
    },
    {
        id: 3,
        name: 'French'
    },
    {
        id: 4,
        name: 'German'
    },
    {
        id: 5,
        name: 'Ukrainian'
    }
]