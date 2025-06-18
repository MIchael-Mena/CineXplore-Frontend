import { Stack, Typography, Input } from '@mui/material'
import { FieldValues, Path, PathValue, RegisterOptions, useFormContext } from 'react-hook-form'

interface Props<T extends FieldValues> {
  name: Path<T>
  registerOptions?: RegisterOptions<T>
  fileInputRef: React.RefObject<HTMLInputElement | null>
  children: React.ReactNode
}

const FileInput = <T extends FieldValues>({ name, registerOptions, fileInputRef, children }: Props<T>) => {
  const { formState, setValue, register } = useFormContext<T>()
  const error = formState.errors[name]?.message as string | undefined

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setValue(name, file as PathValue<T, Path<T>>, { shouldValidate: true })
  }

  return (
    <Stack gap={10}>
      <Input
        {...register(name, registerOptions)}
        type="file"
        id={name}
        inputRef={fileInputRef}
        sx={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {children}

      {error && (
        <Typography color="error.main" variant="body2">
          {error}
        </Typography>
      )}
    </Stack>
  )
}

export default FileInput
