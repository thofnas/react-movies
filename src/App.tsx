import { useEffect } from 'react'
import {
  Routes,
  Route,
  Outlet,
  useLocation,
  useNavigate,
  Navigate,
  useParams
} from 'react-router-dom'

import Header from './components/Header/Header'
import MoviesList from './pages/MoviesList/MoviesList'
import MoviesDiscover from './pages/MoviesDiscover/MoviesDiscover'
import MovieModal from './components/MovieModal/MovieModal'
import Movie from './components/Movie/Movie'
import Error from './components/Error/Error'
import Sidebar from './components/Sidebar/Sidebar'
import SidebarTrends from './components/SidebarTrends/SidebarTrends'

export default function App() {
  const location = useLocation()

  const state = location.state as { backgroundLocation?: Location }

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path=':type' element={<Layout />}>
          <Route index element={<MoviesDiscover />} />
          <Route path='list' element={<MoviesList />} />
          <Route path='list/search' element={<MoviesList />} />
          <Route path=':id' element={<Movie typeB={undefined} />} />
          <Route path='*' element={<Error />} />
        </Route>
        <Route path='*' element={<Navigate to={'/movie'} />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path='movie/:id' element={<MovieModal />} />
          <Route path='tv/:id' element={<MovieModal />} />
        </Routes>
      )}
    </>
  )
}

function Layout() {
  const { type } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (type !== 'movie' && type !== 'tv') navigate('/movie')
  })
  return (
    <div className='App'>
      <Header />
      <div
        className='container'
        style={{
          display: 'flex'
        }}
      >
        <Sidebar />
        <Outlet />
        <SidebarTrends />
      </div>
    </div>
  )
}
