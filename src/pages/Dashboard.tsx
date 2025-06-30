import { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Stack,
  Button,
  Modal,
} from '@mui/material';
import type { Movie, MovieRequest } from '../modules/movies/models/Movie';
import AccesDeniedDashboard from '../modules/dashboard/components/AccesDeniedDashboard';
import BasicMoviesList from '../modules/dashboard/components/BasicMoviesList';
import apiEndpoints from '../constants/apiEndpoints';
import { useApiService } from '../hooks/useApiService';
import { ApiService } from '../services/api.service';
import CreateMovieForm from '../modules/dashboard/components/CreateMovieForm';
import GenresTable from '../modules/dashboard/components/GenresTable';
// import MembersTable from '../modules/dashboard/components/MembersTable';
import MembersTableAlt from '../modules/dashboard/components/MembersTableAlt';
import type { Actor, Director } from '../models/Member';

const DashBoard = () => {
  const [refreshCount, setRefreshCount] = useState(0);
  const { data: movies = [] } = useApiService<Movie[], object>(
    () => ApiService.getData(apiEndpoints.movies.getAll, {}),
    [refreshCount]
  );

  const { isLogged, user } = useAppSelector((state) => state.userReducer);
  const isAdmin = user?.roles?.includes('ADMIN');
  const [openGenres, setOpenGenres] = useState(false);
  const [openActors, setOpenActors] = useState(false);
  const [openDirectors, setOpenDirectors] = useState(false);

  if (!isLogged || !isAdmin) {
    return <AccesDeniedDashboard />;
  }

  // Para agregar una película, deberías hacer una llamada a la API aquí

  const handleCreateMovie = async (movie: MovieRequest) => {
    try {
      await ApiService.postData(apiEndpoints.movies.create, movie);
      setRefreshCount((c) => c + 1);
    } catch (e) {
      // Aquí podrías mostrar un mensaje de error
      // eslint-disable-next-line no-console
      console.error('Error al crear película', e);
    }
  };

  const handleRemoveMovie = async (id: string) => {
    try {
      // Aquí deberías tener el id o endpoint correcto para eliminar
      await ApiService.deleteData(apiEndpoints.movies.delete(id));
      setRefreshCount((c) => c + 1);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error al eliminar película', e);
    }
  };

  return (
    <Box maxWidth={600} mx="auto" mt={6}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Dashboard Admin
        </Typography>
        {/* Botones para abrir modales */}
        <Stack direction="row" spacing={2} mb={2} justifyContent="center">
          <Button variant="outlined" onClick={() => setOpenGenres(true)}>
            Géneros
          </Button>
          <Button variant="outlined" onClick={() => setOpenActors(true)}>
            Actores
          </Button>
          <Button variant="outlined" onClick={() => setOpenDirectors(true)}>
            Directores
          </Button>
        </Stack>
        <CreateMovieForm onCreate={handleCreateMovie} />
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Películas agregadas
        </Typography>
        <BasicMoviesList movies={movies} onRemove={handleRemoveMovie} />
      </Paper>
      {/* Modal de Géneros */}
      <Modal open={openGenres} onClose={() => setOpenGenres(false)}>
        <Box
          sx={{
            maxWidth: 600,
            m: 'auto',
            mt: 10,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
          }}
        >
          <GenresTable />
        </Box>
      </Modal>

      {/* Modal de Actores */}
      <Modal open={openActors} onClose={() => setOpenActors(false)}>
        <Box
          sx={{
            maxWidth: 600,
            m: 'auto',
            mt: 10,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
          }}
        >
          <MembersTableAlt
            getAll={apiEndpoints.actors.getAll}
            create={apiEndpoints.actors.create}
            update={(actor: Actor) =>
              apiEndpoints.actors.update(actor.actorId!)
            }
            onDelete={(actor: Actor) =>
              apiEndpoints.actors.delete(actor.actorId!)
            }
          />
        </Box>
      </Modal>

      {/* Modal de Actores */}
      <Modal open={openDirectors} onClose={() => setOpenDirectors(false)}>
        <Box
          sx={{
            maxWidth: 600,
            m: 'auto',
            mt: 10,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
          }}
        >
          <MembersTableAlt
            getAll={apiEndpoints.directors.getAll}
            create={apiEndpoints.directors.create}
            update={(director: Director) =>
              apiEndpoints.directors.update(director.directorId!)
            }
            onDelete={(director: Director) =>
              apiEndpoints.directors.delete(director.directorId!)
            }
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default DashBoard;
