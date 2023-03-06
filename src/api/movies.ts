import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

export const getMovies = async (type: string, params?: object, page = 1) => {
  return await api
    .get(`/discover/${type}?api_key=${import.meta.env.VITE_API}`, {
      params: { ...params, page: page }
    })
    .then((res) => res.data)
}

export const getSearchedMovies = async (
  type: string,
  params?: object,
  page = 1
) => {
  return await api
    .get(`/search/${type}?api_key=${import.meta.env.VITE_API}`, {
      params: { ...params, page: page }
    })
    .then((res) => res.data)
}

export const getMovie = async (type: string, id: string, params?: object) => {
  return await api
    .get(`/${type}/${id}?api_key=${import.meta.env.VITE_API}`, {
      params: params
    })
    .then((res) => res.data)
}
