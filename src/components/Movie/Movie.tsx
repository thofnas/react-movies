import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

import './Movie.css'

export default function Movie({ typeB }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()

  const [movieData, setMovieData] = useState<any>()
  const [videosData, setVideosData] = useState<any>()
  const [loadingMain, setLoadingMain] = useState<boolean>(true)
  const [loadingVideos, setLoadingVideos] = useState<boolean>(true)

  if (location.state?.backgroundLocation === undefined) {
    navigate('', { replace: true })
  }

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${typeB}/${id}?api_key=${
          import.meta.env.VITE_API
        }`
      )
      .then((res) => {
        setMovieData(res?.data)
        setLoadingMain(false)
      })
    axios
      .get(
        `https://api.themoviedb.org/3/${typeB}/${id}/videos?api_key=${
          import.meta.env.VITE_API
        }`
      )
      .then((res) => {
        setVideosData(res?.data)
        setLoadingVideos(false)
      })
  }, [])

  const colorHandler = () => {
    if (
      movieData?.vote_average.toFixed(1) === 0 ||
      movieData?.vote_average.toFixed(1) === undefined
    ) {
      return '#6F7072'
    }
    if (movieData?.vote_average.toFixed(1) <= 6.5) {
      return '#F44336'
    }
    if (movieData?.vote_average.toFixed(1) <= 7.5) {
      return '#FF9800'
    }
    if (movieData?.vote_average.toFixed(1) <= 10) {
      return '#4CAF50'
    }
  }

  return (
    <div className='movie-container'>
      <div className='movie-backdrop'>
        {!loadingMain && (
          <div
            className='movie-backdrop-img'
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData?.backdrop_path})`
            }}
          ></div>
        )}
      </div>
      <div className='movie-info-container'>
        <div className='movie-info-section'>
          {!loadingMain && (
            <img
              className='movie-thumb-img'
              src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieData?.poster_path})`
              }}
            ></img>
          )}
        </div>
        <div className='movie-info-section'>
          <span className='title'>{movieData?.title || movieData?.name}</span>

          {movieData?.overview && (
            <span className='info-value'>{movieData?.overview}</span>
          )}
        </div>
        <div className='movie-info-section'></div>

        {movieData?.adult && (
          <div className='badge' style={{ backgroundColor: '#6F7072' }}>
            <span>18+</span>
          </div>
        )}
        <div className='badge' style={{ backgroundColor: colorHandler() }}>
          <span>{movieData?.vote_average.toFixed(1)}</span>
        </div>

        {movieData?.release_date && (
          <div className='movie-info-item'>
            <span className='info-label'>Release Date</span>
            <br />
            <span className='info-value'>
              {movieData?.release_date || movieData?.first_air_date}
            </span>
          </div>
        )}

        {movieData?.genre && (
          <div className='movie-info-item'>
            <span className='info-label'>Genre</span>
            <br />
            <span className='info-value'>
              {movieData?.genres?.map((genre) => genre.name).join(', ')}
            </span>
          </div>
        )}

        {movieData?.runtime && (
          <div className='movie-info-item'>
            <span className='info-label'>Duration</span>
            <br />
            <span className='info-value'>{movieData?.runtime} minutes</span>
          </div>
        )}

        {!loadingVideos && (
          <div className='movie-info-item'>
            <span className='info-label'>Media</span>
            <br />

            {videosData?.results.forEach((video) => {
              return (
                <iframe
                  width='420'
                  height='315'
                  src={`https://www.youtube.com/embed/${video?.key}`}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  title='Embedded youtube'
                ></iframe>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
