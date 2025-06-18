import React, { useState } from 'react'
import { Box, TextField, Chip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

// Estilos personalizados
const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '100%',
})

const StyledChipContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '8px',
})

const StyledChip = styled(Chip)({
  backgroundColor: '#2167AE',
  color: 'white',
  fontWeight: 400,
  fontSize: '18px',
  '&:hover': {
    backgroundColor: '#1a5698',
  },
  '& .MuiChip-deleteIcon': {
    color: 'white',
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
})

interface KeywordsFieldProps<T extends FieldValues> {
  control: Control<T>
  disabled?: boolean
}

const KeywordsField = <T extends FieldValues>({ control, disabled = false }: KeywordsFieldProps<T>) => {
  const [inputValue, setInputValue] = useState<string>('')

  return (
    <Controller
      name={'keywords' as Path<T>}
      control={control}
      render={({ field }) => {
        const { value: keywords, onChange } = field

        const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
          if (event.key === 'Enter' && inputValue.trim()) {
            event.preventDefault()
            if (!keywords.includes(inputValue.trim())) {
              const newKeywords = [...keywords, inputValue.trim()]
              onChange(newKeywords)
              setInputValue('')
            }
          }
        }

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
          setInputValue(event.target.value)
        }

        const handleDelete = (keywordToDelete: string): void => {
          const newKeywords = keywords.filter((keyword: string) => keyword !== keywordToDelete)
          onChange(newKeywords)
        }

        return (
          <StyledBox>
            <Typography mb={3}>Palabras Clave</Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Escribe el nombre de la etiqueta"
              size="small"
              disabled={disabled}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              sx={{
                backgroundColor: '#ECEEEF',
                borderRadius: '100px',
                '& .MuiOutlinedInput-root': {
                  height: '73px',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
              }}
            />

            {keywords.length > 0 && (
              <StyledChipContainer>
                {keywords.map((keyword: string, index: number) => (
                  <StyledChip
                    key={index}
                    label={keyword}
                    onDelete={() => handleDelete(keyword)}
                    deleteIcon={<CloseIcon />}
                  />
                ))}
              </StyledChipContainer>
            )}
          </StyledBox>
        )
      }}
    />
  )
}

export default KeywordsField
