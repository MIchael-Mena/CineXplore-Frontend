import { useState, useEffect } from 'react'
import { Box, Menu, MenuItem, Typography, IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CheckIcon from '@mui/icons-material/Check'

interface FilterColumnProps {
  placeholder: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
  containerSx?: object
  value?: string // Add value prop to control the selected state externally
}

const FilterColumn = ({
  placeholder,
  options,
  onChange,
  containerSx = {},
  value: externalValue,
}: FilterColumnProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedValue, setSelectedValue] = useState<string>(externalValue || '')
  const open = Boolean(anchorEl)

  // Update internal state when external value changes
  useEffect(() => {
    if (externalValue) {
      setSelectedValue(externalValue)
    } else {
      setSelectedValue('')
    }
  }, [externalValue])

  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    if (containerRef) {
      setAnchorEl(containerRef)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (value: string) => {
    setSelectedValue(value)
    onChange(value)
    handleClose()
  }

  const getSelectedLabel = () => {
    if (!selectedValue) return ''
    const option = options.find(opt => opt.value === selectedValue)
    return option ? option.label : ''
  }

  return (
    <Box
      ref={(node: HTMLElement | null) => setContainerRef(node)}
      sx={{
        borderBottom: '1px solid #2167AE',
        paddingBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        position: 'relative',
        ...containerSx,
      }}
    >
      <Box>
        <Typography fontSize={18} sx={{ mb: 0.5 }} color="#5D6162">
          {getSelectedLabel() ? getSelectedLabel() : placeholder}
        </Typography>
      </Box>
      <IconButton
        id={`filter-button-${placeholder}`}
        aria-controls={open ? `filter-menu-${placeholder}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="small"
      >
        <KeyboardArrowDownIcon />
      </IconButton>
      <Menu
        id={`filter-menu-${placeholder}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': `filter-button-${placeholder}`,
          },
          paper: {
            style: {
              width: containerRef ? containerRef.offsetWidth : 'auto',
              maxWidth: 'none',
            },
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick('')} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {selectedValue === ''}
        </MenuItem>
        {options.map(option => (
          <MenuItem
            key={option.value}
            onClick={() => handleMenuItemClick(option.value)}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography fontSize={16}>{option.label}</Typography>
            {selectedValue === option.value && <CheckIcon fontSize="small" color="primary" />}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default FilterColumn
