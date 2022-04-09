import React from 'react'
import { Dialog } from '@reach/dialog'
import "@reach/dialog/styles.css"

import './MovieModal.css'
import { useNavigate } from 'react-router-dom'
import Movie from '../Movie/Movie'

export default function MovieModal() {
    const navigate = useNavigate()
    return (
        <Dialog
            className='modal'
            aria-labelledby='label'
            onDismiss={() => navigate(-1)}>
            <Movie />
        </Dialog>
    )
}
