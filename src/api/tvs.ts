import axios from 'axios'

export const getTVs = async (type, params?) => {
  return await axios
    .get(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${
        import.meta.env.VITE_API
      }`,
      { params: params }
    )
    .then((res) => res.data)
}
