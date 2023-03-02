import DiscoverSection from '../../components/DiscoverSection/DiscoverSection'
import './MoviesDiscover.css'

export default function MoviesDiscover() {
  const SECTIONS = [
    {
      title: 'Popular Movies',
      queryParams: {
        sort_by: 'popularity.desc'
      }
    },
    {
      title: 'Top Rated Movies',
      queryParams: {
        sort_by: 'vote_average.desc',
        'vote_count.gte': '500'
      }
    }
  ]

  return (
    <div className='discover'>
      {SECTIONS.map((section) => (
        <DiscoverSection
          key={section?.title}
          title={section?.title}
          queryParams={section?.queryParams}
        />
      ))}
    </div>
  )
}
