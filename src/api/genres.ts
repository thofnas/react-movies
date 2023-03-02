import axios from 'axios'

export const getGenres = async (type, params?) => {
  return await axios
    .get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${
        import.meta.env.VITE_API
      }`,
      { params: params }
    )
    .then((res) => res.data)
}
