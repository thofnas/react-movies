import React from 'react'

import DiscoverSection from '../DiscoverSection/DiscoverSection'
import './MoviesDiscover.css'

export default function MoviesDiscover() {

    const SECTIONS = [
        {
            title: 'Popular Movies',
            queries: {
                'sort_by': 'popularity.desc'
            }
        },
        {
            title: 'Top Rated Movies',
            queries: {
                'sort_by': 'vote_average.desc',
                'vote_count.gte': '500'
            }
        }
    ]

    return (
        <div className='discover'>
            {SECTIONS.map(section => (
                <DiscoverSection
                    key={section?.title}
                    title={section?.title}
                    queries={section?.queries}
                />
            ))}
        </div>
    )
}