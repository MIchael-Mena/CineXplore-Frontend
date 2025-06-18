import dayjs, { Dayjs } from 'dayjs'
import { Box, styled, Typography } from '@mui/material'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'
import 'dayjs/locale/es'
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(updateLocale)
dayjs.updateLocale('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'ENE_FEB_MAR_ABR_MAY_JUN_JUL_AGO_SEP_OCT_NOV_DIC'.split('_'),
})

const StyledBasePickerStyles = {
  width: '50%',
  '& .MuiInputBase-root': {
    backgroundColor: '#ECEEEF',
    borderRadius: '100px',
    padding: '0 15px',
    height: '73px',
    cursor: 'pointer',
  },
  '& .MuiInputBase-input': {
    marginTop: '12px',
    padding: '8px',
    cursor: 'pointer',
  },
  '& .MuiFormLabel-root': {
    padding: '8px',
    marginTop: '15px',
    color: '#2167AE',
    fontSize: '16px',
    fontWeight: 600,
    textDecoration: 'none',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}

const StyledDateTimePicker = styled(DateTimePicker)(({}) => StyledBasePickerStyles)

interface DateComponentProps<T extends FieldValues> {
  control: Control<T>
  showLabel?: boolean
  disableDates?: boolean
}

const DateComponent = <T extends FieldValues>({
  control,
  showLabel = true,
  disableDates = false,
}: DateComponentProps<T>) => {
  const today = dayjs()
  const startDate = control._formValues.startDate ? dayjs(control._formValues.startDate) : undefined
  const isStartDatePassed = startDate && startDate.isBefore(today)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Box display="flex" flexDirection={'column'} gap={2}>
        {showLabel && (
          <Typography fontSize={18} fontWeight={400} mb={'15px'}>
            Vigencia
          </Typography>
        )}
        <Box
          display="flex"
          gap={30}
          bgcolor="white"
          p={2}
          borderRadius={2}
          sx={{
            '& .MuiTextField-root': {
              width: '100%',
            },
          }}
        >
          <Controller
            name={'startDate' as Path<T>}
            control={control}
            rules={{
              required: '*La fecha de inicio es obligatoria',
            }}
            render={({ field, fieldState }) => {
              const { onChange, value, ref } = field
              const { error } = fieldState
              console.log(today)
              return (
                <StyledDateTimePicker
                  label="Fecha y hora (Desde)"
                  value={value ? dayjs(value) : null}
                  onChange={(newValue: Dayjs | null) => {
                    const dateTimeString = newValue ? newValue.toISOString() : ''
                    onChange(dateTimeString)
                  }}
                  minDateTime={today}
                  format="DD/MM/YY HH:mm"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputLabelProps: {
                        shrink: true,
                      },
                      error: !!error,
                      helperText: error?.message,
                      inputRef: ref,
                    },
                    field: {
                      readOnly: true,
                    },
                  }}
                  disabled={disableDates ? isStartDatePassed : false}
                />
              )
            }}
          />

          <Controller
            name={'endDate' as Path<T>}
            control={control}
            rules={{
              required: '*La fecha de fin es obligatoria',
              validate: {
                afterStartDate: (value, formValues) => {
                  const startDate = dayjs(formValues.startDate)
                  const endDate = dayjs(value)
                  return (
                    (startDate.isValid() && endDate.isAfter(startDate)) ||
                    '*La fecha de fin debe ser posterior a la fecha de inicio'
                  )
                },
              },
            }}
            render={({ field, fieldState }) => {
              const { onChange, value, ref } = field
              const { error } = fieldState

              return (
                <StyledDateTimePicker
                  label="Fecha y hora (Hasta)"
                  value={value ? dayjs(value) : null}
                  onChange={(newValue: Dayjs | null) => {
                    const dateTimeString = newValue ? newValue.toISOString() : ''
                    onChange(dateTimeString)
                  }}
                  minDateTime={isStartDatePassed ? today : dayjs(control._formValues.startDate || today)}
                  format="DD/MM/YY HH:mm"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputLabelProps: {
                        shrink: true,
                      },
                      error: !!error,
                      helperText: error?.message,
                      inputRef: ref,
                    },
                    field: {
                      readOnly: true,
                    },
                  }}
                  disabled={false}
                />
              )
            }}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  )
}

export default DateComponent
