import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { ApiService } from '../../../services/api.service';
import apiEndpoints from '../../../constants/apiEndpoints';
import { useApiService } from '../../../hooks/useApiService';
import type { GenreRequest, Genre } from '../../../models/Genre';

export default function GenresTable() {
  const [refreshCount, setRefreshCount] = useState(0);
  const {
    data: genres = [],
    loading,
    error,
  } = useApiService<Genre[], object>(
    () => ApiService.getData(apiEndpoints.genres.getAll, {}),
    [refreshCount]
  );

  const [newGenreName, setNewGenreName] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedGenre, setEditedGenre] = useState<Genre | null>(null);

  if (loading) return <div> Esta cargando</div>;
  if (error) return <div> Hubo un error</div>;

  const handleCreate = async () => {
    if (newGenreName.trim()) {
      const newGenre: GenreRequest = {
        name: newGenreName.trim(),
      };
      await ApiService.postData(apiEndpoints.genres.create, newGenre);
      setRefreshCount((c) => c + 1);
      setNewGenreName('');
    }
  };

  const handleDelete = async (genreId: number) => {
    await ApiService.deleteData(apiEndpoints.genres.delete(genreId));
    setRefreshCount((c) => c + 1);
  };

  const startEdit = (index: number, genre: Genre) => {
    setEditIndex(index);
    setEditedGenre(genre);
  };

  const saveEdit = async () => {
    if (editIndex !== null && editedGenre) {
      const newGenre: GenreRequest = {
        name: editedGenre.name,
      };
      await ApiService.patchData(
        apiEndpoints.genres.update(editedGenre.genreId!),
        newGenre
      );
      setRefreshCount((c) => c + 1);
      setEditIndex(null);
      setEditedGenre(null);
    }
  };
  apiEndpoints.actors;

  const cancelEdit = () => {
    setEditIndex(null);
    setEditedGenre(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Lista de géneros
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {genres.map((genre, index) => (
              <TableRow key={index}>
                <TableCell>
                  {editIndex === index ? (
                    <TextField
                      value={editedGenre}
                      onChange={(e) =>
                        setEditedGenre((prev) =>
                          prev ? { ...prev, name: e.target.value } : prev
                        )
                      }
                      size="small"
                      fullWidth
                    />
                  ) : (
                    genre.name
                  )}
                </TableCell>
                <TableCell align="right">
                  {editIndex === index ? (
                    <>
                      <Tooltip title="Guardar">
                        <IconButton onClick={saveEdit} color="primary">
                          <SaveIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancelar">
                        <IconButton onClick={cancelEdit} color="secondary">
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <Tooltip title="Editar">
                        <IconButton onClick={() => startEdit(index, genre)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          onClick={() => handleDelete(genre.genreId!)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {genres.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No hay géneros cargados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {editIndex === null && (
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <TextField
            label="Nuevo género"
            value={newGenreName}
            onChange={(e) => setNewGenreName(e.target.value)}
            fullWidth
          />
          <Tooltip title="Crear género">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreate}
              sx={{ minWidth: 48 }}
            >
              <AddCircleOutline />
            </Button>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}
