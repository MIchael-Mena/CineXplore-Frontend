import { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Stack,
} from '@mui/material';
import { Edit, Delete, AddCircleOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { InputTextControl } from '../../../components/common/input-text-control';
import { DatePickerControl } from '../../../components/common/date-picker-control';
import type { Member } from '../../../models/Member';
import { useApiService } from '../../../hooks/useApiService';
import { ApiService } from '../../../services/api.service';
import dayjs from 'dayjs';

interface Props {
  getAll: string;
  create: string;
  update: (member: Member) => string;
  onDelete: (member: Member) => string;
}

// Formulario reutilizable para crear/editar miembros
function MemberForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = 'Guardar',
}: {
  defaultValues?: Partial<Member>;
  onSubmit: (data: Member) => void;
  onCancel?: () => void;
  submitLabel?: React.ReactNode;
}) {
  const { control, handleSubmit } = useForm<Member>({
    defaultValues: {
      fullName: defaultValues?.fullName || '',
      birthDate: defaultValues?.birthDate
        ? dayjs(defaultValues.birthDate).format('YYYY-MM-DD')
        : null,
    },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => {
        // Convertir birthDate a string yyyy-mm-dd
        onSubmit({
          ...data,
          birthDate: data.birthDate
            ? dayjs(data.birthDate).format('YYYY-MM-DD')
            : '',
        });
      })}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <InputTextControl
          name="fullName"
          label="Nombre"
          control={control}
          required
        />
        <DatePickerControl
          name="birthDate"
          label="Fecha de nacimiento"
          control={control}
          required
          margin="dense"
        />
        <Button type="submit" variant="contained" size="small">
          {submitLabel}
        </Button>
        {onCancel && (
          <Button onClick={onCancel} color="inherit" size="small">
            Cancelar
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export default function MembersTableAlt({
  getAll,
  create,
  update,
  onDelete,
}: Props) {
  const [refreshCount, setRefreshCount] = useState(0);
  const {
    data: members = [],
    loading,
    error,
  } = useApiService<Member[], object>(
    () => ApiService.getData(getAll, {}),
    [refreshCount]
  );
  const [editIndex, setEditIndex] = useState<number | null>(null);

  if (loading) return <div> Esta cargando</div>;
  if (error) return <div> Hubo un error</div>;

  const handleEdit = (index: number) => setEditIndex(index);
  const handleCancel = () => setEditIndex(null);

  const handleSave = async (member: Member, data: Member) => {
    await ApiService.putData(update(member), data);
    setEditIndex(null);
    setRefreshCount((c) => c + 1);
  };

  const handleDelete = async (member: Member) => {
    await ApiService.deleteData(onDelete(member));
    setRefreshCount((c) => c + 1);
  };

  const handleCreate = async (data: Member) => {
    await ApiService.postData(create, data);
    setRefreshCount((c) => c + 1);
  };

  return (
    <Box sx={{ p: 3 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Fecha de nacimiento</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member, index) => (
              <TableRow key={member.id}>
                {editIndex === index ? (
                  <TableCell colSpan={3}>
                    <MemberForm
                      defaultValues={member}
                      onSubmit={(data) => handleSave(member, data)}
                      onCancel={handleCancel}
                      submitLabel="Guardar"
                    />
                  </TableCell>
                ) : (
                  <>
                    <TableCell>{member.fullName}</TableCell>
                    <TableCell>
                      {member.birthDate
                        ? new Date(member.birthDate).toLocaleDateString()
                        : ''}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Editar">
                        <IconButton onClick={() => handleEdit(index)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton onClick={() => handleDelete(member)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editIndex === null && (
        <Box mt={3}>
          <MemberForm
            onSubmit={handleCreate}
            submitLabel={
              <span>
                <AddCircleOutline style={{ verticalAlign: 'middle' }} /> Crear
              </span>
            }
          />
        </Box>
      )}
    </Box>
  );
}
