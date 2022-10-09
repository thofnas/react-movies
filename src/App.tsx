import React from 'react'
import {
  Routes,
  Route,
  Outlet,
  useLocation,
  useNavigate,
  Navigate,
  useParams
} from 'react-router-dom'
import { useEffect } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { motion, AnimatePresence } from 'framer-motion'
import { Location } from 'history'

import Header from './components/Header/Header'
import MoviesList from './components/MoviesList/MoviesList'
import MoviesDiscover from './components/MoviesDiscover/MoviesDiscover'
import MovieModal from './components/MovieModal/MovieModal'
import Movie from './components/Movie/Movie'
import Error from './components/Error/Error'
import Sidebar from './components/Sidebar/Sidebar'
import Profile from './components/Profile/Profile'
import SidebarTrends from './components/SidebarTrends/SidebarTrends'

type LocationProps = {
  state: {
    background: Location
  }
}

export default function App() {
  const location = useLocation() as unknown as LocationProps

  const background = location.state && location.state.background

  return (
    <SkeletonTheme baseColor="#222128" highlightColor="#3A393E">
      <AnimatePresence>
        <Routes location={background || location}>
          <Route path=":type" element={<Layout />}>
            <Route index element={<MoviesDiscover />} />
            <Route path="list" element={<MoviesList />} />
            <Route path=":id" element={<Movie typeB={undefined} />} />
            <Route path="*" element={<Error />} />
          </Route>
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path="watchlist" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Route>
          <Route path="*" element={<Navigate to={'/movie'} />} />
        </Routes>

        {background && (
          <Routes>
            <Route path="movie/:id" element={<MovieModal />} />
            <Route path="tv/:id" element={<MovieModal />} />
          </Routes>
        )}
      </AnimatePresence>
    </SkeletonTheme>
  )
}

function Layout() {
  const { type } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (type !== 'movie' && type !== 'tv') navigate('/movie')
  })
  return (
    <div className="App">
      <Header />
      <div
        className="container"
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

function ProfileLayout() {
  return (
    <div>
      <div
        className="container"
        style={{ backgroundColor: 'var(--background-secondary)' }}
      >
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
