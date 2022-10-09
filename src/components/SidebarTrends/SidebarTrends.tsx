import React from 'react'
import { useParams } from 'react-router-dom'
import './SidebarTrends.css'

export default function SidebarTrends() {
    const { type } = useParams()

    return (
        <div className='sidebar-trends'>
            Trending {type === 'movie' ? 'Movies' : 'TV Shows'}
        </div>
    )
}