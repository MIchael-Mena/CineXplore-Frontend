import type { Movie } from '../modules/movies/models/Movie';

export const fakeMovies: Movie[] = [
  {
    id: 1,
    title: 'El Origen',
    coverUrl:
      'https://m.media-amazon.com/images/M/MV5BZDYwMDU0NTktMjg1MC00ZWNiLWE2ZTQtYzczZWMxZGM3OTJmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    description:
      'Un ladrón que roba secretos corporativos a través del uso de la tecnología de sueños compartidos.',
    durationMin: 148,
    releaseDate: '2010-07-16',
    directorIds: [1],
    genreIds: [1, 2],
    actorIds: [1, 2, 3],
  },
  {
    id: 2,
    title: 'Matrix',
    coverUrl:
      'https://m.media-amazon.com/images/M/MV5BNGE1YzI4NzMtZTUxNi00Y2I5LTg2MmQtODE0NThmYTFmMDk0XkEyXkFqcGc@._V1_.jpg',
    description:
      'Un hacker descubre la verdadera naturaleza de su realidad y su papel en la guerra contra sus controladores.',
    durationMin: 136,
    releaseDate: '1999-03-31',
    directorIds: [2],
    genreIds: [2, 3],
    actorIds: [4, 5, 6],
  },
  {
    id: 3,
    title: 'Interstellar',
    coverUrl:
      'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg',
    description:
      'Un grupo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.',
    durationMin: 169,
    releaseDate: '2014-11-07',
    directorIds: [1],
    genreIds: [1, 4],
    actorIds: [7, 8, 9],
  },
  {
    id: 4,
    title: 'La La Land',
    coverUrl:
      'https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_FMjpg_UX1000_.jpg',
    description:
      'Una aspirante a actriz y un músico de jazz persiguen sus sueños en Los Ángeles.',
    durationMin: 128,
    releaseDate: '2016-12-09',
    directorIds: [3],
    genreIds: [5, 6],
    actorIds: [10, 11],
  },
  {
    id: 5,
    title: 'El Padrino',
    coverUrl:
      'https://es.web.img3.acsta.net/pictures/18/06/12/12/12/0117051.jpg?coixp=49&coiyp=27',
    description: 'La historia de la familia criminal Corleone en Nueva York.',
    durationMin: 175,
    releaseDate: '1972-03-24',
    directorIds: [4],
    genreIds: [7, 2],
    actorIds: [12, 13, 14],
  },
  {
    id: 6,
    title: 'Forrest Gump',
    coverUrl:
      'https://m.media-amazon.com/images/S/aplus-media/sota/c5e85222-67c5-4e9b-abed-1d26df5b74f6.__CR262,754,2246,1389_PT0_SX970_V1___.jpg',
    description:
      'Un hombre con un bajo coeficiente intelectual presencia y participa en muchos de los eventos más importantes de la segunda mitad del siglo XX.',
    durationMin: 142,
    releaseDate: '1994-07-06',
    directorIds: [5],
    genreIds: [8, 9],
    actorIds: [15, 16],
  },
  {
    id: 7,
    title: 'Pulp Fiction',
    coverUrl:
      'https://i.pinimg.com/736x/88/e1/d3/88e1d3b3f60a407960244d1c120490a3.jpg',
    description: 'Historias entrelazadas de crimen en Los Ángeles.',
    durationMin: 154,
    releaseDate: '1994-10-14',
    directorIds: [6],
    genreIds: [2, 10],
    actorIds: [17, 18, 19],
  },
  {
    id: 8,
    title: 'El Señor de los Anillos: La Comunidad del Anillo',
    coverUrl:
      'https://es.web.img3.acsta.net/medias/nmedia/18/89/67/45/20061512.jpg',
    description:
      'Un hobbit y sus amigos emprenden una misión para destruir un anillo poderoso.',
    durationMin: 178,
    releaseDate: '2001-12-19',
    directorIds: [7],
    genreIds: [4, 11],
    actorIds: [20, 21, 22],
  },
  {
    id: 9,
    title: 'Gladiador',
    coverUrl:
      'https://cdn.sincroguia.tv/uploads/programs/g/l/a/gladiator-el-gladiador-poster-152_SPA-87_V.jpg',
    description: 'Un general romano busca venganza tras ser traicionado.',
    durationMin: 155,
    releaseDate: '2000-05-05',
    directorIds: [8],
    genreIds: [12, 13],
    actorIds: [23, 24],
  },
];
