import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

type LocationProps = {
  state: {
    background: Location
  }
}

import './Movie.css'

export default function Movie({ typeB }) {
  const location = useLocation() as unknown as LocationProps
  const navigate = useNavigate()
  const { type, id } = useParams()
  const [movieData, setMovieData] = useState<any>()
  const [videosData, setVideosData] = useState<any>()
  const [loadingMain, setLoadingMain] = useState<boolean>(true)
  const [loadingVideos, setLoadingVideos] = useState<boolean>(true)

  useEffect(() => {
    if (location.state?.background === undefined) {
      navigate('', { replace: true })
    }
    axios
      .get(
        `https://api.themoviedb.org/3/${type ? type : typeB}/${id}?api_key=${
          process.env.REACT_APP_API
        }`
      )
      .then((res) => {
        setMovieData(res?.data)
        setLoadingMain(false)
      })
    axios
      .get(
        `https://api.themoviedb.org/3/${
          type ? type : typeB
        }/${id}/videos?api_key=${process.env.REACT_APP_API}`
      )
      .then((res) => {
        setVideosData(res?.data)
        setLoadingVideos(false)
      })
  }, [])

  const colorHandler = () => {
    if (movieData?.vote_average.toFixed(1) === 0) {
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
    <div className="movie-container">
      <div className="movie-thumb-container">
        {!loadingMain && (
          <div
            className="movie-thumb"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieData?.poster_path})`
            }}
          ></div>
        )}
      </div>
      <div className="movie-info-container">
        <div className="movie-title">
          <span className="title">{movieData?.title || movieData?.name}</span>

          <div className="badges-container">
            {movieData?.adult && (
              <span className="badge" style={{ backgroundColor: '#6F7072' }}>
                18+
              </span>
            )}
            <span className="badge" style={{ backgroundColor: colorHandler() }}>
              {movieData?.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
        <div className="movie-info">
          <div className="movie-info-row">
            <div className="movie-info-column">
              {movieData?.release_date && (
                <div className="movie-info-item">
                  <span className="info-label">Release Date</span>
                  <br />
                  <span className="info-value">
                    {movieData?.release_date || movieData?.first_air_date}
                  </span>
                </div>
              )}

              {movieData?.genre && (
                <div className="movie-info-item">
                  <span className="info-label">Genre</span>
                  <br />
                  <span className="info-value">
                    {movieData?.genres?.map((genre) => genre.name).join(', ')}
                  </span>
                </div>
              )}

              {movieData?.runtime && (
                <div className="movie-info-item">
                  <span className="info-label">Duration</span>
                  <br />
                  <span className="info-value">
                    {movieData?.runtime} minutes
                  </span>
                </div>
              )}
            </div>
            <div className="movie-info-column">
              {movieData?.overview && (
                <div className="movie-info-item">
                  <span className="info-label">Overview</span>
                  <br />
                  <span className="info-value">{movieData?.overview}</span>
                </div>
              )}
            </div>
          </div>
          <div className="movie-info-row">
            <div className="movie-info-column">
              {!loadingVideos && (
                <div className="movie-info-item">
                  <span className="info-label">Media</span>
                  <br />

                  {videosData?.results.forEach((video) => {
                    <iframe
                      width="420"
                      height="315"
                      src={`https://www.youtube.com/embed/${video?.key}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                    ></iframe>
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
