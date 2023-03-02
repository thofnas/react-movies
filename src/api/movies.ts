import axios from 'axios'

export const getMovies = async (type: string, params?: object) => {
  return await axios
    .get(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${
        import.meta.env.VITE_API
      }`,
      { params: params }
    )
    .then((res) => res.data)
}

export const getMovie = async (type: string, id: string, params?: object) => {
  return await axios
    .get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${
        import.meta.env.VITE_API
      }`,
      { params: params }
    )
    .then((res) => res.data)
}
