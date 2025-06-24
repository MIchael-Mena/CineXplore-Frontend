export const apiEndpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register"
  },
  users: {
    base: "/api/users",
    byId: (id: number | string) => `/api/users/${id}`,
    update: (id: number | string) => `/api/users/${id}`,
    delete: (id: number | string) => `/api/users/${id}`,
    recommendations: (id: number | string) => `/api/users/${id}/recommendations`
  },
  actors: {
    base: "/api/actors",
    byId: (id: number | string) => `/api/actors/${id}`,
    create: "/api/actors",
    update: (id: number | string) => `/api/actors/${id}`,
    delete: (id: number | string) => `/api/actors/${id}`
  },
  directors: {
    base: "/api/directors",
    byId: (id: number | string) => `/api/directors/${id}`,
    create: "/api/directors",
    update: (id: number | string) => `/api/directors/${id}`,
    delete: (id: number | string) => `/api/directors/${id}`
  },
  genres: {
    base: "/api/genres",
    byId: (id: number | string) => `/api/genres/${id}`,
    create: "/api/genres",
    update: (id: number | string) => `/api/genres/${id}`,
    delete: (id: number | string) => `/api/genres/${id}`
  },
  movies: {
    base: "/api/movies",
    byId: (id: number | string) => `/api/movies/${id}`,
    create: "/api/movies",
    update: (id: number | string) => `/api/movies/${id}`,
    delete: (id: number | string) => `/api/movies/${id}`
  },
  userMovieRatings: {
    base: "/api/user-movie-ratings",
    rate: "/api/user-movie-ratings",
    delete: "/api/user-movie-ratings",
    byUser: (userId: number | string) => `/api/user-movie-ratings/user/${userId}`,
    byMovie: (movieId: number | string) => `/api/user-movie-ratings/movie/${movieId}`
  }
};