import { useTranslation } from 'react-i18next'
import DiscoverSection from '../../components/DiscoverSection/DiscoverSection'
import './MoviesDiscover.css'

export default function MoviesDiscover() {
  const { t } = useTranslation()
  const SECTIONS = [
    {
      title: t('Popular Movies'),
      queryParams: {
        sort_by: 'popularity.desc'
      }
    },
    {
      title: t('Top Rated Movies'),
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
