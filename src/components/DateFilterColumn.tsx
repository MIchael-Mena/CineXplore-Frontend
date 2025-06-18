import React, { useState, useEffect, useRef } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import 'dayjs/locale/es'
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(updateLocale)
dayjs.updateLocale('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'ENE_FEB_MAR_ABR_MAY_JUN_JUL_AGO_SEP_OCT_NOV_DIC'.split('_'),
  weekdays: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
  weekdaysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
})

interface DateFilterColumnProps {
  placeholder: string
  onChange: (date: string | undefined) => void
  containerSx?: object
  minDate?: Dayjs
  maxDate?: Dayjs
  value?: string
  isFromDate?: boolean
  relatedDate?: Dayjs | null
}

const DateFilterColumn: React.FC<DateFilterColumnProps> = ({
  placeholder,
  onChange,
  containerSx = {},
  minDate,
  maxDate,
  value,
  isFromDate = false,
  relatedDate = null,
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(value ? dayjs(value) : null)
  const [tempDate, setTempDate] = useState<Dayjs | null>(value ? dayjs(value) : null)
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (value) {
      setSelectedDate(dayjs(value))
      setTempDate(dayjs(value))
    } else {
      setSelectedDate(null)
      setTempDate(null)
    }
  }, [value])

  const handleChange = (newDate: Dayjs | null) => {
    setTempDate(newDate)
  }

  const handleAccept = () => {
    if (tempDate) {
      setSelectedDate(tempDate)
      onChange(tempDate.toISOString())
    }
    setOpen(false)
  }

  const handleClear = () => {
    setSelectedDate(null)
    setTempDate(null)
    onChange(undefined)
    setOpen(false)
  }

  const formatDate = (date: Dayjs | null) => {
    return date ? date.locale('es').format('DD/MM/YYYY HH:mm') : ''
  }

  const computedMinDate = isFromDate ? minDate : relatedDate || minDate

  const handleArrowClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    setOpen(true)
  }

  const actionLabels = {
    cancel: 'Cancelar',
    clear: 'Limpiar',
    accept: 'Aceptar',
  }

  return (
    <Box
      ref={inputRef}
      sx={{
        borderBottom: '1px solid #2167AE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 2,
        paddingRight: 2,
        position: 'relative',
        ...containerSx,
      }}
    >
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <Typography
          fontSize={18}
          sx={{
            flex: 1,
            color: '#5D6162',
            textAlign: 'left',
            mb: 0.25,
          }}
        >
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </Typography>

        <IconButton onClick={handleArrowClick} sx={{ p: 0.5 }}>
          <KeyboardArrowDownIcon fontSize="small" />
        </IconButton>
      </Box>

      {open && (
        <Box
          sx={{ position: 'absolute', left: 0, top: '100%', zIndex: 1000, opacity: 0, height: 0, overflow: 'hidden' }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DateTimePicker
              value={tempDate}
              onChange={handleChange}
              minDate={computedMinDate}
              maxDate={maxDate}
              ampm={false}
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              onAccept={handleAccept}
              closeOnSelect={false}
              views={['year', 'month', 'day', 'hours', 'minutes']}
              localeText={{
                cancelButtonLabel: actionLabels.cancel,
                clearButtonLabel: actionLabels.clear,
                okButtonLabel: actionLabels.accept,
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'standard',
                  InputProps: {
                    disableUnderline: true,
                    startAdornment: null,
                    endAdornment: null,
                    sx: {
                      padding: 0,
                      '&:before': { display: 'none' },
                      '&:after': { display: 'none' },
                    },
                  },
                  inputProps: {
                    style: { display: 'none' },
                  },
                },
                actionBar: {
                  actions: ['cancel', 'clear', 'accept'],
                  onClick: handleClear,
                  sx: {
                    display: 'flex',
                    justifyContent: 'space-around',
                    '& .MuiButton-root': {
                      '&.MuiButton-text': {
                        color: '#2167AE',
                      },
                      '&.MuiButton-textPrimary': {
                        backgroundColor: '#2167AE',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#1a5590',
                        },
                      },
                      '&.MuiButton-textError': {
                        backgroundColor: '#FF4D4D',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#FF6B6B',
                        },
                      },
                    },
                  },
                },
                day: {
                  sx: {
                    fontWeight: 400,
                    '&.Mui-selected': {
                      backgroundColor: '#2167AE',
                      '&:hover': {
                        backgroundColor: '#1a5590',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(33, 103, 174, 0.1)',
                    },
                  },
                },
                leftArrowIcon: {
                  sx: { color: '#2167AE' },
                },
                rightArrowIcon: {
                  sx: { color: '#2167AE' },
                },
                switchViewButton: {
                  sx: {
                    color: '#2167AE',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                  },
                },
                popper: {
                  sx: {
                    '& .MuiCalendarPicker-root': {
                      width: 'auto',
                      margin: 0,
                    },
                    '& .MuiPickersCalendarHeader-root': {
                      padding: '12px 16px 8px',
                      '& .MuiPickersCalendarHeader-label': {
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#2167AE',
                      },
                    },
                    '& .MuiDayCalendar-header': {
                      paddingBottom: '8px',
                    },
                    '& .MuiDateCalendar-root': {
                      padding: '0 20px',
                    },
                  },
                },
              }}
              sx={{
                width: '100%',
                '& .MuiInputBase-root': {
                  height: 'auto',
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      )}
    </Box>
  )
}

export default DateFilterColumn
