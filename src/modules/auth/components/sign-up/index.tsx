import { Box, Grid, Link, Typography } from '@mui/material';
import { DatePickerControl } from '../../../../components/common/date-picker-control';
import CountrySelect from '../../../../components/common/country-select';
import { Controller, useForm } from 'react-hook-form';
import type { User } from '../../../../models/User';
import { InputTextControl } from '../../../../components/common/input-text-control';
import { rules } from '../../../../constants/rulesValidation';
import { useAppDispatch } from '../../../../store/hooks';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { InputPasswordControl } from '../../../../components/common/input-password-control';
import { ButtonForm } from '../button-form';
import { register } from '../../../../store/actions/userActions';

interface SignUpProps {
  onSignInClick: () => void;
  onClose: () => void;
}

interface SignUpExtended {
  confirmPassword?: string; // Lo delcaro como opcional para poder usar el operador delete
  birthDate: Dayjs | null;
}

type SignUpForm = User & SignUpExtended;

export const SignUp = ({ onSignInClick, onClose }: SignUpProps) => {
  const { control, handleSubmit } = useForm<SignUpForm>({
    // mode: 'onTouched',
    delayError: 1000,
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: null,
      // Para iniciar una fecha por defecto, se debe usar el tipo Dayjs: dayjs('2021-10-10')
      birthDate: null, // reconoze 'yyyy-mm-dd' (formato valido para el backend) y 'mm-dd-yyyy' entre otros
      avatarUrl: '',
    },
  });

  const [payloadOfSubmit, setPayloadOfSubmit] = useState<{ form: User } | null>(
    null
  );
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((data) => {
    const { confirmPassword, ...user } = data;
    setPayloadOfSubmit({
      form: { ...user, birthDate: user.birthDate?.format('YYYY-MM-DD') },
    });
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          maxWidth: 450,
          minWidth: 350,
          p: { xs: 2, md: 4 },
          overflowY: 'auto',
          maxHeight: { xs: '90vh', md: '80vh' },
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Create an account
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <InputTextControl
              name="username"
              label="Username"
              autoComplete="username"
              control={control}
              rules={rules.firstName}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputTextControl
              name="email"
              label="Email"
              autoComplete="email"
              placeholder="name@example.com"
              control={control}
              rules={rules.email}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputPasswordControl
              label="Password"
              name="password"
              required
              margin="dense"
              control={control}
              rules={rules.password}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputPasswordControl
              label="Confirm Password"
              name="confirmPassword"
              required
              margin="dense"
              control={control}
              rules={rules.confirmPassword}
              preventCutCopyPaste
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="country"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <CountrySelect
                  value={value!}
                  onChange={onChange}
                  // onChange={(e) => onChange(e.target.textContent)}
                  error={error}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <DatePickerControl
              label="Birth Date"
              control={control}
              rules={rules.birthDate}
              name="birthDate"
              margin="dense"
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputTextControl
              name="profilePic"
              label="Image URL"
              control={control}
            />
          </Grid>

          <Grid
            size={{ xs: 12 }}
            display="inline-flex"
            flexDirection="column"
            gap={2}
            mt={2}
          >
            <ButtonForm
              onSubmit={(form: User) => dispatch(register(form)).unwrap()}
              payloadOfSubmit={payloadOfSubmit}
              onClose={onClose}
              buttonText="Sign up"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography align="center">
              Do you already have an account?
              <Link
                onClick={onSignInClick}
                sx={{ cursor: 'pointer', ml: 1, display: 'inline-block' }}
              >
                Sign In
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
