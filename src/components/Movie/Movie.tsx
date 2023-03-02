import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getMovie } from '../../api/movies'

import './Movie.css'

export default function Movie({ typeB }) {
  const { type } = useParams()
  const { id } = useParams()

  const queryData = useQuery({
    queryKey: [type ? type : typeB, id],
    queryFn: () => getMovie(type ? type : typeB, id)
  })

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${
  //         import.meta.env.VITE_API
  //       }`
  //     )
  //     .then((res) => {
  //       setVideosData(res?.data)
  //       setLoadingVideos(false)
  //     })
  // }, [])

  const colorHandler = () => {
    if (
      queryData?.data?.vote_average.toFixed(1) === 0 ||
      queryData?.data?.vote_average.toFixed(1) === undefined
    ) {
      return '#6F7072'
    }
    if (queryData?.data?.vote_average.toFixed(1) <= 6.5) {
      return '#F44336'
    }
    if (queryData?.data?.vote_average.toFixed(1) <= 7.5) {
      return '#FF9800'
    }
    if (queryData?.data?.vote_average.toFixed(1) <= 10) {
      return '#4CAF50'
    }
  }

  return (
    <div className='movie-container'>
      <div className='movie-backdrop'>
        {!queryData?.isLoading && (
          <div
            className='movie-backdrop-img'
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${queryData?.data?.backdrop_path})`
            }}
          ></div>
        )}
      </div>
      <div className='movie-info-container'>
        <div className='movie-info-section'>
          {!queryData?.isLoading && (
            <img
              className='movie-thumb-img'
              src={`https://image.tmdb.org/t/p/w500${queryData?.data?.poster_path}`}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${queryData?.data?.poster_path})`
              }}
            ></img>
          )}
        </div>
        <div className='movie-info-section'>
          <span className='title'>
            {queryData?.data?.title || queryData?.data?.name}
          </span>

          {queryData?.data?.overview && (
            <span className='info-value'>{queryData?.data?.overview}</span>
          )}
        </div>
        <div className='movie-info-section'></div>

        {queryData?.data?.adult && (
          <div className='badge' style={{ backgroundColor: '#6F7072' }}>
            <span>18+</span>
          </div>
        )}
        <div className='badge' style={{ backgroundColor: colorHandler() }}>
          <span>{queryData?.data?.vote_average.toFixed(1)}</span>
        </div>

        {queryData?.data?.release_date && (
          <div className='movie-info-item'>
            <span className='info-label'>Release Date</span>
            <br />
            <span className='info-value'>
              {queryData?.data?.release_date || queryData?.data?.first_air_date}
            </span>
          </div>
        )}

        {queryData?.data?.genre && (
          <div className='movie-info-item'>
            <span className='info-label'>Genre</span>
            <br />
            <span className='info-value'>
              {queryData?.data?.genres?.map((genre) => genre.name).join(', ')}
            </span>
          </div>
        )}

        {queryData?.data?.runtime && (
          <div className='movie-info-item'>
            <span className='info-label'>Duration</span>
            <br />
            <span className='info-value'>
              {queryData?.data?.runtime} minutes
            </span>
          </div>
        )}

        {/* {!loadingVideos && (
          <div className='movie-info-item'>
            <span className='info-label'>Media</span>
            <br />
          </div>
        )} */}
      </div>
    </div>
  )
}
