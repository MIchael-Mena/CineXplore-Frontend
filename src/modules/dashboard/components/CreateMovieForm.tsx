import { Box, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { InputTextControl } from '../../../components/common/input-text-control';
import { DatePickerControl } from '../../../components/common/date-picker-control';
import type { Movie } from '../../movies/models/Movie';

type MovieFormValues = Omit<
  Movie,
  'durationMin' | 'directorIds' | 'genreIds' | 'actorIds'
> & {
  durationMin: string;
};

interface CreateMovieFormProps {
  onCreate: (movie: Movie) => void;
}

const CreateMovieForm = ({ onCreate }: CreateMovieFormProps) => {
  const { control, handleSubmit, reset } = useForm<MovieFormValues>({
    defaultValues: {
      title: '',
      coverUrl: '',
      description: '',
      durationMin: '',
      releaseDate: null,
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (!data.title.trim() || !data.durationMin.trim() || !data.releaseDate)
      return;
    const movie: Movie = {
      ...data,
      durationMin: Number(data.durationMin),
      directors: [],
      genres: [],
      actors: [],
    };
    onCreate(movie);
    reset();
  });

  return (
    <Box component="form" onSubmit={onSubmit} mb={3}>
      <Stack spacing={2}>
        <InputTextControl
          name="title"
          label="Título"
          control={control}
          required
        />
        <InputTextControl
          name="coverUrl"
          label="URL de portada"
          control={control}
        />
        <InputTextControl
          name="description"
          label="Descripción"
          control={control}
          multiline
          minRows={2}
        />
        <InputTextControl
          name="durationMin"
          label="Duración (minutos)"
          control={control}
          type="number"
          required
        />
        <DatePickerControl
          label="Fecha de estreno"
          control={control}
          name="releaseDate"
          margin="dense"
        />

        <Button type="submit" variant="contained" color="primary">
          Agregar película
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateMovieForm;
