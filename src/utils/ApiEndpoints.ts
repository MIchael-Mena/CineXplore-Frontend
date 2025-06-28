const apiEndpoints = {
  auth: {
    // POST
    login: '/auth/login',
    // POST
    register: '/auth/register',
    // GET
    refreshToken: '/auth/refresh-token',
  },
  users: {
    // GET
    getById: (id: number | string) => `/api/users/${id}`,
    // GET
    getAll: '/api/users',
    // DELETE
    delete: (id: number | string) => `/api/users/${id}`,
    // GET
    getRecommendations: (id: number | string) =>
      `/api/users/${id}/recommendations`,
  },
  actors: {
    // GET
    getAll: '/api/actors',
    // GET
    getById: (id: number | string) => `/api/actors/${id}`,
    // GET
    getMovies: (actorId: number | string) => `/api/actors/${actorId}/movies`,
    // POST
    create: '/api/actors',
    // PUT
    update: (id: number | string) => `/api/actors/${id}`,
    // DELETE
    delete: (id: number | string) => `/api/actors/${id}`,
  },
  directors: {
    // GET
    getAll: '/api/directors',
    // GET
    getById: (id: number | string) => `/api/directors/${id}`,
    // GET
    getMovies: (directorId: number | string) =>
      `/api/directors/${directorId}/movies`,
    // POST
    create: '/api/directors',
    // PUT
    update: (id: number | string) => `/api/directors/${id}`,
    // DELETE
    delete: (id: number | string) => `/api/directors/${id}`,
  },
  genres: {
    // GET
    getAll: '/api/genres',
    // GET
    getById: (id: number | string) => `/api/genres/${id}`,
    // GET
    getMovies: (genreId: number | string) => `/api/genres/${genreId}/movies`,
    // POST
    create: '/api/genres',
    // PUT
    update: (id: number | string) => `/api/genres/${id}`,
    // DELETE
    delete: (id: number | string) => `/api/genres/${id}`,
  },
  movies: {
    // GET (Admite query params para búsqueda/filtrado)
    getAll: '/api/movies',
    // GET
    getById: (id: number | string) => `/api/movies/${id}`,
    // POST
    create: '/api/movies',
    // PUT
    update: (id: number | string) => `/api/movies/${id}`,
    // DELETE
    delete: (id: number | string) => `/api/movies/${id}`,
    // POST
    addActor: (movieId: number | string, actorId: number | string) =>
      `/api/movies/${movieId}/actors/${actorId}`,
    // DELETE
    removeActor: (movieId: number | string, actorId: number | string) =>
      `/api/movies/${movieId}/actors/${actorId}`,
    // GET
    getActors: (movieId: number | string) => `/api/movies/${movieId}/actors`,
    // POST
    addDirector: (movieId: number | string, directorId: number | string) =>
      `/api/movies/${movieId}/directors/${directorId}`,
    // DELETE
    removeDirector: (movieId: number | string, directorId: number | string) =>
      `/api/movies/${movieId}/directors/${directorId}`,
    // GET
    getDirectors: (movieId: number | string) =>
      `/api/movies/${movieId}/directors`,
    // POST
    addGenre: (movieId: number | string, genreId: number | string) =>
      `/api/movies/${movieId}/genres/${genreId}`,
    // DELETE
    removeGenre: (movieId: number | string, genreId: number | string) =>
      `/api/movies/${movieId}/genres/${genreId}`,
    // GET
    getGenres: (movieId: number | string) => `/api/movies/${movieId}/genres`,
  },
  comments: {
    // POST (Requiere userId y movieId como query params)
    add: '/api/comments',
    // DELETE
    delete: (commentId: number | string) => `/api/comments/${commentId}`,
    // PUT
    update: (commentId: number | string) => `/api/comments/${commentId}`,
    // GET
    getByUser: (userId: number | string) => `/api/comments/user/${userId}`,
    // GET
    getByMovie: (movieId: number | string) => `/api/comments/movie/${movieId}`,
  },
  likes: {
    // POST (Requiere userId y movieId como query params)
    like: '/api/user-movie-likes',
    // DELETE (Requiere userId y movieId como query params)
    unlike: '/api/user-movie-likes',
    // GET
    getByUser: (userId: number | string) =>
      `/api/user-movie-likes/user/${userId}`,
    // GET
    getByMovie: (movieId: number | string) =>
      `/api/user-movie-likes/movie/${movieId}`,
  },
  ratings: {
    // POST (Requiere userId, movieId y rating como query params)
    rate: '/api/user-movie-ratings',
    // DELETE (Requiere userId y movieId como query params)
    delete: '/api/user-movie-ratings',
    // GET
    getByUser: (userId: number | string) =>
      `/api/user-movie-ratings/user/${userId}`,
    // GET
    getByMovie: (movieId: number | string) =>
      `/api/user-movie-ratings/movie/${movieId}`,
  },
};
export default apiEndpoints;
