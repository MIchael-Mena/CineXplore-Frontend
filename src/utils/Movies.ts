export interface Movie {
  id: number;
  title: string;
  coverUrl?: string;
  description?: string;
  durationMin: number;
  releaseDate: string; // ISO string
  directorIds: number[];
  genreIds: number[];
  actorIds: number[];
}

export const fakeMovies: Movie[] = [
  {
    id: 1,
    title: "El Origen",
    coverUrl: "https://example.com/inception.jpg",
    description: "Un ladrón que roba secretos corporativos a través del uso de la tecnología de sueños compartidos.",
    durationMin: 148,
    releaseDate: "2010-07-16",
    directorIds: [1],
    genreIds: [1, 2],
    actorIds: [1, 2, 3]
  },
  {
    id: 2,
    title: "Matrix",
    coverUrl: "https://example.com/matrix.jpg",
    description: "Un hacker descubre la verdadera naturaleza de su realidad y su papel en la guerra contra sus controladores.",
    durationMin: 136,
    releaseDate: "1999-03-31",
    directorIds: [2],
    genreIds: [2, 3],
    actorIds: [4, 5, 6]
  },
  {
    id: 3,
    title: "Interstellar",
    coverUrl: "https://example.com/interstellar.jpg",
    description: "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.",
    durationMin: 169,
    releaseDate: "2014-11-07",
    directorIds: [1],
    genreIds: [1, 4],
    actorIds: [7, 8, 9]
    {
      id: 4,
      title: "La La Land",
      coverUrl: "https://example.com/lalaland.jpg",
      description: "Una aspirante a actriz y un músico de jazz persiguen sus sueños en Los Ángeles.",
      durationMin: 128,
      releaseDate: "2016-12-09",
      directorIds: [3],
      genreIds: [5, 6],
      actorIds: [10, 11]
    },
    {
      id: 5,
      title: "El Padrino",
      coverUrl: "https://example.com/godfather.jpg",
      description: "La historia de la familia criminal Corleone en Nueva York.",
      durationMin: 175,
      releaseDate: "1972-03-24",
      directorIds: [4],
      genreIds: [7, 2],
      actorIds: [12, 13, 14]
    },
    {
      id: 6,
      title: "Forrest Gump",
      coverUrl: "https://example.com/forrestgump.jpg",
      description: "Un hombre con un bajo coeficiente intelectual presencia y participa en muchos de los eventos más importantes de la segunda mitad del siglo XX.",
      durationMin: 142,
      releaseDate: "1994-07-06",
      directorIds: [5],
      genreIds: [8, 9],
      actorIds: [15, 16]
    },
    {
      id: 7,
      title: "Pulp Fiction",
      coverUrl: "https://example.com/pulpfiction.jpg",
      description: "Historias entrelazadas de crimen en Los Ángeles.",
      durationMin: 154,
      releaseDate: "1994-10-14",
      directorIds: [6],
      genreIds: [2, 10],
      actorIds: [17, 18, 19]
    },
    {
      id: 8,
      title: "El Señor de los Anillos: La Comunidad del Anillo",
      coverUrl: "https://example.com/lotr1.jpg",
      description: "Un hobbit y sus amigos emprenden una misión para destruir un anillo poderoso.",
      durationMin: 178,
      releaseDate: "2001-12-19",
      directorIds: [7],
      genreIds: [4, 11],
      actorIds: [20, 21, 22]
    },
    {
      id: 9,
      title: "Gladiador",
      coverUrl: "https://example.com/gladiator.jpg",
      description: "Un general romano busca venganza tras ser traicionado.",
      durationMin: 155,
      releaseDate: "2000-05-05",
      directorIds: [8],
      genreIds: [12, 13],
      actorIds: [23, 24]
    }
  ];