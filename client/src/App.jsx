import { useState } from "react";
import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation,
  useNavigate,
  useParams,
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

  const [isTypeMovies, setTypeMovies] = useState(true)

  let background = location.state && location.state.background

  return (
    <>
      <Routes location={background || location}>
        <Route path=":type" element={<Layout />}>
          <Route index element={<MoviesDiscover MOVIES_LOCAL={MOVIES_LOCAL} />} />
          <Route path="list" element={<MoviesList MOVIES_LOCAL={MOVIES_LOCAL} />} />
          <Route path=":id" element={<Movie />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="profile" element={<ProfileLayout />}>
          <Route index element={<Profile />} />
          <Route path="watchlist" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="*" element={<Navigate to={'/movies'} />} />
      </Routes>
      {background &&
        <Route path={isTypeMovies ? 'movies/:id' : 'tv/:id'} element={<MovieModal />} />
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
      <div className="container">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}


const MOVIES_LOCAL =
  [
    {
      "adult": false,
      "backdrop_path": "/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg",
      "genre_ids": [
        16,
        10751,
        35,
        14
      ],
      "id": 508947,
      "original_language": "en",
      "original_title": "Turning Red",
      "overview": "Thirteen-year-old Mei is experiencing the awkwardness of being a teenager with a twist – when she gets too excited, she transforms into a giant red panda.",
      "popularity": 6323.817,
      "poster_path": "/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg",
      "release_date": "2022-03-01",
      "title": "Turning Red",
      "video": false,
      "vote_average": 7.5,
      "vote_count": 1209
    },
    {
      "adult": false,
      "backdrop_path": "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
      "genre_ids": [
        28,
        12,
        878
      ],
      "id": 634649,
      "original_language": "en",
      "original_title": "Spider-Man: No Way Home",
      "overview": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
      "popularity": 5864.498,
      "poster_path": "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      "release_date": "2021-12-15",
      "title": "Spider-Man: No Way Home",
      "video": false,
      "vote_average": 8.2,
      "vote_count": 10677
    },
    {
      "adult": false,
      "backdrop_path": "/ewUqXnwiRLhgmGhuksOdLgh49Ch.jpg",
      "genre_ids": [
        28,
        12,
        35,
        878,
        18
      ],
      "id": 696806,
      "original_language": "en",
      "original_title": "The Adam Project",
      "overview": "After accidentally crash-landing in 2022, time-traveling fighter pilot Adam Reed teams up with his 12-year-old self on a mission to save the future.",
      "popularity": 3080.025,
      "poster_path": "/wFjboE0aFZNbVOF05fzrka9Fqyx.jpg",
      "release_date": "2022-03-11",
      "title": "The Adam Project",
      "video": false,
      "vote_average": 7.1,
      "vote_count": 1345
    },
    {
      "adult": false,
      "backdrop_path": "/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg",
      "genre_ids": [
        16,
        35,
        10751,
        14
      ],
      "id": 568124,
      "original_language": "en",
      "original_title": "Encanto",
      "overview": "The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.",
      "popularity": 2497.092,
      "poster_path": "/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
      "release_date": "2021-11-24",
      "title": "Encanto",
      "video": false,
      "vote_average": 7.7,
      "vote_count": 5690
    },
    {
      "adult": false,
      "backdrop_path": "/t7I942V5U1Ggn6OevN75u3sNYH9.jpg",
      "genre_ids": [
        28,
        53
      ],
      "id": 760868,
      "original_language": "sv",
      "original_title": "Svart krabba",
      "overview": "To end an apocalyptic war and save her daughter, a reluctant soldier embarks on a desperate mission to cross a frozen sea carrying a top-secret cargo.",
      "popularity": 2328.19,
      "poster_path": "/mcIYHZYwUbvhvUt8Lb5nENJ7AlX.jpg",
      "release_date": "2022-03-18",
      "title": "Black Crab",
      "video": false,
      "vote_average": 6.1,
      "vote_count": 209
    },
    {
      "adult": false,
      "backdrop_path": "/2hGjmgZrS1nlsEl5PZorn7EsmzH.jpg",
      "genre_ids": [
        28,
        53
      ],
      "id": 823625,
      "original_language": "en",
      "original_title": "Blacklight",
      "overview": "Travis Block is a shadowy Government agent who specializes in removing operatives whose covers have been exposed. He then has to uncover a deadly conspiracy within his own ranks that reaches the highest echelons of power.",
      "popularity": 2289.078,
      "poster_path": "/7gFo1PEbe1CoSgNTnjCGdZbw0zP.jpg",
      "release_date": "2022-02-10",
      "title": "Blacklight",
      "video": false,
      "vote_average": 5.9,
      "vote_count": 211
    },
    {
      "adult": false,
      "backdrop_path": "/5P8SmMzSNYikXpxil6BYzJ16611.jpg",
      "genre_ids": [
        80,
        9648,
        53
      ],
      "id": 414906,
      "original_language": "en",
      "original_title": "The Batman",
      "overview": "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
      "popularity": 2103.864,
      "poster_path": "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      "release_date": "2022-03-01",
      "title": "The Batman",
      "video": false,
      "vote_average": 7.9,
      "vote_count": 2506
    },
    {
      "adult": false,
      "backdrop_path": "/tq3klWQevRK0Or0cGhsw0h3FDWQ.jpg",
      "genre_ids": [
        12,
        16,
        35,
        10751,
        14
      ],
      "id": 676705,
      "original_language": "fr",
      "original_title": "Pil's Adventures",
      "overview": "Pil, a little vagabond girl, lives on the streets of the medieval city of Roc-en-Brume, along with her three tame weasels. She survives of food stolen from the castle of the sinister Regent Tristain. One day, to escape his guards, Pil disguises herself as a princess. Thus she embarks upon a mad, delirious adventure, together with Crobar, a big clumsy guard who thinks she's a noble, and Rigolin, a young crackpot jester. Pil is going to have to save Roland, rightful heir to the throne under the curse of a spell. This adventure will turn the entire kingdom upside down, and teach Pil that nobility can be found in all of us.",
      "popularity": 1883.156,
      "poster_path": "/xy6wQ09rMIN2FfWPHJXCWyRZ3P9.jpg",
      "release_date": "2021-08-11",
      "title": "Pil's Adventures",
      "video": false,
      "vote_average": 7,
      "vote_count": 28
    },
    {
      "adult": false,
      "backdrop_path": "/f2J8DpT5bqV0AiI9VVcfiuqKo5l.jpg",
      "genre_ids": [
        28,
        99,
        35
      ],
      "id": 656663,
      "original_language": "en",
      "original_title": "Jackass Forever",
      "overview": "Celebrate the joy of a perfectly executed shot to the groin as Johnny Knoxville, Steve-O and the rest of the gang return alongside some newcomers for one final round of hilarious, wildly absurd and often dangerous displays of stunts and comedy.",
      "popularity": 1771.606,
      "poster_path": "/ugIdyvtAzHWOguD91UjHKoAvfum.jpg",
      "release_date": "2022-02-01",
      "title": "Jackass Forever",
      "video": false,
      "vote_average": 7.1,
      "vote_count": 165
    },
    {
      "adult": false,
      "backdrop_path": "/AqwA5sHHIhrz0r1TpwPl0Uh3nMG.jpg",
      "genre_ids": [
        27
      ],
      "id": 661791,
      "original_language": "es",
      "original_title": "La abuela",
      "overview": "A Paris model must return to Madrid where her grandmother, who raised her, has had a stroke. But spending just a few days with this relative turns into an unexpected nightmare.",
      "popularity": 1744.854,
      "poster_path": "/cdzUKycvzn0X6mQMxDZP9el81lz.jpg",
      "release_date": "2022-01-28",
      "title": "The Grandmother",
      "video": false,
      "vote_average": 6.2,
      "vote_count": 43
    },
    {
      "adult": false,
      "backdrop_path": "/33wnBK5NxvuKQv0Cxo3wMv0eR7F.jpg",
      "genre_ids": [
        27,
        53
      ],
      "id": 833425,
      "original_language": "en",
      "original_title": "No Exit",
      "overview": "Stranded at a rest stop in the mountains during a blizzard, a recovering addict discovers a kidnapped child hidden in a car belonging to one of the people inside the building which sets her on a terrifying struggle to identify who among them is the kidnapper.",
      "popularity": 1662.557,
      "poster_path": "/5cnLoWq9o5tuLe1Zq4BTX4LwZ2B.jpg",
      "release_date": "2022-02-25",
      "title": "No Exit",
      "video": false,
      "vote_average": 6.5,
      "vote_count": 286
    },
    {
      "adult": false,
      "backdrop_path": "/yzH5zvuEzzsHLZnn0jwYoPf0CMT.jpg",
      "genre_ids": [
        53,
        28
      ],
      "id": 760926,
      "original_language": "en",
      "original_title": "Gold",
      "overview": "In the not-too-distant future, two drifters traveling through the desert stumble across the biggest gold nugget ever found and the dream of immense wealth and greed takes hold. They hatch a plan to excavate their bounty, with one man leaving to secure the necessary tools while the other remains with the gold. The man who remains must endure harsh desert elements, ravenous wild dogs, and mysterious intruders, while battling the sinking suspicion that he has been abandoned to his fate.",
      "popularity": 1474.719,
      "poster_path": "/ejXBuNLvK4kZ7YcqeKqUWnCxdJq.jpg",
      "release_date": "2022-01-13",
      "title": "Gold",
      "video": false,
      "vote_average": 6.5,
      "vote_count": 147
    },
    {
      "adult": false,
      "backdrop_path": "/dK12GIdhGP6NPGFssK2Fh265jyr.jpg",
      "genre_ids": [
        28,
        35,
        80,
        53
      ],
      "id": 512195,
      "original_language": "en",
      "original_title": "Red Notice",
      "overview": "An Interpol-issued Red Notice is a global alert to hunt and capture the world's most wanted. But when a daring heist brings together the FBI's top profiler and two rival criminals, there's no telling what will happen.",
      "popularity": 1449.73,
      "poster_path": "/lAXONuqg41NwUMuzMiFvicDET9Y.jpg",
      "release_date": "2021-11-04",
      "title": "Red Notice",
      "video": false,
      "vote_average": 6.8,
      "vote_count": 3345
    }
  ]


