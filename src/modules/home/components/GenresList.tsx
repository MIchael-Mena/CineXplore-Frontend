import { useState } from 'react'
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
    Tooltip
} from '@mui/material'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'

interface Genre {
    name: string
}

interface Props {
    genres: Genre[]
    onCreate: (name: string) => void
    onEdit: (index: number, newName: string) => void
    onDelete: (index: number) => void
}

export default function GenresManager({ genres, onCreate, onEdit, onDelete }: Props) {
    const [newGenreName, setNewGenreName] = useState('')
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [editedName, setEditedName] = useState('')

    const handleCreate = () => {
        if (newGenreName.trim()) {
            onCreate(newGenreName.trim())
            setNewGenreName('')
        }
    }

    const startEdit = (index: number, currentName: string) => {
        setEditIndex(index)
        setEditedName(currentName)
    }

    const saveEdit = () => {
        if (editIndex !== null && editedName.trim()) {
            onEdit(editIndex, editedName.trim())
            setEditIndex(null)
        }
    }

    const cancelEdit = () => {
        setEditIndex(null)
        setEditedName('')
    }

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
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
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
                                                <IconButton onClick={() => startEdit(index, genre.name)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Eliminar">
                                                <IconButton onClick={() => onDelete(index)} color="error">
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
    )
}
