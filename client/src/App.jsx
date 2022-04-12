import {
  Routes,
  Route,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";

import Header from './components/Header/Header'
import MoviesList from './components/MoviesList/MoviesList'
import MoviesDiscover from './components/MoviesDiscover/MoviesDiscover'
import MovieModal from './components/MovieModal/MovieModal'
import Movie from './components/Movie/Movie'
import Error from './components/Error/Error'
import Sidebar from "./components/Sidebar/Sidebar"
import Profile from "./components/Profile/Profile"
import SidebarRight from "./components/SidebarRight/SidebarRight"


export default function App() {
  let location = useLocation();

  let background = location.state && location.state.background

  return (
    <>
      <Routes location={background || location}>
        <Route path=":type" element={<Layout />}>
          <Route index element={<MoviesDiscover />} />
          <Route path="list" element={<MoviesList />} />
          <Route path=":id" element={<Movie />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="profile" element={<ProfileLayout />}>
          <Route index element={<Profile />} />
          <Route path="watchlist" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="*" element={<Navigate to={'/movie'} />} />
      </Routes>

      {background &&
        <Routes>
          <Route path='movie/:id' element={<MovieModal />} />
          <Route path='tv/:id' element={<MovieModal />} />
        </Routes>
      }
    </>
  )
}

function Layout() {
  return (
    <div className="App">
      <Header />
      <div className="container"
        style={{
          display: 'flex',
        }}>
        <Sidebar />
        <Outlet />
        <SidebarRight />
      </div>
    </div>
  )
}

function ProfileLayout() {
  return (
    <div className="App">
      <div className="container" style={{ backgroundColor: 'var(--background-secondary)' }}>
        <Header />
        <Outlet />
      </div>
    </div>
  )
}