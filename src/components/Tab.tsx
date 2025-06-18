import { Box, Typography } from '@mui/material'

interface TabProps<T extends string> {
  value: T
  label: string
  selected: T
  setSelected: (selected: T) => void
  minWidth?: string | undefined
}

const Tab = <T extends string>({ value, label, minWidth, selected, setSelected }: TabProps<T>) => {
  const isActive = value === selected

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: '8px 16px',
        minWidth: minWidth,
        height: '40px',
        '&:hover': {
          color: '#0C1440',
        },
      }}
      onClick={() => setSelected(value)}
    >
      <Typography
        sx={{
          fontWeight: isActive ? 600 : 400,
          fontSize: '18px',
          color: isActive ? '#23366F' : '#2167AE',
          height: '24px',
          lineHeight: '24px',
          minWidth: `${label.length * 12}px`,
          letterSpacing: isActive ? '0.2px' : '0.4px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          textAlign: 'center',
        }}
      >
        {label}
      </Typography>

      {isActive && (
        <Box
          sx={{
            position: 'absolute',
            bottom: -4,
            left: 0,
            width: '100%',
            height: '4px',
            backgroundColor: '#0C1440',
          }}
        />
      )}
    </Box>
  )
}

export default Tab
