import type { ApiResponse } from '../../../../models/ApiResponse';
import { Button, CircularProgress } from '@mui/material';
import { useApiService } from '../../../../hooks/useApiService';
import { handleSnackbar } from '../../../../utils/apiUtils';
import type { AuthData } from '../../../../models/AuthData';

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
        handleSnackbar(res.message, 'success');
        onClose();
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
