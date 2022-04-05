import React from 'react'
import './Sidebar.css'

export default function Sidebar() {
    const [showMore, setShowMore] = React.useState(false)
    return (
        <div className="sidebar">
            <div className="genre-container">
                <h3>Genres</h3>
                <ul className={!showMore && 'sidebar-show-less'} style={{ marginBottom: "0rem" }}>
                    {genres.map(genre => {
                        return (
                            <li key={genre.id}>{genre.name}</li>
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

const genres = [
    {
        id: 28,
        name: 'Action'
    },
    {
        id: 12,
        name: 'Adventure'
    },
    {
        id: 16,
        name: 'Animation'
    },
    {
        id: 35,
        name: 'Comedy'
    },
    {
        id: 80,
        name: 'Crime'
    },
    {
        id: 99,
        name: 'Documentary'
    },
    {
        id: 18,
        name: 'Drama'
    },
    {
        id: 10751,
        name: 'Family'
    },
    {
        id: 14,
        name: 'Fantasy'
    },
    {
        id: 36,
        name: 'History'
    },
    {
        id: 27,
        name: 'Horror'
    },
    {
        id: 10402,
        name: 'Music'
    },
    {
        id: 9648,
        name: 'Mystery'
    },
    {
        id: 10749,
        name: 'Romance'
    },
    {
        id: 878,
        name: 'Science Fiction'
    },
    {
        id: 10770,
        name: 'TV Movie'
    },
    {
        id: 53,
        name: 'Thriller'
    },
    {
        id: 10752,
        name: 'War'
    },
    {
        id: 37,
        name: 'Western'
    }
]

const languages = [
    {
        id: 'en',
        name: 'English'
    },
    {
        id: 'fr',
        name: 'French'
    },
    {
        id: 'it',
        name: 'Italian'
    },
    {
        id: 'es',
        name: 'Spanish'
    },
    {
        id: 'de',
        name: 'German'
    },
    {
        id: 'ua',
        name: 'Ukrainian'
    }
]
