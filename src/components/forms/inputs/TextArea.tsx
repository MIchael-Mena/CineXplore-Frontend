import { Box, TextField, Typography, Stack } from '@mui/material'
import { UseFormRegisterReturn, useFormContext } from 'react-hook-form'
import { useState, useEffect } from 'react'

interface TextAreaProps {
  name: string
  placeholder: string
  register: UseFormRegisterReturn
  limit?: number
  disabled?: boolean
}

const TextArea = ({ name, placeholder, register, limit = 2000, disabled = false }: TextAreaProps) => {
  const {
    formState: { errors },
    clearErrors,
    setError,
    trigger,
    watch,
    setValue,
  } = useFormContext()

  const { onChange: registerOnChange, ...registerProps } = register

  // Estado interno para manejar el contador
  const [count, setCount] = useState(0)

  // Obtiene el valor actual del campo desde el formulario
  const currentValue = watch(name) || ''

  // Efecto para actualizar el contador cuando cambia el valor
  useEffect(() => {
    setCount(currentValue.length)
  }, [currentValue])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value

    // Llama al onChange original del registro si existe
    registerOnChange?.(e)

    // Actualiza directamente el valor en el formulario
    setValue(name, newValue, { shouldValidate: true })

    if (errors[name] && newValue.trim()) {
      clearErrors(name)
    }

    // Valida longitud máxima
    if (newValue.length > limit) {
      setError(name, {
        type: 'maxLength',
        message: `El texto excede el límite de ${limit} caracteres`,
      })
    } else if (errors[name]?.type === 'maxLength') {
      clearErrors(name)
    }

    // Dispara validación si está vacío
    if (!newValue.trim()) {
      trigger(name)
    }
  }

  const error = errors[name]?.message as string | undefined

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          width: '100%',
          height: '150px',
          borderRadius: '27px',
          backgroundColor: '#ECEEEF',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <TextField
          disabled={disabled}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          {...registerProps}
          variant="standard"
          fullWidth
          multiline
          rows={4}
          slotProps={{
            input: {
              disableUnderline: true,
            },
          }}
          sx={{
            marginTop: '35px',
            paddingBottom: '35px',
            '& .MuiInputBase-root:hover': {
              backgroundColor: 'transparent',
            },
            '& .MuiInputBase-root:focus': {
              backgroundColor: 'transparent',
            },
          }}
        />
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '600',
            color: count > limit ? 'red' : '#23366F',
            alignSelf: 'flex-end',
          }}
        >
          {count}/{limit}
        </Typography>
      </Box>
      {error && (
        <Typography color="error.main" fontSize={'14px'}>
          {error}
        </Typography>
      )}
    </Stack>
  )
}

export default TextArea
