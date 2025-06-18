import { Autocomplete, IconButton, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import EastIcon from '@mui/icons-material/East'
import { useState, useEffect, useRef } from 'react'
import { DEBOUNCE_TIME } from '@/utils/constants'
import React from 'react'

interface Props {
  placeholder: string
  options: string[]
  value?: string
  onSearch?: (value: string) => void
  onInputChange?: (value: string) => void
  onChange?: (value: string) => void
  containerSx?: object
  inputSx?: object
  rounded?: boolean
  variant?: 'standard' | 'outlined' | 'filled'
  rightArrowIcon?: boolean
  reset?: boolean
  debounceTime?: number
}

const defaultInputSx = {
  height: 59,
  backgroundColor: 'transparent',
  color: 'primary.main',
  '& .MuiInputBase-input::placeholder': { color: 'primary.main' },
  '&:before': { borderColor: 'primary.main' },
}

const SearchBar = ({
  placeholder,
  options,
  value: externalValue,
  onInputChange,
  onSearch,
  onChange,
  containerSx = {},
  inputSx = {},
  rounded = false,
  variant,
  rightArrowIcon = false,
  reset = false,
}: Props) => {
  const [internalValue, setInternalValue] = useState('')
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const isBackendSearch = onSearch !== undefined && onInputChange !== undefined
  const isFrontendFilter = onChange !== undefined

  const inputValue = isBackendSearch && externalValue !== undefined ? externalValue : internalValue

  useEffect(() => {
    if (reset) {
      setInternalValue('')
      if (isFrontendFilter && onChange) {
        onChange('')
      }
    }
  }, [reset, onChange, isFrontendFilter])

  const handleInputChange = (_: React.SyntheticEvent, newValue: string, reason: string) => {
    if (reason === 'input') {
      if (isBackendSearch && onInputChange) {
        onInputChange(newValue)

        if (onSearch) {
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
          }

          debounceTimerRef.current = setTimeout(() => {
            onSearch(newValue)
          }, DEBOUNCE_TIME)
        }
      } else {
        setInternalValue(newValue)
        if (isFrontendFilter && onChange) {
          onChange(newValue)
        }
      }
    }
  }

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  const handleChange = (_: React.SyntheticEvent, newValue: string | null) => {
    if (typeof newValue === 'string') {
      if (isBackendSearch) {
        if (onInputChange) onInputChange(newValue)
        if (onSearch) onSearch(newValue)
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current)
          debounceTimerRef.current = null
        }
      } else {
        setInternalValue(newValue)
        if (isFrontendFilter && onChange) {
          onChange(newValue)
        }
      }
    }
  }

  const handleSearchClick = () => {
    const valueToSearch = isBackendSearch ? externalValue : internalValue

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }

    if (isBackendSearch && onSearch && valueToSearch !== undefined) {
      onSearch(valueToSearch)
    } else if (isFrontendFilter && onChange && valueToSearch !== undefined) {
      onChange(valueToSearch)
    }
  }

  return (
    <Autocomplete
      freeSolo
      autoComplete
      options={options}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleChange}
      sx={containerSx}
      renderInput={params => (
        <TextField
          {...params}
          variant={variant}
          placeholder={placeholder}
          sx={{
            '& .MuiInputBase-root': Object.keys(inputSx).length > 0 ? inputSx : defaultInputSx,
            ...(rounded && {
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
              },
            }),
          }}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <IconButton onClick={handleSearchClick} color="primary">
                  {rightArrowIcon ? <EastIcon color="primary" /> : <SearchIcon />}
                </IconButton>
              ),
            },
          }}
        />
      )}
    />
  )
}

export default SearchBar
