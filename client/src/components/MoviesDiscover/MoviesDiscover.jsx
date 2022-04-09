import React from 'react'

import DiscoverSection from '../DiscoverSection/DiscoverSection'
import './MoviesDiscover.css'

export default function MoviesDiscover({ MOVIES_LOCAL }) {

    return (
        <div className='discover'>
            <DiscoverSection title={'Weekly Popular Movies'} moviesArray={MOVIES_LOCAL} />
            <DiscoverSection title={'2 Weeks Popular Movies'} moviesArray={MOVIES_LOCAL} />
        </div>
    )
}
