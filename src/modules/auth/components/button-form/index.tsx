import type { ApiResponse } from '../../../../models/ApiResponse';
import { Button, CircularProgress } from '@mui/material';
import { useApiService } from '../../../../hooks/useApiService';
import { handleSnackbar } from '../../../../utils/apiUtils';
import type { AuthData } from '../../../../models/AuthData';
import { useNavigate } from 'react-router-dom';

interface ButtonFormProps<T> {
  onSubmit: (form: T) => Promise<ApiResponse<AuthData>>;
  payloadOfSubmit: { form: T } | null;
  onClose: () => void;
  buttonText: string;
}

export const ButtonForm = <T extends object>({
  onSubmit,
  onClose,
  buttonText,
  payloadOfSubmit: payload,
}: ButtonFormProps<T>) => {
  const navigate = useNavigate();
  const { loading } = useApiService<ApiResponse<void>, void>(
    () =>
      payload
        ? handleActionDispatch()
        : Promise.resolve({} as ApiResponse<void>),
    [payload],
    true
  );

  const handleActionDispatch = async () => {
    await onSubmit(payload!.form)
      .then((res) => {
        let roles = res.data?.user.roles || [];
        handleSnackbar(
          `Welcome ${res.data?.user.username}${
            roles.includes('ADMIN') ? ' (admin)' : ''
          }`,
          'success'
        );
        onClose();
        if (roles.includes('ADMIN')) {
          navigate('/dashboard', { replace: true });
        }
      })
      .catch((res: ApiResponse<AuthData>) => {
        handleSnackbar(res.message, 'error');
      });
    return Promise.resolve({} as ApiResponse<void>);
  };

  return (
    <Button
      type="submit" // Al hacer click en el boton se ejecuta el onSubmit del form
      variant="contained"
      color="primary"
      disabled={loading}
    >
      {loading ? (
        <>
          <CircularProgress size={20} sx={{ mx: 1 }} />
          ...Loading
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
};
