import React, { useRef, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, Typography, Input, IconButton, styled } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PlusSign from '/Plus.png'

const FileInputContainer = styled(Box)<{ disabled?: boolean }>(({ disabled }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  height: 'auto',
  borderRadius: 100,
  marginTop: 5,
  cursor: disabled ? 'default' : 'pointer',
  padding: '16px 30px',
  border: '2px dashed #5495CF',
  backgroundColor: disabled ? '#f5f5f5' : 'white',
  opacity: disabled ? 0.7 : 1,
}))

const ImagePreviewContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100px',
  height: '130px',
})

const FileNameContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5px',
  width: '100%',
  padding: '10px 0',
  position: 'relative',
})

const HelperTextContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
  marginTop: '10px',
  marginLeft: '35px',
})

const ErrorContainer = styled(Box)({
  minHeight: '30px',
  width: '100%',
})

interface ImageUploaderProps {
  name: string
  preview: string | null
  setPreview: (preview: string | null) => void
  header?: string
  required?: boolean
  imageLabel?: string
  acceptedFormats: string[]
  helperText?: boolean
  secondaryLabel?: string
  handleDeleteImage?: () => void
  disabled?: boolean
  addBorder?: boolean
}

const conditionalStyles = (addBorder: boolean) => {
  if (addBorder) {
    return {
      border: '1px solid #C9D0D2',
      borderRadius: '8px',
      padding: '24px',
      marginTop: '15px',
    }
  }
}

const ImageUploader = ({
  name,
  preview,
  setPreview,
  header,
  imageLabel,
  required = true,
  secondaryLabel,
  acceptedFormats = [],
  helperText = false,
  handleDeleteImage,
  disabled = false,
  addBorder = false,
}: ImageUploaderProps) => {
  const {
    setValue,
    formState: { errors },
    register,
    trigger,
    setError,
    clearErrors,
    getValues,
  } = useFormContext()

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const fileName = getValues(name)?.name || null

  const getAcceptString = () => {
    const mimeTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      csv: 'text/csv',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      pdf: 'application/pdf',
    }

    return acceptedFormats.map(format => mimeTypes[format.toLowerCase()] || `.${format}`).join(',')
  }

  const formattedHelperText =
    acceptedFormats.length > 0 ? `Archivos permitidos: ${acceptedFormats.map(f => f.toUpperCase()).join(' / ')}` : ''

  const isCSVFile = (filename: string | null) => {
    if (!filename) return false
    return filename.toLowerCase().endsWith('.csv')
  }

  const isURL = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false
    try {
      new URL(value)
      return true
    } catch (_e) {
      return false
    }
  }

  useEffect(() => {
    if (!disabled) {
      register(name, {
        required: required ? '*Este campo es obligatorio' : false,
        validate: {
          fileType: value => {
            if (!value) return required ? '*Este campo es obligatorio' : true
            if (isURL(value)) return true
            const fileName = value.name.toLowerCase()
            const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1)
            const isAcceptedExtension = acceptedFormats.some(format => fileExtension === format.toLowerCase())

            return isAcceptedExtension || `Solo se permiten archivos ${acceptedFormats.join('/')}`
          },
        },
      })
    } else {
      register(name)
    }
  }, [register, name, required, acceptedFormats, disabled])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return

    const file = event.target.files?.[0]
    if (file) {
      const fileName = file.name.toLowerCase()
      const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1)
      const isAcceptedExtension = acceptedFormats.some(format => fileExtension === format.toLowerCase())

      if (isAcceptedExtension) {
        clearErrors(name)

        if (!isCSVFile(fileName)) {
          const objectUrl = URL.createObjectURL(file)
          setPreview(objectUrl)
        } else {
          setPreview(null)
        }

        setValue(name, file, { shouldValidate: true })
        trigger(name)
      } else {
        setError(name, {
          type: 'validate',
          message: `Solo se permiten archivos ${acceptedFormats.join('/')}`,
        })
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        setPreview(null)
        setValue(name, null)
      }
    }
  }

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    if (disabled) {
      e.stopPropagation()
      return
    }

    e.stopPropagation()
    setPreview(null)
    setValue(name, null, { shouldValidate: true })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    if (handleDeleteImage) {
      handleDeleteImage()
    }
  }

  const handleContainerClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const showImagePreview = preview && !isCSVFile(fileName)
  const showOnlyFileName = fileName && isCSVFile(fileName)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        ...conditionalStyles(addBorder),
      }}
    >
      {header && (
        <Box mb={15} flexDirection={'row'} display={'flex'} gap={'30px'}>
          <Typography variant="h4">{header}</Typography>
          <Typography fontSize={'18px'}>{formattedHelperText}</Typography>
        </Box>
      )}

      <Typography fontSize={18} sx={{ color: disabled ? '#767676' : 'inherit' }}>
        {imageLabel}
      </Typography>

      {secondaryLabel && (
        <Typography fontSize={16} mt={-12} mb={15}>
          {secondaryLabel}
        </Typography>
      )}

      <FileInputContainer disabled={disabled} onClick={handleContainerClick}>
        <Input
          type="file"
          disabled={disabled}
          inputProps={{ accept: getAcceptString() }}
          sx={{ display: 'none' }}
          inputRef={fileInputRef}
          onChange={handleFileChange}
        />

        {showImagePreview ? (
          <ImagePreviewContainer>
            <IconButton onClick={handleRemoveImage} sx={{ alignSelf: 'flex-end', color: '#CB4B40' }}>
              <CloseIcon sx={{ fontSize: 15 }} />
            </IconButton>
            <img
              src={preview}
              alt="Preview"
              width="75px"
              height="75px"
              style={{
                borderRadius: 8,
                objectFit: 'cover',
                filter: disabled ? 'grayscale(30%)' : 'none',
              }}
            />
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                color: disabled ? '#767676' : '#23366F',
                textAlign: 'center',
                maxWidth: '150px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={fileName || ''}
            >
              {fileName}
            </Typography>
          </ImagePreviewContainer>
        ) : showOnlyFileName ? (
          <FileNameContainer>
            <IconButton
              onClick={handleRemoveImage}
              sx={{
                alignSelf: 'center',
                color: '#CB4B40',
                padding: '4px',
              }}
            >
              <CloseIcon sx={{ fontSize: 15 }} />
            </IconButton>
            <Typography
              sx={{
                color: disabled ? '#767676' : '#23366F',
                textAlign: 'center',
                fontWeight: 'medium',
                fontSize: '16px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '90%',
                mt: 1,
              }}
              title={fileName || ''}
            >
              {fileName}
            </Typography>
          </FileNameContainer>
        ) : (
          <img src={PlusSign} alt="Upload" style={{ opacity: disabled ? 0.5 : 1 }} />
        )}
      </FileInputContainer>

      {acceptedFormats.length > 0 && helperText && !disabled && (
        <HelperTextContainer>
          <Typography
            sx={{
              color: '#23366F',
              fontWeight: '600',
              fontSize: '14px',
            }}
          >
            Formatos aceptados: {acceptedFormats.map(f => f.toUpperCase()).join(' / ')}
          </Typography>
        </HelperTextContainer>
      )}

      <ErrorContainer>
        {!disabled && errors[name] && (
          <Typography sx={{ color: 'error.main', fontSize: '14px', marginTop: '8px', marginLeft: '20px' }}>
            {errors[name]?.message as string}
          </Typography>
        )}
      </ErrorContainer>
    </Box>
  )
}

export default ImageUploader
