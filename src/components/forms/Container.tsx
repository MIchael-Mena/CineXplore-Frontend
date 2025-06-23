import { FormProvider, UseFormReturn, FieldValues } from 'react-hook-form'
import {Button, Stack, Typography} from '@mui/material'


interface Props<T extends FieldValues> {
  header?: string
  children?: React.ReactNode
  buttonText: string
  Islogin?: boolean
  methods: UseFormReturn<T>
  onSubmit: () => void
  isLoading: boolean
  styles?: React.CSSProperties
  btnArrow: boolean
  colorButton?: 'blue' | 'lightBlue' | 'whiteButton' | 'textWhiteButton' | 'textBlueButton'
}

const FormContainer = <T extends FieldValues>({
                                                methods,
                                                onSubmit,
                                                header,
                                                children,
                                                buttonText,
                                                Islogin = false,
                                                isLoading,
                                                styles,
                                                btnArrow = false,
                                                colorButton = 'blue',
                                              }: Props<T>) => {
  return (
    <FormProvider {...methods}>
      <Stack component="form" sx={styles} onSubmit={onSubmit}>
        {header != '' ? (
          <Typography variant={Islogin ? 'h1' : 'h2'} color={Islogin ? 'primary.main' : 'text'}>
            {header}
          </Typography>
        ) : null}
        {children}

        <Button color={colorButton} isPending={isLoading} btnArrow={btnArrow}>
          <Typography fButtonht={400} fontSize={20}>
            {buttonText}
          </Typography>
        </Button>
      </Stack>
    </FormProvider>
  )
}

export default FormContainer