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
  TextField,
  Tooltip,
} from '@mui/material';
import {
  Edit,
  Delete,
  Save,
  Cancel,
  AddCircleOutline,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface Member {
  id: number;
  fullName: string;
  birthDate: Date;
}

export default function MembersTable() {
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      fullName: 'Juan Pérez',
      birthDate: new Date('1990-01-01'),
    },
  ]);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedMember, setEditedMember] = useState<Member | null>(null);

  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState<Date | null>(null);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedMember({ ...members[index] });
  };

  const handleSave = () => {
    if (editedMember) {
      const updated = [...members];
      updated[editIndex!] = editedMember;
      setMembers(updated);
      setEditIndex(null);
      setEditedMember(null);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedMember(null);
  };

  const handleDelete = (index: number) => {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    if (!newName || !newDate) return;
    setMembers([
      ...members,
      {
        id: Date.now(),
        fullName: newName,
        birthDate: newDate,
      },
    ]);
    setNewName('');
    setNewDate(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                  <TableCell>
                    {editIndex === index ? (
                      <TextField
                        value={editedMember?.fullName || ''}
                        onChange={(e) =>
                          setEditedMember((prev) =>
                            prev ? { ...prev, fullName: e.target.value } : prev
                          )
                        }
                      />
                    ) : (
                      member.fullName
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <DatePicker
                        value={editedMember?.birthDate || null}
                        onChange={(date) =>
                          setEditedMember((prev) =>
                            prev && date
                              ? { ...prev, birthDate: date }
                              : prev
                          )
                        }
                        slotProps={{
                          textField: { size: 'small' },
                        }}
                      />
                    ) : (
                      new Date(member.birthDate).toLocaleDateString()
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editIndex === index ? (
                      <>
                        <Tooltip title="Guardar">
                          <IconButton onClick={handleSave}>
                            <Save />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancelar">
                          <IconButton onClick={handleCancel}>
                            <Cancel />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip title="Editar">
                          <IconButton onClick={() => handleEdit(index)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton onClick={() => handleDelete(index)}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {editIndex === null && (
          <Box mt={3} display="flex" gap={2}>
            <TextField
              label="Nombre"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <DatePicker
              label="Fecha de nacimiento"
              value={newDate}
              onChange={(date) => setNewDate(date)}
              slotProps={{
                textField: { size: 'small' },
              }}
            />
            <Tooltip title="Crear nuevo miembro">
              <Button variant="contained" onClick={handleCreate}>
                <AddCircleOutline />
              </Button>
            </Tooltip>
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
}