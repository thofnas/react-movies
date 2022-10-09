import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const MovieCardSkeleton = (props) => {
  return (
    <>
      {Array.from({ length: props.count }, (_, i) => (
        <div className="movie-card-skeleton" key={i + 'skeletoncard'}>
          <Skeleton height={400} style={{ marginBottom: '1rem' }} />
          <Skeleton count={2} />
        </div>
      ))}
    </>
  )
}

export default MovieCardSkeleton
